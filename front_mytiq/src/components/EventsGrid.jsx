import React, { useState, useEffect } from "react";
import { eventAPI } from '../services/api'; // Import du service API CORRIGÉ
import EventCard from "./EventCard";

// Import images
import event1 from "../asset/event1.webp";
import event2 from "../asset/event2.jpg";
import event3 from "../asset/event3.webp";
import event4 from "../asset/event4.webp";
import event5 from "../asset/event5.webp";
import event6 from "../asset/event6.jpg";

// Images par défaut
const defaultImages = [event1, event2, event3, event4, event5, event6];

// Événements par défaut (si API échoue)
const defaultEvents = [
  {
    id: 1,
    title: "React Conference 2025",
    location: "San Francisco, CA",
    date: "2025-03-15",
    time: "09:00 AM",
    price: 299,
    ticketsLeft: 245,
    image: event1
  },
  {
    id: 2,
    title: "Web Development Bootcamp",
    location: "San Francisco, CA",
    date: "2025-03-15",
    time: "09:00 AM",
    price: 479,
    ticketsLeft: 245,
    image: event2
  },
  {
    id: 3,
    title: "JavaScript Workshop",
    location: "San Francisco, CA",
    date: "2025-03-15",
    time: "09:00 AM",
    price: 299,
    ticketsLeft: 245,
    image: event3
  },
  {
    id: 4,
    title: "Cloud Computing Summit",
    location: "Los Angeles, CA",
    date: "2025-04-22",
    time: "11:00 AM",
    price: 399,
    ticketsLeft: 180,
    image: event4
  },
  {
    id: 5,
    title: "AI & ML Expo",
    location: "New York, NY",
    date: "2025-05-03",
    time: "10:00 AM",
    price: 549,
    ticketsLeft: 98,
    image: event5
  },
  {
    id: 6,
    title: "Cybersecurity Summit",
    location: "Seattle, WA",
    date: "2025-02-19",
    time: "08:30 AM",
    price: 199,
    ticketsLeft: 320,
    image: event6
  }
];

const EventsGrid = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        // APPEL API CORRIGÉ :
        const response = await eventAPI.getAll();
        
        // Votre API retourne probablement { success: true, events: [...] }
        let eventsData = [];
        
        if (response.data && response.data.success) {
          // Format: { success: true, events: [...] }
          eventsData = response.data.events || [];
        } else if (Array.isArray(response.data)) {
          // Format: directement [...]
          eventsData = response.data;
        } else {
          // Format inconnu, utilise les données brutes
          eventsData = response.data || [];
        }
        
        // Ajoute les images par défaut si besoin
        const eventsWithImages = eventsData.map((event, index) => ({
          ...event,
          image: event.image || defaultImages[index % defaultImages.length],
          ticketsLeft: event.ticketsLeft || event.capacite || 100,
          time: event.time || "09:00 AM",
          location: event.location || event.localisation || "Location non spécifiée",
          price: event.price || 0
        }));
        
        setEvents(eventsWithImages);
        setError(null);
        
      } catch (err) {
        console.error("Erreur API:", err);
        setError(`Impossible de charger les événements: ${err.message}`);
        // Utilise les événements par défaut en cas d'erreur
        setEvents(defaultEvents);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Affichage pendant le chargement
  if (loading) {
    return (
      <section className="w-full py-10 bg-[#F1F6F9]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Chargement des événements...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Affichage normal
  return (
    <section className="w-full py-10 bg-[#F1F6F9]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Message d'erreur */}
        {error && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">⚠</div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  {error} Affichage des événements {events === defaultEvents ? "de démonstration" : "disponibles"}.
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* Grid d'événements */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
        
        {/* Message si aucun événement */}
        {events.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Aucun événement disponible pour le moment.</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg"
            >
              Actualiser
            </button>
          </div>
        )}
        
        
      </div>
    </section>
  );
};

export default EventsGrid;11