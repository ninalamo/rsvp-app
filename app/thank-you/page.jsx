"use client"; // Ensure the code runs on the client side

import React, { useState } from "react";

export default function ThankYou() {
  const [isClient, setIsClient] = useState(false);

  // Detect when the component is mounted on the client side
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  // If the component is still rendering on the server, render a fallback message
  if (!isClient) {
    return null;
  }

  return (
    <div className="min-h-screen bg-pink-100 flex flex-col items-center justify-center py-10 px-6">
      {/* Content Section */}
      <header className="text-center mb-12" id="thank-you-content">

        {/* Event Details */}
        <div className="text-center mb-8">
          <h2
            className="text-pink-700 font-bold mb-4"
            style={{
              fontFamily: "'Merriweather', serif", // Uniform font family for headings
            }}
          >
            Wedding Details
          </h2>

          <p className="mb-2" style={{ fontFamily: "'Merriweather', serif" }}>
            <span className="text-pink-800 font-bold">Date & Time:&nbsp;January 4, 2025, 10:00 AM</span>
          </p>

          <p className="mb-2" style={{ fontFamily: "'Merriweather', serif" }}>
            <span className="text-pink-800 font-bold">Location:</span>&nbsp;
            <a
              href="https://www.google.com/maps?q=Parish+of+The+Holy+Family,+Imus"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Parish of The Holy Family, Imus
            </a>
          </p>

          <p style={{ fontFamily: "'Merriweather', serif" }}>
            <span className="text-pink-800 font-bold">Dine with us at:</span>&nbsp;
            <a
              href="https://www.contis.ph/tools/locations/locations/conti-s-bakeshop-restaurant-with-drive-thru-kawit-cavite"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Conti&apos;s - Kawit, Cavite
            </a>
          </p>
        </div>

        {/* Dress Code Section */}
        <div className="mt-8 text-center">

          <p
            className="text-lg text-pink-500"
            style={{
              fontFamily: "'Merriweather', serif",
              fontSize: "1rem",
              fontWeight: "300", // Lighter font weight
            }}
          >
            We recommend elegant, modest attire. Light or pastel colors like white would be lovely!
          </p>
        </div>

              {/* Support Us Button */}
              <div className="text-center mt-12">
                <a
                  href="/support-us"
                  className="inline-block bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 text-white font-medium py-2 px-4 rounded-md shadow-md hover:shadow-lg hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-yellow-300"
                  style={{
                    fontSize: "1rem",
                    marginBottom: "1rem",
                  }}
                >
                  🌟 Support Us 🌟
                </a>
              </div>
      </header>
      <h3
          className="text-5xl font-bold text-pink-700 mb-4"
          style={{
            fontFamily: "'Great Vibes', cursive", // Keep cursive font for the quote
          }}
        >
          &quot;Thanks and see you!&quot; — Jmnin
        </h3>



    </div>
  );
}
