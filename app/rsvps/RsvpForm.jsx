import { supabase } from "@/lib/supabase";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function RsvpForm() {
  const [form, setForm] = useState({ name: "", message: "", isAttending: false });
  const [guestType, setGuestType] = useState(""); // This will hold the type of guest (VIP/Peer)
  const searchParams = useSearchParams(); // Access the search parameters from the URL
  const [imageUrl, setImageUrl] = useState(""); // URL for RSVP image

  // Check query parameter when the page loads
  useEffect(() => {
    const guest = searchParams.get("guest"); // Get the 'guest' query parameter from the URL
    if (guest === "vip") {
      setGuestType("VIP");
    } else if (guest === "peer") {
      setGuestType("Peer");
    }
    setImageUrl(`${window.location.origin}/images/rsvp.png`);
  }, [searchParams]); // Re-run when searchParams changes

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

      // Navigate to the Thank You page
      router.push("/thank-you");
    } catch (error) {
      console.error("Error submitting RSVP:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-pink-100">
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
          <div className="text-center">
            <h5
              className="text-4xl font-bold text-brown-500"
              style={{
                fontFamily: "'Great Vibes', cursive",
                color: 'brown'
              }}
            >
              We are getting married! - Jmnin
            </h5>
             {/* Scripture */}

            <p className="mt-4 text-sm text-gray-700">
              <span className="font-semibold">We&apos;re excited to share this joyous occasion and blessing with you!</span>
              <br />

              <span className="font-semibold">Location:</span>&nbsp;
              <a
                href="https://www.google.com/maps?q=Parish+of+The+Holy+Family,+Imus"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Parish of The Holy Family, Imus
              </a>
              <br />
              <span className="font-semibold">Date & Time:</span> January 4, 2025, 10:00 AM
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Dine with us at:</span>&nbsp;
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


          {/* RSVP Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
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
                      placeholder="John Doe; Jane Doe"
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

            <div className="text-center">
              {/* Conditional Messages based on Guest Type */}
              {guestType === "VIP" && (
                <small className="text-green-600 font-medium">
                  &quot;We&apos;re so excited to celebrate with you, and we&apos;d love for you to bring your plus
                  one to join in the fun! <br /> We can&apos;t wait to share this special day with you!&quot; <br /> JmNin
                </small>
              )}

              {guestType === "Peer" && (
                <small className="text-red-600 font-medium">
                  &quot;We wish we could invite everyone, but due to space, our guest list is small.<br /> We&apos;re truly honored to have you join us on our special day&quot; <br />JmNin
                </small>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-pink-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-pink-700 transition duration-200"
            >
              Submit RSVP
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}