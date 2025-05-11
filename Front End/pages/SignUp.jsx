import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios"

const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  username: yup.string().required("Username is required"),  // ✅ Correct here
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log("Data sending to backend:", data);
    try {
      const response = await axios.post('http://localhost:3000/auth/signup', {
        username: data.username,     
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
      });
  
      navigate("/Login")
    } catch (error) {
      console.error('Signup error: ', error.response?.data?.message || error.message);
      alert('Signup Failed: '+ (error.response?.data?.message|| 'server error'));
    }
  };


  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 border border-gray-300">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name:</label>
              <input
                {...register("firstName")}
                className="border p-3 w-full rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-800"
              />
              <p className="text-red-500 text-xs mt-1">{errors.firstName?.message}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Last Name:</label>
              <input
                {...register("lastName")}
                className="border p-3 w-full rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-800"
              />
              <p className="text-red-500 text-xs mt-1">{errors.lastName?.message}</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">User Name:</label>
            <input
              {...register("username")}
              className="border p-3 w-full rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-800"
            />
            <p className="text-red-500 text-xs mt-1">{errors.username?.message}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              {...register("email")}
              className="border p-3 w-full rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-800"
            />
            <p className="text-red-500 text-xs mt-1">{errors.email?.message}</p>
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

          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password:</label>
            <input
              {...register("confirmPassword")}
              type="password"
              className="border p-3 w-full rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-800"
            />
            <p className="text-red-500 text-xs mt-1">{errors.confirmPassword?.message}</p>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg text-md hover:bg-violet-800 duration-300"
          >
            Sign Up
          </button>

          <div className="text-center mt-4">
            <span className="text-sm text-gray-600">Already have an account? </span>
            <Link to="/Login" className="text-sm text-violet-800 hover:underline">
              Log In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
