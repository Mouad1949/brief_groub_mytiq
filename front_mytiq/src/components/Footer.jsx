import React, { useState } from "react";
import { newsletterAPI } from '../services/api'; // Import de l'API

const Footer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' }); // 'success' ou 'error'

  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    // Validation simple
    if (!email || !email.includes('@')) {
      setMessage({ text: 'Veuillez entrer une adresse email valide', type: 'error' });
      return;
    }

    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      // Appel à l'API Laravel
      const response = await newsletterAPI.subscribe(email);
      
      // Succès
      setMessage({ 
        text: response.data?.message || 'Abonnement réussi !', 
        type: 'success' 
      });
      setEmail(""); // Reset le champ
      
      // Cache le message après 5 secondes
      setTimeout(() => {
        setMessage({ text: '', type: '' });
      }, 5000);
      
    } catch (error) {
      console.error('Erreur newsletter:', error);
      
      // Message d'erreur personnalisé
      let errorMessage = 'Erreur lors de l\'abonnement';
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.status === 422) {
        errorMessage = 'Email déjà inscrit à la newsletter';
      }
      
      setMessage({ text: errorMessage, type: 'error' });
    } finally {
      setLoading(false);
    }
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
              <li><a href="/events" className="hover:text-blue-600">Events</a></li>
              <li><a href="/admin" className="hover:text-blue-600">Admin</a></li>
              <li><a href="/my-tickets" className="hover:text-blue-600">My Tickets</a></li>
            </ul>
          </div>

          {/* Column 2: Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <p className="text-sm mb-2">+212 661616210</p>
            <p className="text-sm mb-4">mytiq@gmail.com</p>
            <p className="text-sm leading-6 max-w-xs">
              mytiq is a modern event ticketing platform that lets users easily buy and manage their tickets
            </p>
          </div>

          {/* Column 3: Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Subscribe To Newsletter</h3>
            
            {/* Message d'état */}
            {message.text && (
              <div className={`mb-3 p-2 rounded text-sm ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="flex items-center gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border border-gray-300 rounded-md px-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your email address"
                  required
                  disabled={loading}
                />

                <button
                  type="submit"
                  disabled={loading}
                  className={`bg-blue-600 text-white px-5 py-2 rounded-md text-sm font-medium whitespace-nowrap ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                >
                  {loading ? 'Processing...' : 'Subscribe'}
                </button>
              </div>
              
              <p className="text-xs text-gray-500">
                By subscribing, you agree to receive updates about our events.
              </p>
            </form>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 mt-10 pt-6"></div>

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
          <span className="text-lg font-bold mb-2 md:mb-0">
            <span className="text-blue-600">My</span>
            <span className="text-cyan-600">Tiq</span>
          </span>
          <div className="flex items-center space-x-4">
            <span>© {new Date().getFullYear()} MyTiq. All rights reserved.</span>
            <a href="/privacy" className="hover:text-blue-600">Privacy Policy</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;