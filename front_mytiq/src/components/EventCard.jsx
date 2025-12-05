import React from "react";
import { MapPin, Calendar, Clock } from "lucide-react";
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  // URL de l'image
  const imageUrl = event.image?.startsWith('http') 
    ? event.image 
    : `http://localhost:8000${event.image || ''}`;

  // Formater la date
  const formattedDate = event.date 
    ? new Date(event.date).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    : "Date non spécifiée";

  // Extraire l'heure de la date
  const getTime = () => {
    if (event.time) return event.time;
    try {
      return new Date(event.date).toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return "09:00";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all border border-gray-200 overflow-hidden">

      {/* Event Image */}
      <div className="w-full h-48 overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={event.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '';
              e.target.parentElement.innerHTML = `
                <div class="w-full h-full bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center">
                  <span class="text-gray-400 text-sm p-2 text-center">${event.title}</span>
                </div>
              `;
            }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center">
            <span className="text-gray-400 text-sm p-2 text-center">{event.title}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        <h3 className="text-lg font-semibold leading-tight">{event.title}</h3>

        <div className="flex items-center text-gray-600 text-sm">
          <MapPin size={16} className="mr-1" />
          {event.localisation || event.location || "Lieu non spécifié"}
        </div>

        <p className="text-gray-600 text-sm line-clamp-2">
          {event.description || "Rejoignez cet événement exceptionnel..."}
        </p>

        <div className="flex items-center text-gray-700 text-sm">
          <Calendar size={16} className="mr-2 text-red-400" />
          {formattedDate}
        </div>

        <div className="flex items-center text-gray-700 text-sm">
          <Clock size={16} className="mr-2 text-red-400" />
          {getTime()}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xl font-bold text-blue-600">
              ${event.prix || event.price || 0}
            </p>
            <p className="text-gray-500 text-xs">
              {event.capacite || 100} tickets left
            </p>
          </div>

          <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-semibold">
            50%
          </div>
        </div>

        <Link 
          to={`/event/${event.id}`}
          className="block w-full mt-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-2.5 rounded-xl font-semibold text-center hover:opacity-90 transition-opacity"
        >
          Get Tickets
        </Link>
      </div>
    </div>
  );
};

export default EventCard;