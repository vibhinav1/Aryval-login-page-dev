"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import DOMPurify from "dompurify";

export default function PersonalInfoPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
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
      isInvalidText(formData.firstName) ||
      isInvalidText(formData.lastName) ||
      isInvalidText(formData.phone) ||
      isInvalidText(formData.address) ||
      isInvalidText(formData.city) ||
      isInvalidText(formData.postalCode)
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
      firstName: DOMPurify.sanitize(formData.firstName),
      lastName: DOMPurify.sanitize(formData.lastName),
      phone: DOMPurify.sanitize(formData.phone),
      address: DOMPurify.sanitize(formData.address),
      city: DOMPurify.sanitize(formData.city),
      postalCode: DOMPurify.sanitize(formData.postalCode),
    };

    localStorage.setItem("personalInfo", JSON.stringify(sanitizedData));
    router.push("/child-info-page");
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Personal Information
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col">
          <label className="mb-1 font-medium">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="input input-bordered w-full py-2 px-4"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="input input-bordered w-full py-2 px-4"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="input input-bordered w-full py-2 px-4"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            className="input input-bordered w-full py-2 px-4"
            required
          />
        </div>

        <div className="flex space-x-4">
          <div className="flex flex-col w-1/2">
            <label className="mb-1 font-medium">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              className="input input-bordered w-full py-2 px-4"
              required
            />
          </div>
          <div className="flex flex-col w-1/2">
            <label className="mb-1 font-medium">Postal / Zip Code</label>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              placeholder="Postal / Zip Code"
              className="input input-bordered w-full py-2 px-4"
              required
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-full py-3">
          Next
        </button>
      </form>
    </div>
  );
}
