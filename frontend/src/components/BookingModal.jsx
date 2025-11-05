import React, { useState, useEffect } from 'react';
import { createBooking } from '../hooks/bookingAPI';


export default function BookingModal({ isOpen, onClose, car, onSuggestions,initialDate }) {
  const [date, setDate] = useState(initialDate || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  console.log(car);
  // Reset state when the modal is opened or the car changes
  useEffect(() => {
    if (isOpen) {
      setDate(initialDate || ''); // Pre-fill the date
      setError(null);
      setLoading(false);
    }
  }, [isOpen, initialDate]);

  if (!isOpen || !car) {
    return null;
  }

  const handleConfirm = async () => {
    if (!date) {
      setError('Please select a booking date.');
      return;
    }
    setLoading(true);
    setError(null);

    const bookingData = {
      car: car._id, // Matches req.body.car
      date: date,  // Matches req.body.date
    };

    try {
      const response = await createBooking(bookingData);
      console.log('Booking successful:', response.data);
      alert('Booking successful!');
      onClose();
      
    } catch (err) {
      console.error('Booking failed:', err);
      if (err.response && err.response.status === 409) {
        const message = err.response.data.message;
        const suggestions = err.response.data.suggestions;
        if (onSuggestions) {
          onSuggestions(suggestions,date);
        }
        onClose();      
      } else {
        setError(err.response?.data?.message || 'Booking failed. Please try again.');
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/30 z-50 flex justify-center items-center"
      onClick={onClose} // Use onClose, not handleClose, to avoid resets
    >
      <div 
        className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Confirm Your Booking</h2>
          <button onClick={onClose} className="text-gray-500 text-3xl hover:text-gray-900">
            &times;
          </button>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold">{car.brand} {car.model}</h3>
          <p className="text-lg text-gray-700">{car.type} • {car.seats} Seats</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">${car.daily_rate}/day</p>
        </div>

        <hr className="my-6" />
        <div className="space-y-4">
          <div>
            <label htmlFor="bookingDate" className="block text-sm font-medium text-gray-700">Booking Date</label>
            <input
              type="date"
              id="bookingDate"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
        </div>
        
        {error && (
          <p className="text-red-600 text-sm mt-4">{error}</p>
        )}

        <div className="mt-8 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="py-2 px-6 rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading}
            className="py-2 px-6 rounded-md text-white bg-gray-900 hover:bg-gray-700 font-semibold disabled:bg-gray-400"
          >
            {loading ? 'Booking...' : 'Confirm Booking'}
          </button>
        </div>
      </div>
    </div>
  );
}