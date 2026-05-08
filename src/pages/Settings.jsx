import React from "react";
import { Link } from "react-router-dom";

const Settings = () => {
  return (
    <div className="min-h-screen bg-earth-50 pt-28 pb-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-3xl shadow-xl p-10">
          <h1 className="font-display text-3xl font-bold text-earth-900 mb-4">Settings</h1>
          <p className="text-earth-600 leading-relaxed mb-6">
            This is a placeholder settings page. Add preference controls, password change, and account options here.
          </p>
          <div className="space-y-4">
            <div className="rounded-2xl border border-earth-100 p-5 bg-earth-50">
              <p className="font-semibold text-earth-900">Account Preferences</p>
              <p className="text-earth-600 text-sm mt-2">Manage your account settings and notifications.</p>
            </div>
            <div className="rounded-2xl border border-earth-100 p-5 bg-earth-50">
              <p className="font-semibold text-earth-900">Privacy</p>
              <p className="text-earth-600 text-sm mt-2">Configure your privacy and data settings.</p>
            </div>
          </div>
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

export default Settings;
