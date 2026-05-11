import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  BarChart2,
  Search,
  MapPin,
  TrendingUp,
  TrendingDown,
  Minus,
  ChevronDown,
  IndianRupee,
  Leaf,
} from "lucide-react";
import { mandiPrices } from "../data/mandiPrices";

const MandiPrices = () => {
  const [search, setSearch] = useState("");
  const [stateFilter, setStateFilter] = useState("all");

  const states = ["all", ...new Set(mandiPrices.map((item) => item.state))];

  const filteredPrices = mandiPrices.filter((item) => {
    const value = search.toLowerCase();

    const matchesSearch =
      item.crop.toLowerCase().includes(value) ||
      item.hindi.includes(value) ||
      item.market.toLowerCase().includes(value) ||
      item.state.toLowerCase().includes(value) ||
      item.quality.toLowerCase().includes(value);

    const matchesState =
      stateFilter === "all" || item.state === stateFilter;

    return matchesSearch && matchesState;
  });

  const highestPrice = Math.max(...mandiPrices.map((item) => item.price));
  const risingCount = mandiPrices.filter((item) => item.change > 0).length;
  const fallingCount = mandiPrices.filter((item) => item.change < 0).length;

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-green-700 hover:text-green-800 mb-5"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-700 via-emerald-800 to-green-950 p-8 md:p-10 text-white shadow-xl mb-8">
          <div className="absolute -right-16 -top-16 opacity-10">
            <Leaf className="w-80 h-80 text-white" />
          </div>

          <div className="relative flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 border border-white/20 text-green-100 text-xs font-bold uppercase tracking-widest mb-4">
                <BarChart2 className="w-4 h-4" />
                Dummy Mandi Price Board
              </div>

              <h1 className="text-3xl md:text-5xl font-bold mb-3">
                Today's Mandi Prices
              </h1>

              <p className="text-green-100 max-w-2xl">
                Check dummy mandi rates for 50 crops across different Indian
                markets. Search by crop, mandi, state or quality.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white/15 backdrop-blur rounded-2xl px-4 py-3 border border-white/20">
                <p className="text-[10px] uppercase tracking-widest text-green-100 font-bold">
                  Listings
                </p>
                <p className="text-2xl font-black">{filteredPrices.length}</p>
              </div>

              <div className="bg-white/15 backdrop-blur rounded-2xl px-4 py-3 border border-white/20">
                <p className="text-[10px] uppercase tracking-widest text-green-100 font-bold">
                  Rising
                </p>
                <p className="text-2xl font-black">{risingCount}</p>
              </div>

              <div className="bg-white/15 backdrop-blur rounded-2xl px-4 py-3 border border-white/20">
                <p className="text-[10px] uppercase tracking-widest text-green-100 font-bold">
                  Highest
                </p>
                <p className="text-2xl font-black">₹{highestPrice}</p>
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
                placeholder="Search crop, mandi, state or quality..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-green-500 text-sm"
              />
            </div>

            <div className="relative">
              <select
                value={stateFilter}
                onChange={(e) => setStateFilter(e.target.value)}
                className="appearance-none w-full lg:w-64 px-4 py-3 pr-10 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm focus:outline-none focus:border-green-500 bg-white"
              >
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state === "all" ? "All States" : state}
                  </option>
                ))}
              </select>

              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="w-11 h-11 rounded-xl bg-green-100 flex items-center justify-center mb-3">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-2xl font-black text-gray-900">{risingCount}</h3>
            <p className="text-sm text-gray-500">Crops price rising</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="w-11 h-11 rounded-xl bg-red-100 flex items-center justify-center mb-3">
              <TrendingDown className="w-5 h-5 text-red-500" />
            </div>
            <h3 className="text-2xl font-black text-gray-900">{fallingCount}</h3>
            <p className="text-sm text-gray-500">Crops price falling</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center mb-3">
              <IndianRupee className="w-5 h-5 text-amber-600" />
            </div>
            <h3 className="text-2xl font-black text-gray-900">₹{highestPrice}</h3>
            <p className="text-sm text-gray-500">Highest dummy price</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="grid grid-cols-6 px-5 py-3 bg-gray-50 border-b border-gray-100">
            <span className="text-xs font-bold text-gray-500 uppercase col-span-2">
              Crop
            </span>
            <span className="text-xs font-bold text-gray-500 uppercase text-right">
              Price
            </span>
            <span className="text-xs font-bold text-gray-500 uppercase text-center">
              Change
            </span>
            <span className="text-xs font-bold text-gray-500 uppercase text-right">
              Market
            </span>
            <span className="text-xs font-bold text-gray-500 uppercase text-right">
              Quality
            </span>
          </div>

          {filteredPrices.length === 0 ? (
            <div className="py-12 text-center">
              <Leaf className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900">No mandi price found</h3>
              <p className="text-sm text-gray-500 mt-1">
                Try searching wheat, rice, Bhopal, premium etc.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {filteredPrices.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-6 px-5 py-4 hover:bg-green-50/40 transition-colors items-center"
                >
                  <div className="col-span-2">
                    <div className="font-bold text-gray-900 text-sm">
                      {item.crop}
                    </div>
                    <div className="text-gray-400 text-xs">{item.hindi}</div>
                  </div>

                  <div className="text-right">
                    <div className="font-black text-gray-900 text-sm">
                      {item.price.toLocaleString()}
                    </div>
                    <div className="text-gray-400 text-xs">{item.unit}</div>
                  </div>

                  <div className="flex items-center justify-center">
                    {item.change > 0 ? (
                      <div className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-full">
                        <TrendingUp className="w-3 h-3" />
                        <span className="text-xs font-bold">
                          +{item.change}
                        </span>
                      </div>
                    ) : item.change < 0 ? (
                      <div className="flex items-center gap-1 text-red-500 bg-red-50 px-2 py-1 rounded-full">
                        <TrendingDown className="w-3 h-3" />
                        <span className="text-xs font-bold">
                          {item.change}
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-gray-500 bg-gray-50 px-2 py-1 rounded-full">
                        <Minus className="w-3 h-3" />
                        <span className="text-xs font-bold">0</span>
                      </div>
                    )}
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-semibold text-gray-700 flex items-center justify-end gap-1">
                      <MapPin className="w-3 h-3 text-gray-400" />
                      {item.market}
                    </div>
                    <div className="text-[11px] text-gray-400">
                      {item.state}
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="inline-flex px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold">
                      {item.quality}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <p className="text-xs text-gray-400 mt-4 text-center">
          Note: This is dummy mandi price data for UI/demo purpose.
        </p>
      </div>
    </div>
  );
};

export default MandiPrices;