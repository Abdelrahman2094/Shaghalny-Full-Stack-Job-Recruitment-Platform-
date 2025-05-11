import { useState, useEffect } from 'react';
import { Search, CheckCircle, Bell, FileText, MessageSquare, ArrowUp } from 'lucide-react';
import { Link } from "react-router-dom";
import axios from 'axios';

function JobseekersPage() {
  const [successStories, setSuccessStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUserStory, setCurrentUserStory] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch success stories
        const { data: stories } = await axios.get('http://localhost:3000/auth/success-stories');
        setSuccessStories(stories);
        
        // Check if the user is logged in
        const token = localStorage.getItem('token');
        if (token) {
          // Fetch current user's profile
          const { data: userData } = await axios.get('http://localhost:3000/auth/me', {
            headers: { Authorization: `Bearer ${token}` },
          });
          // If the user has a story, store it
          if (userData.story) {
            setCurrentUserStory({
              firstName: userData.firstName,
              lastName: userData.lastName,
              title: userData.title || "Job Seeker",
              story: userData.story
            });
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to render success stories with appropriate fallbacks
  const renderSuccessStories = () => {
    if (loading) {
      return (
        <div className="col-span-3 text-center py-12">
          <p className="text-violet-800">Loading success stories...</p>
        </div>
      );
    }

    // If we have stories from the database, show those
    if (successStories.length > 0) {
      return successStories.slice(0, 3).map((story, index) => (
        <div key={index} className="bg-violet-50 p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
            <div>
              <h3 className="font-semibold text-violet-800">{story.firstName} {story.lastName}</h3>
              <p className="text-violet-800 text-sm">{story.title || "Job Seeker"}</p>
            </div>
          </div>
          <p className="text-violet-800">
            {story.story || "No story available."}
          </p>
        </div>
      ));
    }

    // If there are no stories from the database, show the static examples
    // with user's story replacing Ahmed Hassan if available
    const staticStories = [
      // First story - either user's story or Ahmed Hassan's
      currentUserStory ? {
        name: `${currentUserStory.firstName} ${currentUserStory.lastName}`,
        title: currentUserStory.title,
        story: currentUserStory.story
      } : {
        name: "Ahmed Hassan",
        title: "Software Engineer",
        story: "\"I found my dream job at a leading tech company within just two weeks of using Shaghalny. The platform made it easy to showcase my skills and connect with the right employers.\""
      },
      // Always include Nour Ibrahim's story
      {
        name: "Nour Ibrahim",
        title: "Marketing Specialist",
        story: "\"The personalized job alerts helped me discover opportunities I wouldn't have found otherwise. Thanks to Shaghalny, I'm now working at my dream company with a great salary.\""
      },
      // Always include Layla Mahmoud's story
      {
        name: "Layla Mahmoud",
        title: "HR Manager",
        story: "\"The resume builder tool helped me completely transform my CV. Within days of updating my profile, I started receiving interview requests from top companies.\""
      }
    ];

    return staticStories.map((story, index) => (
      <div key={index} className="bg-violet-50 p-6 rounded-lg">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
          <div>
            <h3 className="font-semibold text-violet-800">{story.name}</h3>
            <p className="text-violet-800 text-sm">{story.title}</p>
          </div>
        </div>
        <p className="text-violet-800">{story.story}</p>
      </div>
    ));
  };
 
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Hero Section */}
      <div className="bg-violet-800 py-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row">
          <div className="md:w-1/2 text-white space-y-6 mb-10 md:mb-0">
            <h1 className="text-5xl font-bold leading-tight">Find Your Dream Job Today</h1>
            <p className="text-xl">
              Join thousands of job seekers who found their perfect career match on Shaghalny. 
              Your next opportunity is just a click away.
            </p>
          </div>
          <div className="md:w-1/2 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-gray-400 p-20">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M12 8v8"></path>
                <path d="M8 12h8"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Shaghalny */}
      <div className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-violet-800 mb-4">Why Choose Shaghalny?</h2>
            <p className="text-violet-800 text-lg max-w-3xl mx-auto">
              Our platform offers everything you need to advance your career and find the perfect job match.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
              <div className="bg-violet-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Search className="text-violet-800" />
              </div>
              <h3 className="text-xl font-semibold text-violet-800 mb-3">Access Thousands of Jobs</h3>
              <p className="text-violet-800">
                Browse through our extensive database of verified job listings across various industries and locations.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
              <div className="bg-violet-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="text-violet-800" />
              </div>
              <h3 className="text-xl font-semibold text-violet-800 mb-3">Easy Application Process</h3>
              <p className="text-violet-800">
                Apply to multiple jobs with just a few clicks using your saved profile and resume information.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
              <div className="bg-violet-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Bell className="text-violet-800" />
              </div>
              <h3 className="text-xl font-semibold text-violet-800 mb-3">Personalized Job Alerts</h3>
              <p className="text-violet-800">
                Receive customized notifications about new job opportunities that match your skills and preferences.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
              <div className="bg-violet-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <FileText className="text-violet-800" />
              </div>
              <h3 className="text-xl font-semibold text-violet-800 mb-3">Resume Builder & Guidance</h3>
              <p className="text-violet-800">
                Create a professional resume with our easy-to-use tools and get expert tips to improve your job applications.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
              <div className="bg-violet-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <MessageSquare className="text-violet-800" />
              </div>
              <h3 className="text-xl font-semibold text-violet-800 mb-3">Direct Employer Connection</h3>
              <p className="text-violet-800">
                Connect directly with hiring managers and recruiters through our secure messaging system.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
              <div className="bg-violet-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <ArrowUp className="text-violet-800" />
              </div>
              <h3 className="text-xl font-semibold text-violet-800 mb-3">Profile Visibility</h3>
              <p className="text-violet-800">
                Make your profile visible to thousands of employers actively looking for candidates with your skills.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-violet-800 mb-4">How It Works</h2>
            <p className="text-violet-800 text-lg">
              Finding your dream job is simple with our easy three-step process
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-100 relative">
              <div className="bg-violet-800 text-white w-12 h-12 rounded-full flex items-center justify-center absolute -top-6 left-6 text-xl font-bold">
                1
              </div>
              <div className="pt-6">
                <h3 className="text-xl font-semibold text-violet-800 mb-3 mt-2">Get Started</h3>
                <p className="text-violet-800">
                  Complete your profile to start receiving job matches based on your skills and interests.
                </p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-100 relative">
              <div className="bg-violet-800 text-white w-12 h-12 rounded-full flex items-center justify-center absolute -top-6 left-6 text-xl font-bold">
                2
              </div>
              <div className="pt-6">
                <h3 className="text-xl font-semibold text-violet-800 mb-3 mt-2">Apply Easily</h3>
                <p className="text-violet-800">
                  Use your saved information to apply quickly to the best-matched job openings.
                </p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-100 relative">
              <div className="bg-violet-800 text-white w-12 h-12 rounded-full flex items-center justify-center absolute -top-6 left-6 text-xl font-bold">
                3
              </div>
              <div className="pt-6">
                <h3 className="text-xl font-semibold text-violet-800 mb-3 mt-2">Get Hired</h3>
                <p className="text-violet-800">
                  Connect with top employers and land interviews that take your career to the next level.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Stories */}
      <div className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-violet-800 mb-4">Success Stories</h2>
            <p className="text-violet-800 text-lg">
              Hear from job seekers who found their dream careers through Shaghalny
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {renderSuccessStories()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobseekersPage;