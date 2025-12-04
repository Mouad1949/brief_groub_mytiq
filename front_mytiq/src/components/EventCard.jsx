import React from "react";
import { MapPin, Calendar, Clock } from "lucide-react";

const EventCard = ({ event }) => {
  // Construire l'URL complète de l'image
  const getImageUrl = () => {
    if (!event.image) {
      // Si pas d'image dans la DB, utilisez une couleur de fond
      return "";
    }
    if (event.image.startsWith('http')) {
      return event.image; // Déjà une URL complète
    }
    return `http://localhost:8000${event.image}`; // Chemin local Laravel
  };

  // Formater la date
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch {
      return dateString || "Date non spécifiée";
    }
  };

  // Obtenir le prix
  const getPrice = () => {
    return event.price || event.prix || 0;
  };

  // Obtenir la location
  const getLocation = () => {
    return event.location || event.localisation || "Lieu non spécifié";
  };

  // Obtenir le nombre de tickets restants
  const getTicketsLeft = () => {
    return event.ticketsLeft || event.capacite || 100;
  };

  // Obtenir la description
  const getDescription = () => {
    return event.description || "Rejoignez cet événement exceptionnel...";
  };

  // Obtenir l'heure
  const getTime = () => {
    if (event.time) return event.time;
    
    // Essayer d'extraire l'heure de la date
    try {
      const date = new Date(event.date);
      return date.toLocaleTimeString('fr-FR', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      });
    } catch {
      return "09:00";
    }
  };

  const imageUrl = getImageUrl();

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
              // Si l'image ne charge pas, afficher un placeholder
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML = `
                <div class="w-full h-full bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center">
                  <span class="text-gray-400">${event.title}</span>
                </div>
              `;
            }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center">
            <span className="text-gray-400">{event.title}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        <h3 className="text-lg font-semibold leading-tight">{event.title}</h3>

        <div className="flex items-center text-gray-600 text-sm">
          <MapPin size={16} className="mr-1" />
          {getLocation()}
        </div>

        <p className="text-gray-600 text-sm line-clamp-2">
          {getDescription()}
        </p>

        <div className="flex items-center text-gray-700 text-sm">
          <Calendar size={16} className="mr-2 text-red-400" />
          {formatDate(event.date)}
        </div>

        <div className="flex items-center text-gray-700 text-sm">
          <Clock size={16} className="mr-2 text-red-400" />
          {getTime()}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xl font-bold text-blue-600">${getPrice()}</p>
            <p className="text-gray-500 text-xs">{getTicketsLeft()} tickets left</p>
          </div>

          <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-semibold">
            50%
          </div>
        </div>

        <button className="w-full mt-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-2.5 rounded-xl font-semibold hover:opacity-90 transition-opacity">
          Get Tickets
        </button>
      </div>
    </div>
  );
};

export default EventCard;