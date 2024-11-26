"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [form, setForm] = useState({ name: "", message: "", isAttending: false });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:4000/rsvps", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          date: new Date().toISOString(),
        }),
      });
      router.push("/thank-you");
    } catch (error) {
      console.error("Error submitting RSVP:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h1>RSVP Form</h1>
      <div>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Message:
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Will you attend?
          <input
            type="checkbox"
            name="isAttending"
            checked={form.isAttending}
            onChange={handleChange}
          />
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
