import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import axios from "../api/axios";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

// Define form field types
interface IFormInput {
  email: string;
  password: string;
}

// Create validation schema
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    // Clear local and session storage
    localStorage.clear();
    sessionStorage.clear();

    try {
      toast.loading("Logging in...", { id: "loginLoading" });
      const res = await axios.post("auth/login", data);

      localStorage.setItem("accessToken", res.data.data.accessToken);
      localStorage.setItem("refreshToken", res.data.data.refreshToken);

      toast.remove("loginLoading");
      toast.success(`Login successful!`);
      navigate("/data");
      
    } catch (err: unknown) {
      const error = err as AxiosError;

      toast.remove("loginLoading");
      console.error(error);

      if (
        error.response?.data &&
        typeof error.response.data === "object" &&
        "message" in error.response.data
      ) {
        toast.error(
          `Logging failed! ${
            (error.response.data as { message: string }).message
          }`
        );
      } else {
        toast.error("Logging failed! Something went wrong.");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto mt-8 space-y-4 p-6 border rounded-lg shadow-md"
    >
      <div>
        <label
          htmlFor="email"
          className="text-start block mb-2 text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          {...register("email")}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        />
        {errors.email && (
          <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="password"
          className="text-start block mb-2 text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          type="password"
          {...register("password")}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        />
        {errors.password && (
          <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
      >
        LogIn
      </button>
    </form>
  );
};

export default LoginPage;
