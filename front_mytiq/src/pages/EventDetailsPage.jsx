import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { eventAPI } from '../services/api';
import { ArrowLeft, MapPin, Calendar, Clock, Users } from 'lucide-react';
import Footer from '../components/Footer';

const EventDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ticketCount, setTicketCount] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEventDetails();
  }, [id]);

  const fetchEventDetails = async () => {
    try {
      setLoading(true);
      const response = await eventAPI.getById(id);
      setEvent(response.data.event || response.data);
    } catch (err) {
      setError('Erreur lors du chargement de l\'événement');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const calculateSubtotal = () => {
    return (event?.prix || 0) * ticketCount;
  };

  const calculateTotal = () => {
    return calculateSubtotal();
  };

  const handleBuyTickets = async () => {
    try {
      console.log('Achat de', ticketCount, 'tickets pour événement', id);
      alert(`Achat réussi ! ${ticketCount} ticket(s) acheté(s).`);
    } catch (err) {
      console.error('Erreur achat:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-500 mb-4">{error || 'Événement non trouvé'}</p>
            <button
              onClick={() => navigate('/')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg"
            >
              Retour aux événements
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar existe déjà */}

      {/* Bouton Retour */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <Link
          to="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft size={20} className="mr-2" />
          Retour aux événements
        </Link>
      </div>

      {/* Contenu Principal */}
      <div className="max-w-7xl mx-auto px-6 pb-8 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* COLONNE GAUCHE : Image + Description */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Image (plus petite, à gauche) */}
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <div className="h-64">
                {event.image ? (
                  <img
                    src={event.image.startsWith('http') ? event.image : `http://localhost:8000${event.image}`}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center">
                    <span className="text-xl font-bold text-gray-400">{event.title}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Titre et Description */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{event.title}</h1>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {event.description}
              </p>
            </div>

            {/* Carte Détails */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6 text-gray-800">Détails de l'événement</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <MapPin className="text-gray-500 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Lieu</p>
                    <p className="font-medium">{event.localisation}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Calendar className="text-gray-500 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium">
                      {new Date(event.date).toLocaleDateString('fr-FR', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="text-gray-500 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Heure</p>
                    <p className="font-medium">
                      {new Date(event.date).toLocaleTimeString('fr-FR', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Users className="text-gray-500 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Capacité</p>
                    <p className="font-medium">{event.capacite} places</p>
                  </div>
                </div>
              </div>

              {/* Statut */}
              <div className="mt-6 pt-6 border-t">
                <p className="text-sm text-gray-500 mb-2">Statut</p>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  event.status === 'confirmed' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {event.status === 'confirmed' ? '✅ Confirmé' : '⏳ En attente'}
                </span>
              </div>
            </div>
          </div>

          {/* COLONNE DROITE : Carte Achat */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
              <h2 className="text-xl font-semibold mb-6 text-gray-800">Acheter des tickets</h2>
              
              {/* Prix */}
              <div className="mb-6">
                <p className="text-sm text-gray-500">Prix par ticket</p>
                <p className="text-3xl font-bold text-blue-600">${event.prix}</p>
              </div>

              {/* Sélecteur quantité */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre de tickets
                </label>
                <div className="flex items-center">
                  <button
                    onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                    className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-l-lg bg-gray-50 hover:bg-gray-100"
                  >
                    <span className="text-lg">-</span>
                  </button>
                  <input
                    type="number"
                    min="1"
                    max={event.capacite}
                    value={ticketCount}
                    onChange={(e) => setTicketCount(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-20 h-10 text-center border-t border-b border-gray-300"
                  />
                  <button
                    onClick={() => setTicketCount(Math.min(event.capacite, ticketCount + 1))}
                    className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-r-lg bg-gray-50 hover:bg-gray-100"
                  >
                    <span className="text-lg">+</span>
                  </button>
                  <span className="ml-4 text-sm text-gray-500">
                    Max: {event.capacite}
                  </span>
                </div>
              </div>

              {/* Calcul prix */}
              <div className="space-y-3 border-t border-gray-200 pt-6 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Sous-total</span>
                  <span className="font-medium">${calculateSubtotal()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Frais de service</span>
                  <span className="font-medium">$0.00</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-3">
                  <span>Total</span>
                  <span className="text-blue-600">${calculateTotal()}</span>
                </div>
              </div>

              {/* Bouton Achat */}
              <button
                onClick={handleBuyTickets}
                disabled={ticketCount > event.capacite}
                className={`w-full py-3 rounded-lg font-semibold text-white ${
                  ticketCount > event.capacite
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:opacity-90'
                }`}
              >
                {ticketCount > event.capacite
                  ? 'Capacité dépassée'
                  : 'Acheter maintenant'}
              </button>

              {ticketCount > event.capacite && (
                <p className="mt-3 text-sm text-red-600 text-center">
                  Plus de places disponibles
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default EventDetailsPage;