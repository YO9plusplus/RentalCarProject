import React from 'react';

export default function CarCard({ car }) {
  const { brand, model, daily_rate, type, seats, imageUrl } = car;

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 bg-white">
      
      {/* 1. Image (This is the only line that changes) */}
      <div className="aspect-[16/9]">
        <img
          className="object-cover w-full h-full"
          src={imageUrl || 'https://placehold.co/600x400/000000/FFFFFF?text=Car'}
          alt={`${brand} ${model}`}
        />
      </div>

      {/* 2. Content (Stays the same) */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900">
          {brand} {model}
        </h3>
        <p className="mt-2 text-2xl font-semibold text-gray-900">
          ${daily_rate}
          <span className="text-sm font-normal text-gray-500">/day</span>
        </p>
        <hr className="my-4 border-gray-200" />
        <div className="flex justify-between text-sm text-gray-500">
          <span className="font-medium">{type}</span>
          <span className="font-medium">{seats} Seats</span>
        </div>
        <button className="mt-6 w-full bg-gray-900 text-white py-3 rounded-md font-semibold hover:bg-gray-700 transition-colors duration-300">
          Book Now
        </button>
      </div>
    </div>
  );
}