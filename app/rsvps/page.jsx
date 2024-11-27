"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { API_URL } from "../../config/config";

export default function RSVPListPage() {
  const [rsvps, setRsvps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRSVPs = async () => {
      try {
        const { data, error } = await supabase.from('rsvp').select('*');
        if (error) {
          console.error('Error fetching rsvps:', error);
          return;
        }
        console.log('Rsvps:', data);
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading RSVPs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">Failed to load RSVPs: {error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-700 mb-4">RSVP List</h1>
      <div className="overflow-x-auto w-full max-w-4xl">
        <table className="table-auto border-collapse border border-gray-200 w-full text-left text-sm text-gray-600">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Message</th>
              <th className="border border-gray-300 px-4 py-2">Date</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {rsvps.length > 0 ? (
              rsvps.map(({ id, name, message, date, isAttending }) => (
                <tr key={id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">{name}</td>
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
                  colSpan="4"
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
