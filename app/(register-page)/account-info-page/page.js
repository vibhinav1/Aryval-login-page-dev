"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import DOMPurify from "dompurify";

export default function AccountInfoPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const isInvalidText = (text) => {
    return !text || text.trim() === "";
  };

  const validateForm = () => {
    if (
      isInvalidText(formData.email) ||
      !formData.email.includes("@") ||
      formData.email !== formData.confirmEmail ||
      isInvalidText(formData.password) ||
      formData.password !== formData.confirmPassword
    ) {
      alert("Invalid input. Please fill in all fields correctly.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const sanitizedData = {
      email: DOMPurify.sanitize(formData.email),
      password: DOMPurify.sanitize(formData.password),
    };

    localStorage.setItem("accountInfo", JSON.stringify(sanitizedData));
    router.push("/personal-info-page");
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Account Information
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="input input-bordered w-full py-2 px-4"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium">Confirm Email Address</label>
          <input
            type="email"
            name="confirmEmail"
            value={formData.confirmEmail}
            onChange={handleChange}
            placeholder="Confirm Email Address"
            className="input input-bordered w-full py-2 px-4"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="input input-bordered w-full py-2 px-4"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            className="input input-bordered w-full py-2 px-4"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-full py-3">
          Next
        </button>
      </form>
    </div>
  );
}
