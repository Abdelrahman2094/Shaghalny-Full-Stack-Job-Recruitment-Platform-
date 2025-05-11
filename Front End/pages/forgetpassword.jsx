import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";
import axios from "axios";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email format").required("Email is required"),
});

function ForgetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [message, setMessage] = useState("");
  const [token, setToken] = useState(""); // ✅ Correct placement of useState

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/auth/forgot-password", {
        email: data.email,
      });
      setMessage(res.data.message || "Reset link sent to your email.");
      setToken(res.data.token); // ✅ for dev preview
      localStorage.setItem("resetToken", res.data.token);
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong. Try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 border border-gray-300">
        <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>
        <p className="text-gray-600 text-sm text-center mb-6">
          Enter your email to receive a password reset link.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              {...register("email")}
              className="border p-3 w-full rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-800"
            />
            <p className="text-red-500 text-xs mt-1">{errors.email?.message}</p>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg text-md hover:bg-violet-800 duration-300 "
          >
            Send Reset Link
          </button>

          {message && (
            <p className="text-sm text-center mt-4 text-green-600">{message}</p>
          )}

          {/* ✅ Dev-only clickable link */}
          {token && (
            <Link
              to={`/reset-password/${token}`} // ✅ Corrected string template
              className="block mt-2 text-center text-blue-600 underline"
            >
              Click here to reset your password
            </Link>
          )}

          <div className="text-center mt-4">
            <Link to="/Login" className="text-sm text-violet-800 hover:underline">
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgetPassword;