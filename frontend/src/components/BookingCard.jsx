import React from 'react';

// We pass 'booking' and 'onDelete' as props
function BookingCard({ booking, onDelete, onEdit }) {
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
            Booking ID: {booking.bookingNumber}
          </p>
          {hasCarData && (
            <p className="text-sm text-gray-500">
              {booking.car.type} • {booking.car.seats} Seats
            </p>
          )}
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-6 flex-shrink-0 flex items-center space-x-4">
          {/* Edit Button */}
          <button
            onClick={() => onEdit(booking)} // Passes the whole booking object
            className="w-full cursor-pointer px-4 py-2 bg-gray-600 text-white rounded-md font-semibold hover:bg-gray-500 transition-colors"
          >
            Edit
          </button>
          {/* Delete Button */}
          <button
            onClick={() => onDelete(booking._id)}
            className="w-full cursor-pointer px-4 py-2 bg-black text-white rounded-md font-semibold hover:bg-gray-200 hover:text-black transition-colors"
          >
            Cancel Booking
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookingCard;