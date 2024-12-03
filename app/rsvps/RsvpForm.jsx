import { supabase } from "@/lib/supabase";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RsvpForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "", isAttending: false });
  const [guestType, setGuestType] = useState(""); // This will hold the type of guest (VIP/Peer)
  const [isExpired, setIsExpired] = useState(false); // State to handle form expiration
  const searchParams = useSearchParams(); // Access the search parameters from the URL
  const router = useRouter(); // Get router instance
  const [imageUrl, setImageUrl] = useState(""); // URL for RSVP image

  // Check query parameter and expiration when the page loads
  useEffect(() => {
    const guest = searchParams.get("guest"); // Get the 'guest' query parameter from the URL
    if (guest === "vip") {
      setGuestType("VIP");
    } else if (guest === "peer") {
      setGuestType("Peer");
    }
    setImageUrl(`${window.location.origin}/images/rsvp.png`);

    // Check if RSVP date is expired
    const today = new Date();
    const rsvpDeadline = new Date("2024-12-15");
    if (today > rsvpDeadline) {
      setIsExpired(true);
    }
  }, [searchParams]);

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
      // Insert data into the Supabase table
      const { data, error } = await supabase
        .from("rsvp")
        .insert([
          {
            name: form.name,
            email: form.email,
            message: form.message,
            isAttending: form.isAttending,
            date: new Date().toISOString(),
          },
        ]);

      if (error) {
        console.error("Error inserting into Supabase:", error);
        return;
      }

      console.log("Supabase Inserted Data:", data);

      if (!form.isAttending) {
        // If user is not attending, redirect to a simple "Thank You" page without details
        if (typeof window !== "undefined") {
          // Ensure the router runs only in the client-side environment
          router.push("/thank-you-not-attending");
        return;
        }
      }

      // Navigate to the Thank You page
      if (typeof window !== "undefined") {
        // Ensure the router runs only in the client-side environment
        router.push("/thank-you");
      }
    } catch (error) {
      console.error("Error submitting RSVP:", error);
    }
  };

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
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "8px",
          }}
        >
          {isExpired ? (
            <div className="text-center py-10">
              <h5 className="text-3xl font-bold text-red-600">
                RSVP Closed
              </h5>
              <p className="mt-4 text-gray-600">
                Unfortunately, the RSVP period has ended. Thank you for your understanding!
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center justify-center space-y-8 w-full max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg"
              style={{
                fontFamily: "'Merriweather', serif",
              }}
            >
              <h5
                className="text-4xl font-bold text-brown-500"
                style={{
                  fontFamily: "'Great Vibes', cursive",
                  color: "brown",
                }}
              >
                We are getting married! - Jmnin
              </h5>
              <p className="text-sm text-gray-500 text-center">
                We&apos;re excited to share this joyous occasion and blessing with you!
                Please let us know if you can attend and leave us a message!
                <hr className="m-2"></hr>
                <strong>Please respond on or before December 15, 2024</strong>
              </p>

              {/* Wedding Details Card */}
              <div className="w-full p-4 bg-pink-100 border border-pink-300 rounded-lg shadow-md text-center">
                <small className="font-bold text-pink-800"> &quot;Let all that you do be done in love.&quot; — 1 Corinthians 16:14</small>
                <p className="mt-2 text-gray-700">
                  <span className="font-semibold">Date & Time:</span> January 4, 2025, 10:00 AM
                </p>
                <p className="mt-1 text-gray-700">
                  <span className="font-semibold">Location:</span>&nbsp;
                  <a
                    href="https://www.google.com/maps?q=Parish+of+The+Holy+Family,+Imus"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Parish of The Holy Family, Imus
                  </a>

                </p>
                <p className="mt-1 text-gray-700">
                  <span className="font-semibold">Reception:</span>&nbsp;
                  <a
                    href="https://www.contis.ph/tools/locations/locations/conti-s-bakeshop-restaurant-with-drive-thru-kawit-cavite"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Conti&apos;s - Kawit, Cavite
                  </a>

                </p>

                <p>


                </p>
                <p className="mt-4 text-gray-700 text-center font-medium">
                  <span className="block text-pink-600">
                  We&apos;d be happy to see you!
                  </span>
                  <span className="block mt-2 text-gray-600 text-sm">
                    <strong>Note:</strong> For everyone&apos;s comfort, we kindly ask that pets stay cozy at home. Please observe proper church etiquette. An official photographer will capture the moments—just bring your smiles!
                  </span>
                </p>
              </div>

              <div className="space-y-6 w-full">
                {/* Name Field */}
                <div className="flex flex-col w-full">
                  <label htmlFor="name" className="text-gray-700 font-medium">
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your name"
                    className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition duration-200"
                  />
                </div>

                {/* Message Field */}
                <div className="flex flex-col w-full">
                  <label htmlFor="message" className="text-gray-700 font-medium">
                    Leave a Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Write your message here"
                    className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition duration-200"
                  ></textarea>
                </div>

                {/* Checkbox Field */}
                <div className="flex flex-col w-full">
                  <label htmlFor="isAttending" className="text-gray-700 font-medium">
                    Will you attend?
                  </label>
                  <label className="flex items-center mt-2 space-x-3">
                    <input
                      id="isAttending"
                      type="checkbox"
                      name="isAttending"
                      checked={form.isAttending}
                      onChange={handleChange}
                      className="h-5 w-5 text-pink-500 border-gray-300 rounded focus:ring-2 focus:ring-pink-400 transition duration-200"
                    />
                    <span className="text-gray-700">Yes, I will attend!</span>
                  </label>
                </div>
              </div>



              {/* Conditional Messages based on Guest Type */}
              <div className="text-center">
                {guestType === "VIP" && (
                  <small className="text-green-600 font-medium">
                    &quot;We&apos;re so excited to celebrate with you, and we&apos;d love for you to bring your plus one to join in the fun! We can&apos;t wait to share this special day with you!&quot; <br /> JmNin
                  </small>
                )}

                {guestType === "Peer" && (
                  <small className="text-red-600 font-medium">
                    &quot;We wish we could invite everyone, but due to space, our guest list is small.<br /> We&apos;re truly honored to have you join us on our special day&quot; <br />JmNin
                  </small>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 text-white font-medium py-3 px-6 rounded-md shadow-lg hover:shadow-pink-400 focus:ring-4 focus:outline-none focus:ring-pink-400"
              >
                Submit RSVP
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
