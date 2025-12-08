import React, { useState, useEffect } from 'react';
import { eventAPI, ticketAPI } from '../api';
import { useNavigate } from 'react-router-dom';

export default function DashboardContent() {
  
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [tickets, setTickets] = useState([]);
  
  const [loading, setLoading] = useState(true);
  
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      const eventsResponse = await eventAPI.getAll();
      const eventsData = eventsResponse.data.events || eventsResponse.data || [];
      setEvents(eventsData.slice(0, 5)); 
      try {
        const ticketsResponse = await ticketAPI.getAll();
        const ticketsData = ticketsResponse.data.data || ticketsResponse.data || [];
        setTickets(ticketsData.slice(0, 5));
      } catch (ticketErr) {
        console.log('Could not fetch tickets');
      }

      setLoading(false);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Could not load data');
      setLoading(false);
    }
  };

  const handleAddEvent = () => {
    navigate('/add-event');
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mx-4 md:mx-6 lg:mx-8 mb-6 md:mb-8 lg:mb-10">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 text-center">
          <p className="text-gray-500">Loading events...</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 text-center">
          <p className="text-gray-500">Loading tickets...</p>
        </div>
      </div>
    );
  }

  return (
   
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mx-4 md:mx-6 lg:mx-8 mb-6 md:mb-8 lg:mb-10">

      {/* EVENTS CARD */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Events</h2>
          <button 
            onClick={handleAddEvent}
            className="bg-[#311b92] text-white text-sm px-4 py-2 rounded-lg hover:bg-indigo-900 transition-colors"
          >
            Add Event
          </button>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="text-gray-500 font-medium py-2 w-2/3">Title</th>
              <th className="text-gray-500 font-medium py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {events.length > 0 ? (
              events.map((event) => (
                <tr key={event.id} className="border-b border-gray-100 last:border-none">
                  <td className="py-4 font-medium text-gray-700">{event.title}</td>
                  <td className="py-4 text-gray-500">
                    {new Date(event.date).toLocaleDateString('en-US')}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="py-4 text-center text-gray-500">
                  No events yet. Click "Add Event" to create one!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* TICKETS CARD */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Tickets</h2>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="text-gray-500 font-medium py-2 w-1/3">Event</th>
              <th className="text-gray-500 font-medium py-2 w-1/3">User</th>
              <th className="text-gray-500 font-medium py-2 w-1/3">Date</th>
            </tr>
          </thead>
          <tbody>
            {tickets.length > 0 ? (
              tickets.map((ticket) => (
                <tr key={ticket.id} className="border-b border-gray-100 last:border-none">
                  <td className="py-4 font-medium text-gray-700">
                    {ticket.event?.title || 'Event'}
                  </td>
                  <td className="py-4 text-gray-600">
                    {ticket.user?.nom || ticket.user?.name || 'User'}
                  </td>
                  <td className="py-4 text-gray-500">
                    {new Date(ticket.purchase_date || ticket.created_at).toLocaleDateString('en-US')}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="py-4 text-center text-gray-500">
                  No tickets sold yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}