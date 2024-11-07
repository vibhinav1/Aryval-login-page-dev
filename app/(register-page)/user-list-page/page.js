"use client";
import { useEffect, useState } from "react";

export default function UserListPage() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    const fetchLeads = async () => {
      const response = await fetch("/api/localdb/users");
      if (response.ok) {
        const result = await response.json();
        setLeads(result);
      } else {
        console.error("Failed to fetch leads");
      }
    };

    fetchLeads();
  }, []);

  return (
    <div className="max-w-lg mx-auto p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">
        All Registered Leads
      </h1>
      {leads.length === 0 ? (
        <p className="text-center">No leads registered yet.</p>
      ) : (
        <ul className="space-y-4">
          {leads.map((lead) => (
            <li key={lead.id} className="p-4 bg-gray-100 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold">
                {lead.FirstName} {lead.LastName}
              </h2>
              <p className="mt-2">
                <span className="font-medium">Email Address:</span>{" "}
                {lead.account.email}
              </p>
              <p>
                <span className="font-medium">Phone Number:</span> {lead.Phone}
              </p>
              <p>
                <span className="font-medium">Address:</span> {lead.Address},{" "}
                {lead.City}, {lead.PostalCode}
              </p>
              {lead.student && (
                <ul className="list-disc ml-5 mt-2">
                  <li>
                    <p>
                      <span className="font-medium">Child&apos;s Name:</span>{" "}
                      {lead.student.First_Name__c} {lead.student.Last_Name__c}
                    </p>
                    <p>
                      <span className="font-medium">Birthday:</span>{" "}
                      {new Date(lead.student.Birthdate__c).toLocaleDateString()}
                    </p>
                    <p>
                      <span className="font-medium">Grade of Interest:</span>{" "}
                      {lead.student.Grade_of_Interest__c}
                    </p>
                    <p>
                      <span className="font-medium">Entry Year:</span>{" "}
                      {lead.student.Entry_Year__c}
                    </p>
                  </li>
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
