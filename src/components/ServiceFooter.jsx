import React from "react";
import { Link } from "react-router-dom";
import {
  Leaf,
  Mail,
  MapPin,
  PhoneCall,
  ChevronRight,
  Bell,
} from "lucide-react";

const ServiceFooter = () => {
  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-green-600 flex items-center justify-center shadow-lg">
                <Leaf className="w-6 h-6 text-white" />
              </div>

              <div>
                <h3 className="text-white font-black text-xl">
                  Agri<span className="text-green-500">Connect</span>
                </h3>
                <p className="text-xs text-gray-500 font-semibold">
                  Grow • Connect • Prosper
                </p>
              </div>
            </div>

            <p className="text-sm text-gray-500 leading-relaxed">
              Helping farmers with smart agriculture services, expert advice,
              weather guidance, soil care, irrigation support and better crop
              decisions.
            </p>
          </div>

          <div>
            <h4 className="text-green-500 font-black text-xs uppercase tracking-widest mb-5">
              Services
            </h4>

            <ul className="space-y-3">
              {[
                { label: "Weather Updates", path: "/services/weather" },
                { label: "Crop Advisory", path: "/services/crop-advisory" },
                { label: "Pest & Disease Help", path: "/services/pest-disease" },
                { label: "Expert Connect", path: "/services/expert-connect" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    className="text-sm hover:text-green-400 transition-colors inline-flex items-center gap-1"
                  >
                    <ChevronRight className="w-3 h-3" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-green-500 font-black text-xs uppercase tracking-widest mb-5">
              Farm Help
            </h4>

            <ul className="space-y-3">
              {[
                { label: "Soil Health Guide", path: "/services/soil-health" },
                { label: "Fertilizer Guidance", path: "/services/fertilizer" },
                { label: "Irrigation Tips", path: "/services/irrigation" },
                { label: "Ask Expert", path: "/posts" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    className="text-sm hover:text-green-400 transition-colors inline-flex items-center gap-1"
                  >
                    <ChevronRight className="w-3 h-3" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-green-500 font-black text-xs uppercase tracking-widest mb-5">
              Contact
            </h4>

            <div className="space-y-4">
              <a
                href="tel:+919109976089"
                className="flex items-center gap-3 text-sm hover:text-green-400 transition-colors"
              >
                <div className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center">
                  <PhoneCall className="w-4 h-4" />
                </div>
                +91 9109976089
              </a>

              <a
                href="mailto:admin@geeksofgurukul.com"
                className="flex items-center gap-3 text-sm hover:text-green-400 transition-colors"
              >
                <div className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                admin@geeksofgurukul.com
              </a>

              <div className="flex items-start gap-3 text-sm">
                <div className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                Bhopal, Madhya Pradesh, India
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-3 py-2 rounded-xl bg-gray-900 border border-gray-800 text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-green-500"
              />

              <button className="px-3 py-2 rounded-xl bg-green-600 hover:bg-green-500 text-white">
                <Bell className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} AgriConnect — All Rights Reserved.
          </p>

          <p className="text-xs text-gray-500">
            Built with care for smart farming.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default ServiceFooter;