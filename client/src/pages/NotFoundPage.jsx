import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiAlertTriangle } from 'react-icons/fi';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-darkBg p-4 text-center">
      <div className="max-w-md glass p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-2xl space-y-6">
        <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto text-3xl shadow-lg">
          <FiAlertTriangle />
        </div>

        <div>
          <h1 className="text-4xl font-black text-gray-900 dark:text-white">
            404
          </h1>
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mt-1">
            Page Not Found
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            The page you are looking for doesn't exist or has been moved.
          </p>
        </div>

        <Link
          to="/"
          className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 transition-all"
        >
          <FiHome className="w-4 h-4" />
          <span>Return to Homepage</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
