import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HomeSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Navigation pages mapping - updated to match your actual routes
  const navigationPages = {
    'home': '/',
    'job': '/Jobs',
    'jobs': '/Jobs',
    'recruiters': '/RecruitersPage',
    'Recruiters': '/RecruitersPage',
    'job seekers': '/JobseekersPage',
    'Job seekers': '/JobseekersPage',
    'about': '/AboutUs',
    'about us': '/AboutUs',
    'faq': '/FAQ',
    'contact': '/ContactUs',
    'contact us': '/ContactUs',
    'login': '/Login',
    'sign up': '/SignUp',
    'signup': '/SignUp',
    'profile': '/Profilepage'
  };

  const handleSearch = async (e) => {
    e.preventDefault();
  
    const term = searchTerm.trim().toLowerCase();
  
    // Check if the search term matches a navigation page
    if (navigationPages[term]) {
      navigate(navigationPages[term]);
    } else {
      try {
        // Call the backend to check if a job title matches
        const res = await fetch(`http://localhost:3000/jobs?search=${encodeURIComponent(term)}`);
        const jobs = await res.json();
  
        // If we find a job with an exact match on title (case-insensitive), navigate to its application page
        const matchedJob = jobs.find(job => job.title.toLowerCase() === term);
  
        if (matchedJob) {
          navigate(`/apply/${matchedJob._id}`);
        } else {
          // No exact match, go to jobs page with search query
          navigate(`/Jobs?search=${encodeURIComponent(term)}`);
        }
      } catch (error) {
        console.error("Search error:", error);
        navigate(`/Jobs?search=${encodeURIComponent(term)}`);
      }
    }
  };
  
  return (
    <form onSubmit={handleSearch}>
      <div className="flex border rounded-lg overflow-hidden w-full max-w-3xl mx-auto border-gray-200">
        <input 
          type="text" 
          placeholder="What job are you seeking?" 
          className="flex-grow px-4 py-2 outline-none text-black font-medium"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button 
          type="submit"
          className="bg-black text-white px-6 py-2 duration-300 hover:bg-violet-800"
        >
          Find
        </button>
        <div className="border-b border-grey-300 mt-2"></div>
      </div>
    </form>
  );
}

export default HomeSearch;