'use client'; // This directive marks the component as a client-side component

import { useEffect, useState } from 'react';

export default function ThankYouNotAttending() {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    // Check if window is available (client-side)
    if (typeof window !== 'undefined') {
      setImageUrl(`${window.location.origin}/images/rsvp.png`);
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-pink-100"
      style={{
        fontFamily: "'Merriweather', serif",
        color: "black",
      }}
    >
      <div className="bg-white shadow-lg rounded-lg w-full max-w-3xl">
        <div
          className="bg-cover bg-center p-8"
          style={{
            backgroundImage: `url(${imageUrl})`, // Dynamically set the image URL
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "8px",
          }}
        >
          <div className="text-center py-10">
            <h2 className="text-3xl font-bold text-red-600">
              Thank You!
            </h2>
            <p className="mt-4 text-gray-600">
              We appreciate your response. Even though you cannot attend, we are grateful for your well wishes and support!
            </p>
          </div>
        </div>

              {/* Support Us Button */}
              <div className="text-center">
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
      </div>
    </div>
  );
}
