import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

const schema = yup.object().shape({
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/auth/reset-password", {
        token,
        password: data.password,
      });
      setMessage(res.data.message);
      setTimeout(() => navigate("/login"), 2000); // Redirect to login
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 border border-gray-300">
        <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">New Password:</label>
            <input
              {...register("password")}
              type="password"
              className="border p-3 w-full rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-800"
            />
            <p className="text-red-500 text-xs mt-1">{errors.password?.message}</p>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg text-md hover:bg-violet-800 duration-300 "
          >
            Reset Password
          </button>

          {message && <p className="text-center mt-4 text-sm text-green-600">{message}</p>}
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;