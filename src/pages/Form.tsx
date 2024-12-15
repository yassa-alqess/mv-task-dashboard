import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Navbar from "../components/NavBar";
import toast from "react-hot-toast";
import axios from "../api/axios";
import { AxiosError } from "axios";

// Define form field types
interface IFormInput {
  fullName: string;
  email: string;
  phone: string;
  nid: string;
}

// Create validation schema
const schema = yup.object().shape({
  fullName: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: yup
    .string()
    .matches(/^[0-9]+$/, "Phone number must be a number")
    .length(11, "Your Phone Is too short")
    .required("Phone is required"),
  nid: yup
    .string()
    .length(14, "Your national ID Is too short")
    .required("national ID is required"),
});

const FormComponent: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      // showLoading("Setting up appointment...");
      toast.loading("Setting up your data...", {
        id: "lead-loading",
      });
      await axios.post("/leads", {
        ...data,
      });
      toast.remove("lead-loading");
      toast.success("Submitted successfully");
    } catch (err: unknown) {
      // showError(`Appointment failed! ${error}`, true);
      toast.remove("lead-loading");

      if (err instanceof AxiosError && err.response?.data) {
        const errorMessage = (err.response.data as { message?: string })
          .message;
        toast.error(errorMessage ?? "An error occurred");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <>
      <Navbar />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto mt-8 space-y-4 p-6 border rounded-lg shadow-md"
      >
        <div>
          <label
            htmlFor="fullName"
            className="text-start block mb-2 text-sm font-medium text-gray-700"
          >
            Full Name
          </label>
          <input
            {...register("fullName")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          />
          {errors.fullName && (
            <p className="mt-2 text-sm text-red-600">{errors.fullName.message}</p>
          )}
        </div>
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
            htmlFor="phone"
            className="text-start block mb-2 text-sm font-medium text-gray-700"
          >
            phone
          </label>
          <input
            type="phone"
            {...register("phone")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          />
          {errors.phone && (
            <p className="mt-2 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="nid"
            className="text-start block mb-2 text-sm font-medium text-gray-700"
          >
            National ID
          </label>
          <input
            type="nid"
            {...register("nid")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          />
          {errors.nid && (
            <p className="mt-2 text-sm text-red-600">{errors.nid.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default FormComponent;
