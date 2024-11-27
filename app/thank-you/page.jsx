import React from "react";

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-pink-100 flex flex-col items-center justify-center py-10 px-6">
      {/* Content Section */}
      <header className="text-center mb-12">
        <h1
          className="text-5xl font-bold text-pink-700 mb-4"
          style={{
            fontFamily: "'Great Vibes', cursive",
          }}
        >
          Thank You!!!
        </h1>
        <p
          className="text-lg text-pink-600 mb-6"
          style={{
            fontFamily: "'Merriweather', serif",
            fontSize: "1.2rem",
            fontWeight: "400",
          }}
        >
          We are thrilled to have you celebrate with us on our special day!
          <br />
          See you soon.
        </p>

        {/* Scripture */}
        <div className="text-center mb-8">
          <p className="text-lg italic text-pink-500">
            "Let all that you do be done in love." — 1 Corinthians 16:14
          </p>
        </div>
      </header>
    </div>
  );
}
