import React from 'react';

const ProfilePage = () => {
  // Get and Parse the user data from localStorage
  const userDataString = localStorage.getItem('user');
  const user = userDataString ? JSON.parse(userDataString) : null;

  // Handle cases where user data might be missing
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">No profile data available. Please log in.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto my-10 p-8 bg-white shadow-lg rounded-xl border border-gray-100">
      <div className="flex items-center space-x-4 mb-8">
        <div className="h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
          {user.name.charAt(0)}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
          <p className="text-gray-500 capitalize">{user.role.replace('_', ' ')}</p>
        </div>
      </div>

      <div className="space-y-6">
        <section>
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Contact Information
          </h3>
          <div className="grid grid-cols-1 gap-4">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Email Address</span>
              <span className="text-lg font-medium text-gray-900">{user.email}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Phone Number</span>
              <span className="text-lg font-medium text-gray-900">{user.phone}</span>
            </div>
          </div>
        </section>

        <hr className="border-gray-100" />

        <section>
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Account Status
          </h3>
          <div className="flex items-center">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {user.status.toUpperCase()}
            </span>
          </div>
        </section>
      </div>

      <div className="mt-10 pt-6 border-t border-gray-100 text-xs text-gray-400">
        Member since {new Date(user.createdAt).toLocaleDateString()}
      </div>
    </div>
  );
};

export default ProfilePage;