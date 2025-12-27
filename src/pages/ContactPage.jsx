import React,{ memo, useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";

function ContactPage() {
    useEffect(() => {
        AOS.init({
          duration: 800,
          once: true,
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, []);

  return (
       <section className="w-full min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Contact Us
          </h1>
          <p className="text-gray-600 mt-3">
            We'd love to hear from you. Please fill out the form below.
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">

            {/* LEFT - CONTACT INFO */}
            <div className="bg-rose-500 text-white p-8">
              <h2 className="text-2xl font-semibold mb-6">
                Get in Touch
              </h2>

              <p className="text-blue-100 mb-8">
                Reach out to us for any queries, support, or feedback.
              </p>

              <ul className="space-y-6 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-lg">📍</span>
                  <span>New Delhi, India</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lg">📞</span>
                  <span>+91 98765 43210</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lg">✉️</span>
                  <span>support@example.com</span>
                </li>
              </ul>
            </div>

            {/* RIGHT - CONTACT FORM */}
            <div className="p-8">
              <form className="space-y-5">

                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Message
                  </label>
                  <textarea
                    rows="4"
                    placeholder="Write your message..."
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full text-white py-3 rounded-lg bg-rose-400 hover:bg-rose-500 transition"
                >
                  Send Message
                </button>

              </form>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}

export default memo(ContactPage)