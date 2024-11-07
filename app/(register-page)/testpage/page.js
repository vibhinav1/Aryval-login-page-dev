"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/salesforce", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-lg mx-auto p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Events Data</h1>
      {data ? (
        <ul className="space-y-4">
          {data.records.map((record) => (
            <li
              key={record.Id}
              className="p-4 bg-gray-100 rounded-lg shadow-sm"
            >
              <h2 className="text-xl font-semibold">{record.Name}</h2>
              <p className="mt-2">
                <span className="font-medium">Start Date:</span>{" "}
                {record.StartDate}
              </p>
              <p>
                <span className="font-medium">End Date:</span>{" "}
                {record.EndDate ? record.EndDate : "N/A"}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center">Loading...</p>
      )}
    </div>
  );
}
