import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../hooks/authAPI';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Stop the page from reloading
    setError(null);     // Clear old errors

    try {
      // 5. Call your API
      const data = await login({ email, password });

      if (data.success) {
        // 6. On success, go to the /carlist page
        navigate('/carlist');
      }
    } catch (err) {
      // 7. If login fails, show the error message from the backend
      setError(err.response?.data?.msg || 'An unknown error occurred.');
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-10 border border-gray-200 rounded-lg shadow-sm">
        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 mb-8">
          Sign In
        </h2>
        
        {/* 8. Show an error message if one exists */}
        {error && (
          <div className="my-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}
        
        {/* 9. Attach the handleSubmit function to the form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                required
                className="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900"
                placeholder="you@example.com"
                // 10. Link input to state
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
                name="password"
                type="password"
                required
                className="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900"
                // 10. Link input to state
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          
          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-gray-900 text-white font-semibold rounded-md hover:bg-gray-700 transition-colors duration-300 focus:outline-none"
            >
              Sign In
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}