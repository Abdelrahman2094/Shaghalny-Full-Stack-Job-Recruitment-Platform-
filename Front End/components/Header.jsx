import logo from '../assets/images/logo.png';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { UserIcon} from "@heroicons/react/24/solid"; 

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // detect route changes
  

const role = localStorage.getItem("role");

  
  useEffect(() => {
    // Every time the route changes, check token
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // if token exists → logged in
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsLoggedIn(false);
    navigate('/login'); // after logout, go back to login page
  };

  return (
    <header className="w-full px-4 py-6 bg-white flex justify-between items-center">
      <Link to="/">
        <img className="w-auto h-12 ml-4 mt-1" src={logo} alt="Logo" />
      </Link>

      <nav className="ml space-x-8">
        <Link to="/" className="group relative text-black text-xl font-semibold">
          Home
          <span className="absolute left-1/2 bottom-0 h-0.5 w-0 bg-black transition-all duration-300 group-hover:left-0 group-hover:w-full"></span>
        </Link>

        <Link to="/Jobs" className="group relative text-black text-xl font-semibold">
          Job
          <span className="absolute left-1/2 bottom-0 h-0.5 w-0 bg-black transition-all duration-300 group-hover:left-0 group-hover:w-full"></span>
        </Link>

        <Link to="/RecruitersPage" className="group relative text-black text-xl font-semibold">
          Recruiters
          <span className="absolute left-1/2 bottom-0 h-0.5 w-0 bg-black transition-all duration-300 group-hover:left-0 group-hover:w-full"></span>
        </Link>

        <Link to="/JobseekersPage" className="group relative text-black text-xl font-semibold">
          Job Seekers
          <span className="absolute left-1/2 bottom-0 h-0.5 w-0 bg-black transition-all duration-300 group-hover:left-0 group-hover:w-full"></span>
        </Link>

        <Link to="/AboutUs" className="group relative text-black text-xl font-semibold">
          About Us
          <span className="absolute left-1/2 bottom-0 h-0.5 w-0 bg-black transition-all duration-300 group-hover:left-0 group-hover:w-full"></span>
        </Link>

        <Link to="/FAQ" className="group relative text-black text-xl font-semibold">
          FAQ
          <span className="absolute left-1/2 bottom-0 h-0.5 w-0 bg-black transition-all duration-300 group-hover:left-0 group-hover:w-full"></span>
        </Link>

        <Link to="/ContactUs" className="group relative text-black text-xl font-semibold">
          Contact Us
          <span className="absolute left-1/2 bottom-0 h-0.5 w-0 bg-black transition-all duration-300 group-hover:left-0 group-hover:w-full"></span>
        </Link>
          {role === "admin" && (
          <Link to="/AdminDashboard" className="group relative text-black text-xl font-semibold">
              Admin Dashboard
              <span className="absolute left-1/2 bottom-0 h-0.5 w-0 bg-black transition-all duration-300 group-hover:left-0 group-hover:w-full"></span>
          </Link>
  )}
      </nav>

      <div className="ml-6 flex items-center gap-4">
        {!isLoggedIn ? (
          <Link to="/login" className="px-5 py-2 bg-violet-600 text-white text-lg font-medium rounded-full hover:bg-violet-800 transition">
            Log In / Sign Up
          </Link>
        ) : (
          <>
            <Link to="/Profilepage" className="p-2 bg-gray-400 text-white rounded-full hover:bg-gray-500 transition">
                <UserIcon className="h-6 w-6" />
            </Link>
            <button
              onClick={handleLogout}
              className="px-5 py-2 bg-violet-600 text-white text-lg font-medium rounded-full hover:bg-violet-800 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;