import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ViewApplicantsPage() {
  const { id } = useParams(); // This should match :id in your route
  const [applicants, setApplicants] = useState([]);
  const[jobTitle, setJobTitle] = useState('');

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/job/${id}`);
        setApplicants(res.data);
      } catch (err) {
        console.error("Error fetching applicants:", err);
      }
    };
    const fetchJobTitle = async () => {
        try{
            const res = await axios.get(`http://localhost:3000/jobs/${id}`);
            setJobTitle(res.data.title);
        }catch (err){
            console.error("Error fetching job title ", err)
        }
    }
    if (id) {
      fetchApplicants();
      fetchJobTitle();
    }
  }, [id]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Applicants for Job: {jobTitle || '...'}</h2>
      {applicants.length === 0 ? (
        <p>No applicants yet.</p>
      ) : (
        applicants.map((app, i) => (
          <div key={i} className="border p-4 rounded mb-3 shadow">
            <p><strong>Name:</strong> {app.fullName}</p>
            <p><strong>Email:</strong> {app.email}</p>
            <p><strong>Phone:</strong> {app.phone}</p>
            <p><strong>Cover Letter:</strong> {app.coverLetter}</p>
            <a
              href={`http://localhost:3000/${app.resumeUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-violet-800 underline"
            >
              View Resume
            </a>
          </div>
        ))
      )}
    </div>
  );
}

export default ViewApplicantsPage;