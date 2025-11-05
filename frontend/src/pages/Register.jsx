import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../hooks/authAPI'; // 1. Import register function

export default function RegisterPage() {
  // 2. Add state for new fields
  const [name, setName] = useState('');
  const [telephone, setTelephone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  // 3. Handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // 4. Call the register API
      const data = await register({ name, telephone, email, password });

      if (data.success) {
        // 5. Go to /carlist on successful registration
        navigate('/carlist');
      }
    } catch (err) {
      setError(err.response?.data?.msg || 'An unknown error occurred.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-10 border border-gray-200 rounded-lg shadow-sm">
        
        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 mb-8">
          Create Account
        </h2>
        
        {error && (
          <div className="my-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          
          {/* 6. ADD NEW FIELDS */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <div className="mt-1">
              <input
                id="name"
                type="text"
                required
                className="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="telephone" className="block text-sm font-medium text-gray-700">
              Telephone
            </label>
            <div className="mt-1">
              <input
                id="telephone"
                type="tel"
                required
                className="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
              />
            </div>
          </div>
          {/* END OF NEW FIELDS */}

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div className="mt-1">
              <input
                id="email"
                type="email"
                required
                className="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                type="password"
                required
                className="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-gray-900 text-white font-semibold rounded-md hover:bg-gray-700 transition-colors duration-300 focus:outline-none"
            >
              Sign Up
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link 
            to="/login" 
            className="font-medium text-gray-900 hover:text-gray-700 underline"
          >
            Sign In
          </Link>
        </div>

      </div>
    </div>
  );
}