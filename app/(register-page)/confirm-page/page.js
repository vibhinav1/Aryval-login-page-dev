"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ConfirmPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const accountInfo = JSON.parse(localStorage.getItem("accountInfo"));
    const personalInfo = JSON.parse(localStorage.getItem("personalInfo"));
    const childInfo = JSON.parse(localStorage.getItem("childInfo"));
    setData({ ...accountInfo, ...personalInfo, child: childInfo });
  }, []);

  const handleConfirm = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/localdb/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      setLoading(false);

      if (response.ok) {
        console.log("Registration successful");
        router.push("/user-list-page");
      } else {
        const result = await response.json();
        setError(result.error || "Registration failed");
      }
    } catch (err) {
      setLoading(false);
      setError("An unexpected error occurred");
    }
  };

  if (!data) return <div>Loading...</div>;

  return (
    <div className="max-w-lg mx-auto p-6">
      <div className="space-y-4">
        <h3 className="font-semibold">Confirm Information:</h3>
        <ul className="list-disc ml-5">
          <li>
            Full Name: {data.firstName} {data.lastName}
          </li>
          <li>Email Address: {data.email}</li>
          <li>Phone Number: {data.phone}</li>
          <li>
            Address: {data.address}, {data.city}, {data.postalCode}
          </li>
          {data.child && (
            <li>
              Child&apos;s Name: {data.child.firstName} {data.child.lastName},
              Birthday: {data.child.birthday}, Grade of Interest:{" "}
              {data.child.gradeOfInterest}, Entry Year: {data.child.entryYear}
            </li>
          )}
        </ul>
        {error && <p className="text-red-500">{error}</p>}
        <button
          className="btn btn-primary w-full"
          onClick={handleConfirm}
          disabled={loading}
        >
          {loading ? "Confirming..." : "Confirm"}
        </button>
      </div>
    </div>
  );
}
