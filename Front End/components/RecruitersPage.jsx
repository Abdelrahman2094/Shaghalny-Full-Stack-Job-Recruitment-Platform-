import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

function RecruitersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    company: '',
    location: '',
    description: '',
    salary: ''
  });
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();
  const [editingJobId, setEditingJobId] = useState(null);

  const skills = ['Javascript', 'React', 'Node.js', 'Vue', 'MongoDB', 'Python', 'SQL', 'HTML', 'CSS','Express','Figma','Adobe XD'
    ,'Prototyping','AWS','Flutter','Dart','Firebase','PowerBi','Agile','Scrum','Ethical Hacking','SIEM','Firewalls','Jira','SEO',
    'Blogging','Copywriting'
  ];

  const toggleSkill = (skill) => {
    setSelectedSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");

      const response = await axios.get("http://localhost:3000/jobs/recruiter", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setJobs(response.data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");
  
    const newErrors = {};
    // [validation logic here... same as before]
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    const jobData = { ...formData, skills: selectedSkills };
  
    try {
      if (editingJobId) {
        // ✅ EDIT existing job
        await axios.put(`http://localhost:3000/jobs/${editingJobId}`, jobData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        // ✅ CREATE new job
        await axios.post("http://localhost:3000/jobs", jobData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
  
      setIsModalOpen(false);
      setEditingJobId(null);
      setFormData({ title: '', type: '', company: '', location: '', description: '', salary: '' });
      setSelectedSkills([]);
      setErrors({});
      fetchJobs();
    } catch (err) {
      console.error("Error submitting job:", err);
    }
  };
  const handleDelete = async (jobId) => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");
  
    try {
      await axios.delete(`http://localhost:3000/jobs/${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      // Refresh the job list after deletion
      fetchJobs();
    } catch (err) {
      console.error("Error deleting job:", err);
    }
  };

  const handleEdit = (job) => {
    setFormData({
      title: job.title,
      type: job.type,
      company: job.company,
      location: job.location,
      description: job.description,
      salary: job.salary,
    });
    setSelectedSkills(job.skills || []);
    setIsModalOpen(true);
    setEditingJobId(job._id); // ✅ you need to define this state
  };
  

  

  

  return (
    <div className="p-6 text-black">
      <h1 className="text-4xl font-bold text-center mb-6">Recruiter's Dashboard</h1>

      <button
        onClick={() => {
          const token = localStorage.getItem("token");
          if (!token) return navigate("/login");
          setIsModalOpen(true);
        }}
        className="bg-violet-800 text-white px-6 py-3 rounded-md font-medium mb-6 hover:scale-105 transition"
      >
        Post New Job
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50 p-4">
         <div className="bg-white rounded-lg w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-lg">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold">Post Job</h2>
              <button onClick={() => setIsModalOpen(false)}><X /></button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <input name="title" value={formData.title} onChange={handleChange} placeholder="Job Title" required className="w-full p-2 bg-gray-100 rounded" />
              {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
              <input name="company" value={formData.company} onChange={handleChange} placeholder="Company" required className="w-full p-2 bg-gray-100 rounded" />
              {errors.company && <p className="text-red-500 text-sm">{errors.company}</p>}
              <input name="salary" value={formData.salary} onChange={handleChange} placeholder="Salary" required className="w-full p-2 bg-gray-100 rounded" />
              {errors.salary && <p className="text-red-500 text-sm">{errors.salary}</p>}
              <select name="type" value={formData.type} onChange={handleChange} required className="w-full p-2 bg-gray-100 rounded">
                <option value="">Job Type</option>
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Contract</option>
                <option>Internship</option>
              </select>
              <select name="location" value={formData.location} onChange={handleChange} required className="w-full p-2 bg-gray-100 rounded">
                <option value="">Location</option>
                <option>Remote</option>
                <option>In-office</option>
                <option>Hybrid</option>
              </select>
              <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Job Description" required className="w-full p-2 bg-gray-100 rounded h-24" />
              <div>
                <p className="font-medium mb-2">Skills</p>
                <div className="flex flex-wrap gap-2">
                  {skills.map(skill => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleSkill(skill)}
                      className={`px-3 py-1 rounded border ${selectedSkills.includes(skill) ? 'bg-violet-800 text-white' : 'bg-white'}`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>

              <button type="submit" className="w-full bg-purple-700 text-white py-2 rounded hover:bg-purple-900">Submit Job</button>
            </form>
          </div>
        </div>
      )}

      <div className="mt-8 space-y-4">
        {jobs.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">You haven't posted any jobs yet.</p>
        ) : (
          jobs.map((job) => (
           <div
  key={job._id}
  className="bg-gray-100 p-4 rounded shadow flex justify-between  gap-4 flex-col sm:flex-row"
>
  {/* Left Side: Job Info */}
  <div className="flex-1">
    <h3 className="font-bold">{job.title}</h3>
    <p>{job.company} | {job.location} | {job.type}</p>
    <p className="text-sm mt-2">{job.description}</p>
    <p className="text-sm font-semibold mt-1">Salary: {job.salary}</p>
    <div className="flex gap-2 mt-2 flex-wrap">
      {job.skills?.map((s, i) => (
        <span key={i} className="bg-violet-800 text-white px-2 py-1 text-xs rounded">{s}</span>
      ))}
    </div>
  </div>

  {/* Right Side: Buttons, Centered Vertically */}
  <div className="flex flex-col sm:flex-row gap-2 items-center">
    <Link
      to={`/applicants/${job._id}`}
      className="bg-violet-800 text-white px-4 py-2.5 rounded hover:scale-105 transition whitespace-nowrap"
    >
      View Applicants
    </Link>
    <button
  onClick={() => handleEdit(job)}
  className="bg-violet-800 text-white px-4 py-2.5 rounded hover:scale-105 transition whitespace-nowrap"
>
  Edit Job
</button>
    <div
  onClick={() => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      handleDelete(job._id);
    }
  }}
  className="bg-violet-800 text-white px-4 py-2.5 rounded hover:scale-105 transition whitespace-nowrap cursor-pointer"
>
  Delete Job
</div>

  </div>
</div>

          
          ))
        )}
      </div>
    </div>
  );
}

export default RecruitersPage;