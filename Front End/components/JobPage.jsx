import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({
    type: "",
    location: "",
    salary: "",
    category: ""
  });

  useEffect(() => {
    axios
      .get("http://localhost:3000/jobs")
      .then((res) => setJobs(res.data))
      .catch((err) => console.error("Error fetching jobs:", err));
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const filterBySalary = (salaryStr) => {
    const jobSalary = parseInt(salaryStr.replace(/[^0-9]/g, ""));
    const [min, max] = filters.salary.split("-").map(Number);
    return jobSalary >= min && jobSalary <= max;
  };

  const filteredJobs = jobs.filter((job) => {
    return (
      (filters.type === "" || job.type === filters.type) &&
      (filters.location === "" || job.location === filters.location) &&
      (filters.category === "" || job.category === filters.category) &&
      (filters.salary === "" || filterBySalary(job.salary))
    );
  });

  return (
    <div className="p-8 bg-white min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-6">Featured Jobs</h2>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <select name="type" value={filters.type} onChange={handleFilterChange} className="border p-2 rounded">
          <option value="">All Job Types</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
          <option value="Internship">Internship</option>
        </select>

        <select name="location" value={filters.location} onChange={handleFilterChange} className="border p-2 rounded">
          <option value="">All Locations</option>
          <option value="Remote">Remote</option>
          <option value="In-office">In-office</option>
          <option value="Hybrid">Hybrid</option>
          <option value="Cairo">Cairo</option>
          <option value="Dubai">Dubai</option>
        </select>

        <select name="salary" value={filters.salary} onChange={handleFilterChange} className="border p-2 rounded">
          <option value="">All Salaries</option>
          <option value="0-70000">0 - 70,000</option>
          <option value="70001-90000">70,001 - 90,000</option>
          <option value="90001-120000">90,001 - 120,000</option>
        </select>

        <select name="category" value={filters.category} onChange={handleFilterChange} className="border p-2 rounded">
          <option value="">All Categories</option>
          <option value="Finance">Finance</option>
          <option value="IT Services">IT Services</option>
          <option value="Marketing">Marketing</option>
          <option value="Science">Science</option>
          <option value="Design">Design</option>
          <option value="Data Science">Data Science</option>
          <option value="Consulting">Consulting</option>
          <option value="HR & Recruitment">HR & Recruitment</option>
        </select>
      </div>

      {/* Job List */}
      <div className="space-y-6">
        {filteredJobs.map((job) => (
          <div
            key={job._id}
            className="bg-gray-100 p-6 rounded-lg shadow flex justify-between items-center transform transition duration-300 hover:scale-102"
          >
            <div>
              <h3 className="text-xl font-bold">{job.title}</h3>
              <p className="text-gray-600">{job.company}</p>
              <p className="text-sm mt-2 mr-10">{job.description}</p>
              
              <div className="flex gap-2 mt-3 flex-wrap">
                {job.category && (
                  <span className="bg-violet-800 text-white px-3 py-1 rounded text-xs">{job.category}</span>
                )}
                <span className="bg-violet-800 text-white px-3 py-1 rounded text-xs">{job.type}</span>
                <span className="bg-violet-800 text-white px-3 py-1 rounded text-xs">{job.location}</span>
                <span className="bg-violet-800 text-white px-3 py-1 rounded text-xs">{job.salary}</span>
              </div>
            </div>
              <Link
                to={localStorage.getItem("token") ? `/apply/${job._id}` : "/login"}
                className="bg-violet-800 text-white px-4 py-2.5 rounded hover:scale-105 transition whitespace-nowrap"> Apply Now
              </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default JobsPage;