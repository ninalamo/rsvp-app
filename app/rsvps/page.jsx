"use client";

import { useEffect, useState } from "react";

export default function RSVPListPage() {
  const [rsvps, setRsvps] = useState([]);

  useEffect(() => {
    const fetchRSVPs = async () => {
      try {
        const response = await fetch("http://localhost:4000/rsvps");
        const data = await response.json();
        setRsvps(data);
      } catch (error) {
        console.error("Error fetching RSVPs:", error);
      }
    };
    fetchRSVPs();
  }, []);

  return (
    <div>
      <h1>RSVP List</h1>
      <ul>
        {rsvps.map(({ id, name, message, date, isAttending }) => (
          <li key={id}>
            <h2>{name}</h2>
            <p>{message}</p>
            <p>Date: {new Date(date).toLocaleDateString()}</p>
            <p>Status: {isAttending ? "Attending" : "Not Attending"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
