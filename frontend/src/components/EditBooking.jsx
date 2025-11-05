import React, { useState, useEffect } from 'react';
import { updateBooking } from '../hooks/bookingAPI';

const EditBooking = ({ isOpen, onClose, booking, onSuccess }) => {
    const [date, setDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (booking) {
            const formattedDate = new Date(booking.date).toISOString().split('T')[0];
            setDate(formattedDate);
        }
    }, [booking]);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await updateBooking(booking._id, { date: date });
            onSuccess();
        } catch(err) {
            setError(err.response?.data?.msg || 'Failed to update booking.');
        } finally {
            setLoading(false);
        }
    };

    return (
    <>
      {/* 1. The background overlay */}
      <div 
        className="fixed inset-0 bg-black/30 z-40"
        onClick={onClose}
      ></div>

      {/* 2. The modal content window */}
      <div 
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                   bg-white p-8 rounded-lg shadow-xl z-50 w-full max-w-md"
      >
        {/* 3. The 'X' close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-900"
        >
          <i class="bi bi-x-lg"></i>
        </button>

        {/* 4. The Form Content */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Edit Booking (BOK-{booking.bookingNumber})
          </h2>

          {/* Car details (disabled) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Car</label>
            <input
              type="text"
              disabled
              value={booking.car ? `${booking.car.brand} ${booking.car.model}` : 'Loading...'}
              className="mt-1 block w-full rounded-md bg-gray-100 border-gray-300 shadow-sm"
            />
          </div>

          {/* Edit the date */}
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Booking Date
            </label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900"
            />
          </div>

          {/* Error message */}
          {error && (
            <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}

          {/* Form Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose} // Use the onClose prop
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md font-semibold hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-gray-900 text-white rounded-md font-semibold hover:bg-gray-700 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditBooking;