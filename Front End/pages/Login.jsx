import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
});

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        username: data.username,
        password: data.password,
      });
  
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);
  
      const role = response.data.role;
  
      if (role === "admin") {
        navigate("/AdminDashboard"); 
      } else {
        const redirectTo = location.state?.from?.pathname || "/";
        navigate(redirectTo);
      }
  
      
    } catch (error) {
      console.error('Login error:', error.response?.data?.message || error.message);
      alert('Login failed: ' + (error.response?.data?.message || 'Server error'));
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 border border-gray-300">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username:</label>
            <input
              {...register("username")}
              className="border p-3 w-full rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-800"
            />
            <p className="text-red-500 text-xs mt-1">{errors.username?.message}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password:</label>
            <input
              {...register("password")}
              type="password"
              className="border p-3 w-full rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-800"
            />
            <p className="text-red-500 text-xs mt-1">{errors.password?.message}</p>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg text-md hover:bg-violet-800 duration-300"
          >
            Log In
          </button>

          <div className="text-center mt-4">
            <Link to="/ForgetPassword" className="text-sm text-violet-800 hover:underline">
              Forgot Password?
            </Link>
          </div>

          <div className="text-center mt-2">
            <span className="text-sm text-gray-600">Don't have an account? </span>
            <Link to="/SignUp" className="text-sm text-violet-800 hover:underline">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;