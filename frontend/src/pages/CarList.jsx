import React from 'react';
import Navbar from '../components/Navbar';
import CarCard from '../components/CarCard';

export default function CarListPage() {
  const { data: cars, loading, error } = useAxios('/cars');

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-12">
            Finding Your Ride...
          </h1>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold tracking-tight text-red-600 mb-12">
            Error: Could not load cars.
          </h1>
          <p>{error.message}</p>
        </main>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Title */}
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-12">
          Find Your Ride
        </h1>

        {/* Car Grid */}
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:gap-x-8">
          {cars && cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </main>
    </div>
  );
}