"use client"; // Ensure the code runs on the client side

import React, { useState, useEffect } from "react";

// Dynamically import html2pdf.js only on the client-side
import dynamic from "next/dynamic";
const html2pdf = dynamic(() => import("html2pdf.js"), { ssr: false });

export default function ThankYou() {
  const [isClient, setIsClient] = useState(false);

  // Detect when the component is mounted on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Function to trigger PDF generation
  const downloadPDF = () => {
    const element = document.getElementById("thank-you-content");
    html2pdf()
      .from(element)
      .save("thank_you_details.pdf");
  };

  // If the component is still rendering on the server, render a fallback message
  if (!isClient) {
    return null;
  }

  return (

    <div className="min-h-screen bg-pink-100 flex flex-col items-center justify-center py-10 px-6">
      {/* Content Section */}
      <header className="text-center mb-12" id="thank-you-content">
        <p
          className="text-lg text-pink-700 mb-6"
          style={{
            fontFamily: "'Merriweather', serif",
            fontSize: "1.2rem",
            fontWeight: "400",
          }}
        >
          We are thrilled to have you celebrate with us on our special day!
          <br />
        </p>

        {/* Event Details */}
        <div
          className="text-pink-700 text-lg"
          style={{
            fontFamily: "'Merriweather', serif",
            fontSize: "1.2rem",
            fontWeight: "400",
          }}
        >
          <p className="mb-4"> See you soon. Please see details below:</p>
          <p className="mb-2">
            <span className=" text-pink-800">Date & Time:</span>&nbsp;January 4, 2025, 10:00 AM
          </p>

          <p className="mb-2">
            <span className=" text-pink-800">Location:</span>&nbsp;
            <a
              href="https://www.google.com/maps?q=Parish+of+The+Holy+Family,+Imus"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
              style={{
                fontFamily: "'Merriweather', serif",
                fontSize: "1.2rem",
                fontWeight: "400",
              }}
            >
              Parish of The Holy Family, Imus
            </a>
          </p>

          <p>
            <span className=" text-pink-800">Dine with us at:</span>&nbsp;
            <a
              href="https://www.contis.ph/tools/locations/locations/conti-s-bakeshop-restaurant-with-drive-thru-kawit-cavite"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
              style={{
                fontFamily: "'Merriweather', serif",
                fontSize: "1.2rem",
                fontWeight: "400",
              }}
            >
              Conti&apos;s - Kawit, Cavite
            </a>
          </p>
        </div>
        <hr />
        <br />
        {/* Scripture */}
        <div className="text-center mb-8">
          <p className="text-lg italic text-pink-600">
            &quot;Let all that you do be done in love.&quot; — 1 Corinthians 16:14
          </p>
        </div>
      </header>

      <h1
          className="text-5xl font-bold text-pink-700 mb-4"
          style={{
            fontFamily: "'Great Vibes', cursive",
          }}
        >
          Thank You!!!
        </h1>

      {/* Button to Download PDF */}
      <button
        onClick={downloadPDF}
        className="bg-pink-600 text-white px-6 py-3 rounded-lg mt-6"
      >
        Save Event Details as PDF
      </button>
    </div>
  );
}
