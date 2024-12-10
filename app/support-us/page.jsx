"use client";

import React, { useState, useEffect } from "react";

export default function SupportUs() {
  const [isClient, setIsClient] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    setImageUrl(`${window.location.origin}/images/gcash.jpg`); // Set the image URL on mount
    setIsClient(true); // Mark the component as client-side
  }, []); // Empty dependency array ensures this runs only once

  if (!isClient) {
    return null; // Render nothing on the server
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-pink-50 flex flex-col items-center justify-center py-10 px-6"
      style={{
        backgroundImage: 'url("/images/rsvp.png")',
        backgroundSize: "cover",
      }}
    >
      {/* Content Section */}
      <header className="text-center mb-8 max-w-2xl w-full">
        {/* Gratitude Section */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2
            className="text-pink-700 font-bold mb-4 text-xl"
            style={{
              fontFamily: "'Merriweather', serif",
            }}
          >
            A Note of Gratitude
          </h2>
          <p
            className="text-gray-700 mb-6 text-sm leading-relaxed"
            style={{ fontFamily: "'Merriweather', serif" }}
          >
            Your presence at our wedding is the greatest gift of all. However,
            if you&apos;d love to bless us with gifts, we appreciate it - we won&apos;t
            stop you! :) Thank you for your generosity and love!
          </p>
        </div>
      </header>

      {/* Combined GCash and BDO Section */}
      <section className="max-w-2xl w-full bg-white p-6 rounded-xl shadow-lg mb-8">
        {/* GCash Section */}
        <div className="mb-6 flex flex-col items-center">
          <h3
            className="text-pink-700 font-extrabold mb-2 text-xl"
            style={{ fontFamily: "'Merriweather', serif" }}
          >
            GCash
          </h3>
          <div className="flex flex-col items-center justify-center">
            <img
              src={imageUrl}
              alt="GCash QR Code"
              className="rounded-lg shadow mb-4"
              style={{
                width: "auto",
                height: "auto",
                maxWidth: "150px", // Shrink max width
                maxHeight: "150px", // Shrink max height
              }}
            />
            <p className="text-pink-800 font-bold text-sm">Nino Francisco Alamo</p>

          </div>
        </div>

        {/* BDO Bank Transfer Section */}
        <div className="flex flex-col items-center">
          <h3
            className="text-pink-700 font-extrabold mb-2 text-xl"
            style={{ fontFamily: "'Merriweather', serif" }}
          >
            BDO Bank Transfer
          </h3>
          <ul
            className="text-gray-700 text-sm leading-relaxed text-center"
            style={{ fontFamily: "'Merriweather', serif" }}
          >
            <li className="mb-2">
              <span className="text-pink-800 font-bold">Bank Name:</span> BDO
              (Banco de Oro)
            </li>
            <li className="mb-2">
              <span className="text-pink-800 font-bold">Account Name:</span>{" "}
              Joahnna Marie Condino
            </li>
            <li>
              <span className="text-pink-800 font-bold">Account Number:</span>{" "}
              0036 9039 3250
            </li>
          </ul>
        </div>
      </section>

      {/* Closing Section */}
      <footer className="text-center mt-2">
        <h3
          className="text-3xl font-bold text-pink-700"
          style={{
            fontFamily: "'Great Vibes', cursive", // Keeping the cursive font
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
          }}
        >
          &quot;Thank you for your generosity and kindness!&quot; — Jmnin
        </h3>
      </footer>

      <style jsx>{`
        /* Print specific styles */
        @media print {
          body {
            font-family: 'Merriweather', serif;
            background: none;
            color: #333;
            margin: 0;
          }

          .min-h-screen {
            background: none !important; /* Disable background for print */
            box-shadow: none;
            padding: 0;
            width: 100%;
            margin: 0 auto;
          }

          header, section, footer {
            page-break-inside: avoid;
            margin-bottom: 20px;
          }

          .bg-gradient-to-br {
            background: none !important; /* Remove gradient background */
          }

          .bg-white {
            background: white !important;
            border: 1px solid #e5e7eb;
            padding: 10px;
          }

          img {
            max-width: 120px; /* Smaller image size for print */
            height: auto;
            margin-bottom: 15px;
          }

          .text-center {
            text-align: center;
          }

          ul {
            list-style-type: none;
            padding: 0;
            margin: 0;
          }

          li {
            padding-bottom: 6px;
            padding-left: 20px;
            border-bottom: 1px solid #ddd;
          }

          li span {
            font-weight: bold;
          }

          h2, h3 {
            margin-bottom: 12px;
            color: #e91e63; /* Using a pink color */
          }

          footer h3 {
            font-size: 24px; /* Adjust for printing */
            font-family: 'Great Vibes', cursive;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}
