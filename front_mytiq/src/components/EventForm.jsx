import React, { useState } from 'react';
import { eventAPI } from '../api';
import { useNavigate } from 'react-router-dom';

const AddEventForm = () => {

  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    localisation: '',
    date: '',
    capacite: '',
    prix: '',
    status: 'pending',
    image: null
  });


  const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
  const [error, setError] = useState('');


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        image: e.target.files[0]
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setMessage('');
    setLoading(true);

    try {

      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('localisation', formData.localisation);
      data.append('date', formData.date);
      data.append('capacite', formData.capacite);
      data.append('prix', formData.prix);
      data.append('status', formData.status);
      if (formData.image) {
        data.append('image', formData.image);
      }

  
      const response = await eventAPI.create(data);
      
  
      setMessage('Event created successfully! Redirecting...');
      
    
      setFormData({
        title: '',
        description: '',
        localisation: '',
        date: '',
        capacite: '',
        prix: '',
        status: 'pending',
        image: null
      });


      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);

    } catch (err) {
      
      console.error('Error creating event:', err);
      setError(err.response?.data?.message || 'Failed to create event. Please check all fields.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-4">

      <div className="w-full max-w-md bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 p-8">
        
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Add Event</h2>

        {/* Success message - shows when event is created */}
        {message && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm">
            ✓ {message}
          </div>
        )}

        {/* Error message - shows if something went wrong */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
            ✗ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Event Title */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-600">Event Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="e.g., React Conference 2025"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-600">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Describe your event..."
              rows="3"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
            ></textarea>
          </div>

          {/* Location and Date */}
          <div className="flex gap-4">
            <div className="w-1/2 space-y-1">
              <label className="text-sm font-semibold text-gray-600">Location</label>
              <input
                type="text"
                name="localisation"
                value={formData.localisation}
                onChange={handleChange}
                required
                placeholder="City, Country"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>
            <div className="w-1/2 space-y-1">
              <label className="text-sm font-semibold text-gray-600">Date & Time</label>
              <input
                type="datetime-local"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Capacity and Price */}
          <div className="flex gap-4">
            <div className="w-1/2 space-y-1">
              <label className="text-sm font-semibold text-gray-600">Capacity</label>
              <input
                type="number"
                name="capacite"
                value={formData.capacite}
                onChange={handleChange}
                required
                min="1"
                placeholder="100"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>
            <div className="w-1/2 space-y-1">
              <label className="text-sm font-semibold text-gray-600">Price ($)</label>
              <input
                type="number"
                name="prix"
                value={formData.prix}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                placeholder="50.00"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Status */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-600">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Event Image */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-600">Event Image</label>
            <div className="relative">
              <input
                type="file"
                id="file-upload"
                className="hidden"
                onChange={handleImageChange}
                accept="image/*"
                required
              />
              <label
                htmlFor="file-upload"
                className="flex items-center justify-center w-full px-4 py-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-2 text-gray-400">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="fill-current text-gray-400"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                  <span className="text-sm">
                    {formData.image ? formData.image.name : "Click to upload image"}
                  </span>
                </div>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#351a96] hover:bg-[#2b147d] text-white font-medium py-3 rounded-xl transition-colors shadow-lg shadow-indigo-200 mt-4 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Event...' : 'Create Event'}
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddEventForm;