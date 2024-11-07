"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import DOMPurify from "dompurify";

export default function ChildInfoPage() {
  const router = useRouter();

  const [childData, setChildData] = useState({
    firstName: "",
    lastName: "",
    birthday: "",
    gradeOfInterest: "",
    entryYear: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChildData({ ...childData, [name]: value });
  };

  const isInvalidText = (text) => {
    return !text || text.trim() === "";
  };

  const validateForm = () => {
    if (
      isInvalidText(childData.firstName) ||
      isInvalidText(childData.lastName) ||
      isInvalidText(childData.birthday) ||
      isInvalidText(childData.gradeOfInterest) ||
      isInvalidText(childData.entryYear)
    ) {
      alert("Invalid input. Please fill in all fields correctly.");
      return false;
    }
    return true;
  };

  const handleSkip = () => {
    router.push("/confirm-page");
  };

  const handleNext = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const sanitizedData = {
      firstName: DOMPurify.sanitize(childData.firstName),
      lastName: DOMPurify.sanitize(childData.lastName),
      birthday: DOMPurify.sanitize(childData.birthday),
      gradeOfInterest: DOMPurify.sanitize(childData.gradeOfInterest),
      entryYear: DOMPurify.sanitize(childData.entryYear),
    };

    localStorage.setItem("childInfo", JSON.stringify(sanitizedData));
    router.push("/confirm-page");
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Child Information</h1>
      <form className="space-y-6" onSubmit={handleNext}>
        <div className="flex flex-col">
          <label className="mb-1 font-medium">First Name</label>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            className="input input-bordered w-full py-2 px-4"
            value={childData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Last Name</label>
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            className="input input-bordered w-full py-2 px-4"
            value={childData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Birthday</label>
          <input
            type="date"
            name="birthday"
            className="input input-bordered w-full py-2 px-4"
            value={childData.birthday}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Grade of Interest</label>
          <input
            type="text"
            name="gradeOfInterest"
            placeholder="Grade of Interest"
            className="input input-bordered w-full py-2 px-4"
            value={childData.gradeOfInterest}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Entry Year</label>
          <input
            type="text"
            name="entryYear"
            placeholder="Entry Year"
            className="input input-bordered w-full py-2 px-4"
            value={childData.entryYear}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex justify-between mt-6">
          <button
            type="button"
            className="btn btn-outline w-1/2 mr-4 py-3"
            onClick={handleSkip}
          >
            Skip for now
          </button>
          <button type="submit" className="btn btn-primary w-1/2 py-3">
            Next
          </button>
        </div>
      </form>
    </div>
  );
}
