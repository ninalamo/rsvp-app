"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import * as XLSX from "xlsx";

export default function RSVPListPage() {
  const [rsvps, setRsvps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRSVPs = async () => {
      try {
        const { data, error } = await supabase.from("rsvp").select("*");
        if (error) {
          console.error("Error fetching RSVPs:", error);
          setError(error.message);
          return;
        }
        console.log("RSVPs:", data);
        setRsvps(data);
      } catch (err) {
        console.error("Error fetching RSVPs:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRSVPs();
  }, []);

  const downloadRSVPs = (type) => {
    const formattedData = rsvps.map(({ id, name, email, message, date, isAttending }) => ({
      Name: name,
      Email: email,
      Message: message,
      Date: new Date(date).toLocaleDateString(),
      Status: isAttending ? "Attending" : "Not Attending",
    }));

    const ws = XLSX.utils.json_to_sheet(formattedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "RSVPs");

    if (type === "csv") {
      XLSX.writeFile(wb, "RSVPs.csv", { bookType: "csv" });
    } else if (type === "excel") {
      XLSX.writeFile(wb, "RSVPs.xlsx", { bookType: "xlsx" });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-gray-600">Loading RSVPs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-red-500">Failed to load RSVPs: {error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-700 mb-4">RSVP List</h1>
      <div className="mb-4">
        <button
          onClick={() => downloadRSVPs("csv")}
          className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition duration-300"
        >
          Download as CSV
        </button>
        <button
          onClick={() => downloadRSVPs("excel")}
          className="ml-4 px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600 transition duration-300"
        >
          Download as Excel
        </button>
      </div>
      <div className="overflow-x-auto w-full max-w-4xl">
        <table className="table-auto border-collapse border border-gray-200 w-full text-left text-sm text-gray-600">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Message</th>
              <th className="border border-gray-300 px-4 py-2">Date</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {rsvps.length > 0 ? (
              rsvps.map(({ id, name, email, message, date, isAttending }) => (
                <tr key={id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">{name}</td>
                  <td className="border border-gray-300 px-4 py-2">{email}</td>
                  <td className="border border-gray-300 px-4 py-2">{message}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(date).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {isAttending ? "Attending" : "Not Attending"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-4 text-gray-500 border border-gray-300"
                >
                  No RSVPs available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
