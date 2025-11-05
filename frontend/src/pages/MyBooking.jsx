import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { fetchMyBookings, deleteBooking } from '../hooks/bookingAPI'; 
import BookingCard from "../components/BookingCard";

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to load the bookings
  const loadBookings = async () => {
    try {
      setLoading(true);
      const response = await fetchMyBookings();
      if (response.success) {
        setBookings(response.data);
      }
      console.log(response.data);
    } catch (err) {
      setError(err.response?.data?.msg || 'Could not fetch bookings.');
    } finally {
      setLoading(false);
    }
  };

  // Load bookings when the page first mounts
  useEffect(() => {
    loadBookings();
  }, []);

  // Function to handle deleting a booking
  const handleDelete = async (id) => {
    // Ask for confirmation
    if (!window.confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    try {
      const response = await deleteBooking(id);
      if (response.success) {
        // Reload the bookings list from the server
        loadBookings();
      }
    } catch (err) {
      setError(err.response?.data?.msg || 'Could not delete booking.');
    }
  };

  // Helper component for rendering loading/error states
  const renderContent = () => {
    if (loading) {
      return <p className="text-gray-500">Loading your bookings...</p>;
    }

    if (error) {
      return <p className="text-red-600">{error}</p>;
    }

    if (bookings.length === 0) {
      return (
        <div className="text-center">
          <p className="text-gray-500">You have no bookings.</p>
          <Link
            to="/carlist"
            className="mt-4 inline-block bg-gray-900 text-white py-2 px-4 rounded-md font-semibold hover:bg-gray-700"
          >
            Find a Car to Book
          </Link>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {bookings.map((booking) => (
          <BookingCard 
            key={booking._id} 
            booking={booking} 
            onDelete={handleDelete} 
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-12">
          My Bookings
        </h1>
        {renderContent()}
      </main>
    </div>
  );
}