import React from 'react';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-10 border border-gray-200 rounded-lg shadow-sm">
        
        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 mb-8">
          Sign In
        </h2>
        
        <form className="space-y-6">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div className="mt-1">
              {/* These classes are new for v4 forms */}
              <input
                id="email"
                name="email"
                type="email"
                required
                className="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900"
                placeholder="you@example.com"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1">
              {/* These classes are new for v4 forms */}
              <input
                id="password"
                name="password"
                type="password"
                required
                className="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900"
              />
            </div>
          </div>
          
          {/* Submit Button (Stays the same) */}
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