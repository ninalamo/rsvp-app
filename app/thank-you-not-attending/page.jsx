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
      </div>
    </div>
  );
}
