"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import NotFound from "@/app/(register-page)/user-page/[id]/not-found";

export default function UserProfile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`/api/localdb/users/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("User not found");
          }
          return response.json();
        })
        .then((data) => {
          setUser(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!user) {
    return <NotFound />;
  }

  return (
    <div className="max-w-lg mx-auto p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">
        {user.FirstName} {user.LastName}
      </h1>
      <p className="mt-2">
        <span className="font-medium">Email:</span> {user.account.email}
      </p>
      <p>
        <span className="font-medium">Phone:</span> {user.Phone}
      </p>
      <p>
        <span className="font-medium">Address:</span> {user.Address}
      </p>
      <p>
        <span className="font-medium">City:</span> {user.City}
      </p>
      <p>
        <span className="font-medium">Postal Code:</span> {user.PostalCode}
      </p>
      {user.student && (
        <div className="mt-4">
          <h2 className="text-2xl font-semibold">Child Information:</h2>
          <ul className="list-disc ml-5 mt-2">
            <li>
              <p>
                <span className="font-medium">Name:</span>{" "}
                {user.student.First_Name__c} {user.student.Last_Name__c}
              </p>
              <p>
                <span className="font-medium">Birthday:</span>{" "}
                {new Date(user.student.Birthdate__c).toLocaleDateString()}
              </p>
              <p>
                <span className="font-medium">Grade of Interest:</span>{" "}
                {user.student.Grade_of_Interest__c}
              </p>
              <p>
                <span className="font-medium">Entry Year:</span>{" "}
                {user.student.Entry_Year__c}
              </p>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
