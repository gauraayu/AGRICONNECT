import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  MapPin,
  ArrowLeft,
  ShoppingBag,
  Filter,
  Phone,
  Leaf,
  ChevronDown,
} from "lucide-react";
import { marketplaceCrops } from "../data/marketplaceCrops";

const Marketplace = () => {
  const [search, setSearch] = useState("");
  const [quality, setQuality] = useState("all");

  const filteredCrops = marketplaceCrops.filter((crop) => {
    const value = search.toLowerCase();

    const matchesSearch =
      crop.name.toLowerCase().includes(value) ||
      crop.region.toLowerCase().includes(value) ||
      crop.farmer.toLowerCase().includes(value) ||
      crop.quality.toLowerCase().includes(value);

    const matchesQuality =
      quality === "all" || crop.quality.toLowerCase().includes(quality);

    return matchesSearch && matchesQuality;
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-green-700 hover:text-green-800 mb-5"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="rounded-3xl bg-gradient-to-br from-green-700 to-emerald-900 p-8 md:p-10 text-white shadow-xl overflow-hidden relative">
            <div className="absolute right-0 top-0 opacity-10">
              <Leaf className="w-72 h-72 text-white -rotate-12" />
            </div>

            <div className="relative flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 border border-white/20 text-green-100 text-xs font-bold uppercase tracking-widest mb-4">
                  <ShoppingBag className="w-4 h-4" />
                  AgriConnect Marketplace
                </div>

                <h1 className="text-3xl md:text-5xl font-bold mb-3">
                  Explore Fresh Crop Listings
                </h1>

                <p className="text-green-100 max-w-2xl">
                  Browse dummy crop listings from verified farmers. Buyers can
                  check crop price, quantity, quality, farmer name and region.
                </p>
              </div>

              <div className="bg-white/15 backdrop-blur rounded-2xl px-6 py-4 border border-white/20">
                <p className="text-xs uppercase tracking-widest text-green-100 font-bold">
                  Showing Listings
                </p>
                <p className="text-3xl font-black">
                  {filteredCrops.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-8">
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search crop, farmer, region or quality..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-green-500 text-sm"
              />
            </div>

            <div className="relative">
              <select
                value={quality}
                onChange={(e) => setQuality(e.target.value)}
                className="appearance-none w-full lg:w-56 px-4 py-3 pr-10 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm focus:outline-none focus:border-green-500 bg-white"
              >
                <option value="all">All Quality</option>
                <option value="premium">Premium</option>
                <option value="organic">Organic</option>
                <option value="fresh">Fresh</option>
                <option value="grade">A Grade</option>
                <option value="export">Export Quality</option>
              </select>

              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            <button className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-gray-200 text-gray-700 font-semibold hover:bg-green-50 hover:text-green-700 hover:border-green-300 transition">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
        </div>

        {filteredCrops.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
            <Leaf className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="font-bold text-gray-900 text-lg">
              No crops found
            </h3>
            <p className="text-gray-500 text-sm mt-1">
              Try searching wheat, rice, tomato, Bhopal, organic etc.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredCrops.map((crop) => (
              <div
                key={crop.id}
                className="group rounded-2xl bg-white border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={crop.image}
                    alt={crop.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?w=700&auto=format&fit=crop";
                    }}
                  />

                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 text-green-700 text-xs font-bold shadow-sm">
                    {crop.quality}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-gray-900 text-base mb-1">
                    {crop.name}
                  </h3>

                  <p className="text-green-600 font-black text-xl mb-2">
                    {crop.price}
                  </p>

                  <p className="text-gray-500 text-xs flex items-center gap-1 mb-2">
                    <MapPin className="w-3 h-3" />
                    {crop.region}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                    <div className="bg-gray-50 rounded-lg p-2">
                      <p className="text-gray-400">Quantity</p>
                      <p className="font-bold text-gray-800">
                        {crop.quantity}
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-2">
                      <p className="text-gray-400">Farmer</p>
                      <p className="font-bold text-gray-800 truncate">
                        {crop.farmer}
                      </p>
                    </div>
                  </div>

                  <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-sm transition">
                    <Phone className="w-4 h-4" />
                    Contact Farmer
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;