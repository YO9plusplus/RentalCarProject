import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import CarCard from '../components/CarCard';
import BookingModal from '../components/BookingModal';
import {fetchAllCars} from '../hooks/carAPI'
export default function CarListPage() {

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [rememberedDate, setRememberedDate] = useState('')

  useEffect(()=>{
    const getCars = async()=>{
      try {
        setLoading(true);
        const response = await fetchAllCars();

        setCars(response.data)
        setError(null)
      }
      catch(err){
        setError(err);
      }
      finally{
        setLoading(false)
      }
    }
    getCars();

  },[]);
  const handleOnClick = (carId) => {
    // Find the car from either the main list or suggestions
    const carToBook = cars.find((car) => car.id == carId) || 
                      suggestions.find((car) => car.id == carId);

    if (carToBook) {
      setSelectedCar(carToBook);
      setIsModalOpen(true);
    } else {
      console.error("Could not find car with ID:", carId)
    }
  };

  const handleSuggestions = (newSuggestions, failedDate) => {
    setSuggestions(newSuggestions);
    setRememberedDate(failedDate); // <-- This is the key
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCar(null);
    setSuggestions([]);
    setRememberedDate(''); 
  };
  
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
        {suggestions.length > 0 && (
          <div className="mb-12 p-6 bg-blue-50 border-2 border-blue-200 rounded-lg">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              That car is unavailable. How about one of these?
            </h2>
            <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3">
              {suggestions.map((car) => (
                <CarCard 
                  key={car.id} 
                  car={car}>
                  <button
                    onClick={() => handleOnClick(car.id)} // Calls handleOnClick with _id
                    className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-500 transition-colors duration-300"
                  >
                    Book This One
                  </button>
                </CarCard>
              ))}
            </div>
          </div>
        )}
        {/* Page Title */}
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-12">
          Find Your Ride
        </h1>

        {/* Car Grid */}
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:gap-x-8">
          {cars && cars.map((car) => (
            <CarCard
              key={car.id} 
              car={car}>
              <button
                onClick={() => handleOnClick(car.id)} // Calls handleOnClick with _id
                className="w-full bg-gray-900 text-white py-3 rounded-md font-semibold hover:bg-gray-700 transition-colors duration-300"
              >
                Book Now
              </button>
            </CarCard>
          ))}
        </div>
      </main>
      <BookingModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        car={selectedCar} 
        // 5. Pass the new handler and the remembered date
        onSuggestions={handleSuggestions}
        initialDate={rememberedDate}
      />
    </div>
  );
}