import React from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  const stored = localStorage.getItem("agriUser");
  const user = stored ? JSON.parse(stored) : null;

  return (
    <div className="min-h-screen bg-earth-50 pt-28 pb-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-3xl shadow-xl p-10">
          <h1 className="font-display text-3xl font-bold text-earth-900 mb-4">My Profile</h1>
          {user ? (
            <div className="space-y-4">
              <div className="text-earth-700">
                <span className="font-semibold">Name:</span> {user.name}
              </div>
              <div className="text-earth-700">
                <span className="font-semibold">Email:</span> {user.email}
              </div>
              <div className="text-earth-700 capitalize">
                <span className="font-semibold">Role:</span> {user.role}
              </div>
              <div className="text-earth-600 text-sm">
                This is a simple profile overview page. You can expand it later with more details.
              </div>
            </div>
          ) : (
            <p className="text-earth-500">No user is currently logged in.</p>
          )}
          <div className="mt-8">
            <Link
              to="/"
              className="inline-block px-6 py-3 bg-leaf-500 text-white rounded-full font-semibold hover:bg-leaf-400 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
