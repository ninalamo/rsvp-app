"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { API_URL } from "../config/config";

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
      await fetch(`${API_URL}/rsvps`, {
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
    <div className="flex items-center justify-center min-h-screen bg-pink-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl">
      <header className="text-center mb-8">
        <h1
          className="text-4xl font-bold"
          style={{
            fontFamily: "'Great Vibes', cursive",
            color: "#333",
          }}
        >
          Finally - this is it!
        </h1>
        <span
          className="text-lg"
          style={{
            fontFamily: "'Merriweather', serif",
            fontSize: "1.5rem",
            color: "#555",
          }}
        >
          <small> We invite you to the wedding of </small>
          <br />
          <span className="font-semibold">Joahnna Marie Condino</span> and{" "}
          <span className="font-semibold">Nino Francisco Alamo</span>
          <br />
         {/* Date, Time, and Location */}
         <p className="mt-4 text-lg" style={{ color: "#555" }}>
            <span className="font-semibold">Date & Time:</span> January 4, 2025, 10:00 AM<br />
            <span className="font-semibold">Location:</span> <a
              href="https://www.google.com/maps?q=Parish+of+The+Holy+Family,+Imus"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Parish of The Holy Family, Imus
            </a>
          </p>
          <p className="text-lg" style={{ color: "#555" }}>
            <span className="font-semibold">Reception:</span> <a
              href="https://www.contis.ph/tools/locations/locations/conti-s-bakeshop-restaurant-with-drive-thru-kawit-cavite"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Conti&apos;s - Kawit, Cavite
            </a>
          </p>
        </span>
      </header>
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <table className="w-full text-gray-700">
            <tbody>
              <tr>
                <td className="p-4 text-right font-medium">Name:</td>
                <td className="p-4">
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-pink-300"
                  />
                </td>
              </tr>
              <tr>
                <td className="p-4 text-right font-medium">Message:</td>
                <td className="p-4">
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-pink-300"
                  ></textarea>
                </td>
              </tr>
              <tr>
                <td className="p-4 text-right font-medium">Will you attend?</td>
                <td className="p-4">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      name="isAttending"
                      checked={form.isAttending}
                      onChange={handleChange}
                      className="h-5 w-5 text-pink-600 focus:ring-pink-300 rounded"
                    />
                    <span className="text-gray-700">Yes, I will attend!</span>
                  </label>
                </td>
              </tr>
            </tbody>
          </table>
          <button
            type="submit"
            className="w-full bg-pink-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-pink-700 transition duration-200"
          >
            Submit RSVP
          </button>
        </form>
      </div>
    </div>
  );
}
