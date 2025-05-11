import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

function ApplyPage() {
  const { id } = useParams();
  const [jobTitle, setJobTitle] = useState('');

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/jobs/${id}`);
        setJobTitle(response.data.title);
      } catch (err) {
        console.error("Error fetching job details:", err);
        setJobTitle('Unknown Job');
      }
    };
    fetchJob();
  }, [id]);

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      phone: '',
      coverLetter: '',
      resume: null
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .matches(/^[A-Za-z\s]+$/, "Only letters are allowed")
        .required('Full Name is required'),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      phone: Yup.string()
        .matches(/^\d+$/, "Only digits allowed")
        .min(10, "At least 10 digits")
        .required('Phone is required'),
      coverLetter: Yup.string()
        .matches(/^[A-Za-z\s]+$/, "Only letters are allowed")
        .required('Cover Letter is required'),
      resume: Yup.mixed()
        .required("Resume is required")
        .test(
          "fileFormat",
          "Only PDF or DOC/DOCX files are allowed",
          value => value && ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(value.type)
        )
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('jobId', id);
      formData.append('fullName', values.fullName);
      formData.append('email', values.email);
      formData.append('phone', values.phone);
      formData.append('coverLetter', values.coverLetter);
      formData.append('resume', values.resume);

      try {
        await axios.post(`http://localhost:3000/apply/${id}`, formData);
        alert("Application submitted!");
      } catch (error) {
        console.error("Submission error:", error);
        alert("Failed to submit application");
      }
    }
  });

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Apply for: {jobTitle || '...'}</h2>
      <form onSubmit={formik.handleSubmit} encType="multipart/form-data" className="space-y-4">
        <div>
          <label>Full Name</label>
          <input name="fullName" onChange={formik.handleChange} value={formik.values.fullName} className="w-full p-2 border rounded" />
          {formik.errors.fullName && <p className="text-red-600 text-sm">{formik.errors.fullName}</p>}
        </div>
        <div>
          <label>Email</label>
          <input name="email" onChange={formik.handleChange} value={formik.values.email} className="w-full p-2 border rounded" />
          {formik.errors.email && <p className="text-red-600 text-sm">{formik.errors.email}</p>}
        </div>
        <div>
          <label>Phone</label>
          <input name="phone" onChange={formik.handleChange} value={formik.values.phone} className="w-full p-2 border rounded" />
          {formik.errors.phone && <p className="text-red-600 text-sm">{formik.errors.phone}</p>}
        </div>
        <div>
          <label>Cover Letter</label>
          <textarea name="coverLetter" onChange={formik.handleChange} value={formik.values.coverLetter} className="w-full p-2 border rounded h-24" />
          {formik.errors.coverLetter && <p className="text-red-600 text-sm">{formik.errors.coverLetter}</p>}
        </div>
        <div>
          <label>Resume (PDF, DOC, DOCX)</label>
          <input
            type="file"
            name="resume"
            onChange={(event) => formik.setFieldValue('resume', event.currentTarget.files[0])}
            className="w-full"
          />
          {formik.errors.resume && <p className="text-red-600 text-sm">{formik.errors.resume}</p>}
        </div>
        <button type="submit" className="bg-violet-800 text-white px-4 py-2 rounded hover:bg-violet-900">
          Submit Application
        </button>
      </form>
    </div>
  );
}

export default ApplyPage;