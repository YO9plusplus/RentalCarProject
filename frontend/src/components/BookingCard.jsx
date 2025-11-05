import React from 'react';

// We pass 'booking' and 'onDelete' as props
function BookingCard({ booking, onDelete }) {
  // Check if car data is populated.
  const hasCarData = booking.car && typeof booking.car === 'object';

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      <div className="p-6 sm:flex sm:justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">
            {hasCarData ? `${booking.car.brand} ${booking.car.model}` : 'Car Details Missing'}
          </h3>
          <p className="mt-1 text-lg font-semibold text-gray-700">
            Date: {new Date(booking.date).toLocaleDateString()}
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Booking ID: {booking._id}
          </p>
          {hasCarData && (
            <p className="text-sm text-gray-500">
              {booking.car.type} • {booking.car.seats} Seats
            </p>
          )}
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-6 flex-shrink-0 flex items-center">
          <button
            onClick={() => onDelete(booking._id)}
            className="w-full px-4 py-2 bg-red-600 text-white rounded-md font-semibold hover:bg-red-500 transition-colors"
          >
            Cancel Booking
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookingCard;