import React, { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log("subscribing: ", email);
    setEmail("");
  };

  return (
    <footer className="w-full bg-gradient-to-r from-[#E7E6F4] via-[#E2F3F6] to-[#F9EFE7] py-14 text-black">
      <div className="max-w-6xl mx-auto px-6">

        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">

          {/* Column 1: Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Link</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="/events">Events</a></li>
              <li><a href="/admin">Admin</a></li>
              <li><a href="/MyTickets">Events</a></li>
            </ul>
          </div>

          {/* Column 2: Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>

            <p className="text-sm mb-2">+212 661616210</p>
            <p className="text-sm mb-4">mytiq@gmail.com</p>

            <p className="text-sm leading-6 w-64">
              mytiq is a modern event ticketing platform that lets users easly buy
              and and manage their ticket
            </p>
          </div>

          {/* Column 3: Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Subscribe To Newsletter</h3>

            <form onSubmit={handleSubscribe} className="flex items-center gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border rounded-md px-4 py-2 text-sm w-full"
                placeholder="your email adress"
                required
              />

              <button
                type="submit"
                className="bg-blue-600 text-white px-5 py-2 rounded-md text-sm font-medium"
              >
                subscribe
              </button>
            </form>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 mt-10 pt-6"></div>

        {/* Bottom Row */}
        <div className="flex justify-between text-sm text-gray-600">
          <span>MyTiq</span>
          <a href="/privacy">PrivacyPolicy</a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
