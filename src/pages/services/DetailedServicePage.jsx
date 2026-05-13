import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  ArrowUpRight,
  Bell,
  CheckCircle2,
  CloudRain,
  CloudSun,
  Droplets,
  ExternalLink,
  Leaf,
  Loader2,
  MapPin,
  Navigation,
  RefreshCw,
  Search,
  ShieldCheck,
  Sprout,
  Thermometer,
  Wind,
} from "lucide-react";
import ServiceFooter from "../../components/ServiceFooter";

const DEFAULT_LOCATION = {
  name: "Bhopal",
  admin1: "Madhya Pradesh",
  country: "India",
  latitude: 23.2599,
  longitude: 77.4126,
};

const getCropRisk = (current) => {
  const temp = current?.temperature_2m ?? 0;
  const humidity = current?.relative_humidity_2m ?? 0;
  const rain = current?.rain ?? 0;
  const wind = current?.wind_speed_10m ?? 0;

  if (rain > 8 || wind > 35 || humidity > 88) {
    return {
      label: "High",
      color: "text-red-600 bg-red-50 border-red-100",
      advice:
        "High risk conditions detected. Avoid spraying and protect sensitive crops.",
    };
  }

  if (temp > 35 || humidity > 75 || rain > 2 || wind > 22) {
    return {
      label: "Medium",
      color: "text-amber-700 bg-amber-50 border-amber-100",
      advice:
        "Monitor crop condition carefully and follow weather-based farm planning.",
    };
  }

  return {
    label: "Low",
    color: "text-green-700 bg-green-50 border-green-100",
    advice: "Conditions are suitable for normal farm activities.",
  };
};

const DetailedServicePage = ({
  badge,
  title,
  highlight,
  subtitle,
  heroImage,
  icon: PageIcon,
  primaryText,
  primaryPath,
  secondaryText = "Ask Expert",
  secondaryPath = "/posts",
  stats = [],
  searchPlaceholder = "Search city... Bhopal, Indore, Delhi, Pune",
  featureTitle = "Smart Service Features",
  featureSubtitle = "Useful tools and guidance for better farm decisions.",
  features = [],
  advisoryTitle = "Service-Based Farmer Advisory",
  advisorySubtitle = "Practical recommendations for farmers based on local conditions.",
  advisoryCards = [],
  imageCards = [],
  cropCards = [],
  indexTitle = "Quick Farm Index",
}) => {
  const [location, setLocation] = useState(DEFAULT_LOCATION);
  const [weather, setWeather] = useState(null);
  const [citySearch, setCitySearch] = useState("");
  const [cityResults, setCityResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState("");

  const current = weather?.current;
  const risk = useMemo(() => getCropRisk(current), [current]);
  const Icon = PageIcon || Leaf;

  const fetchWeather = async (loc = location) => {
    try {
      setLoading(true);
      setError("");

      const url =
        `https://api.open-meteo.com/v1/forecast` +
        `?latitude=${loc.latitude}` +
        `&longitude=${loc.longitude}` +
        `&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m,surface_pressure` +
        `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum,wind_speed_10m_max` +
        `&timezone=auto&forecast_days=7`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Unable to fetch live weather data.");
      }

      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message || "Unable to fetch weather data.");
    } finally {
      setLoading(false);
    }
  };

  const searchCity = async (e) => {
    e.preventDefault();

    if (!citySearch.trim()) return;

    try {
      setSearchLoading(true);
      setError("");

      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          citySearch
        )}&count=8&language=en&format=json`
      );

      const data = await response.json();
      setCityResults(data.results || []);

      if (!data.results?.length) {
        setError("No city found. Try another location.");
      }
    } catch {
      setError("Unable to search location.");
    } finally {
      setSearchLoading(false);
    }
  };

  const selectCity = (city) => {
    const newLocation = {
      name: city.name,
      admin1: city.admin1 || "",
      country: city.country || "",
      latitude: city.latitude,
      longitude: city.longitude,
    };

    setLocation(newLocation);
    setCityResults([]);
    setCitySearch("");
    fetchWeather(newLocation);
  };

  const useMyLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported in this browser.");
      return;
    }

    setLocationLoading(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const newLocation = {
          name: "Your Location",
          admin1: "Current GPS Location",
          country: "India",
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        setLocation(newLocation);
        await fetchWeather(newLocation);
        setLocationLoading(false);
      },
      () => {
        setError(
          "Location permission denied. Please allow location or search city manually."
        );
        setLocationLoading(false);
      }
    );
  };

  const mapsLink = `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;

  return (
    <div className="min-h-screen bg-gray-50 pt-28">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-950/95 via-green-900/80 to-emerald-700/25" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 border border-white/20 text-green-100 text-xs font-black uppercase tracking-widest mb-6 backdrop-blur">
              <Icon className="w-4 h-4" />
              {badge}
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-5">
              {title}
              <span className="block text-green-300">{highlight}</span>
            </h1>

            <p className="text-green-50 text-base md:text-lg leading-relaxed max-w-xl mb-8">
              {subtitle}
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                to={primaryPath}
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-400 text-white font-bold rounded-xl shadow-lg transition-all"
              >
                {primaryText}
                <ArrowUpRight className="w-4 h-4" />
              </Link>

              <Link
                to={secondaryPath}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/15 hover:bg-white/25 text-white font-bold rounded-xl border border-white/25 backdrop-blur transition-all"
              >
                {secondaryText}
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white/95 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white/60 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs font-black text-green-600 uppercase tracking-widest">
                    Live Farm Location
                  </p>

                  <h2 className="text-2xl font-black text-gray-900 mt-1">
                    {location.name}
                  </h2>

                  <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                    <MapPin className="w-4 h-4" />
                    {location.admin1} {location.country && `, ${location.country}`}
                  </p>
                </div>

                <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center">
                  <Icon className="w-9 h-9 text-green-700" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="rounded-2xl bg-green-50 p-4 border border-green-100">
                  <MapPin className="w-5 h-5 text-green-700 mb-2" />
                  <p className="text-xs font-bold text-gray-500">Latitude</p>
                  <p className="text-lg font-black text-gray-900">
                    {location.latitude.toFixed(4)}
                  </p>
                </div>

                <div className="rounded-2xl bg-green-50 p-4 border border-green-100">
                  <MapPin className="w-5 h-5 text-green-700 mb-2" />
                  <p className="text-xs font-bold text-gray-500">Longitude</p>
                  <p className="text-lg font-black text-gray-900">
                    {location.longitude.toFixed(4)}
                  </p>
                </div>

                <div className="rounded-2xl bg-blue-50 p-4 border border-blue-100">
                  <Thermometer className="w-5 h-5 text-blue-600 mb-2" />
                  <p className="text-xs font-bold text-gray-500">
                    Temperature
                  </p>
                  <p className="text-lg font-black text-gray-900">
                    {current ? `${Math.round(current.temperature_2m)}°C` : "--"}
                  </p>
                </div>

                <div className={`rounded-2xl p-4 border ${risk.color}`}>
                  <Sprout className="w-5 h-5 mb-2" />
                  <p className="text-xs font-bold opacity-80">Farm Risk</p>
                  <p className="text-lg font-black">{risk.label}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={useMyLocation}
                  disabled={locationLoading}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold transition-all disabled:opacity-70"
                >
                  {locationLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Navigation className="w-4 h-4" />
                  )}
                  Use My Location
                </button>

                <a
                  href={mapsLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-white border border-green-200 hover:bg-green-50 text-green-700 rounded-xl font-bold transition-all"
                >
                  Open Map
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="absolute -top-5 -right-4 bg-amber-400 text-amber-950 px-4 py-2 rounded-full shadow-xl text-xs font-black flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Live Location
            </div>
          </div>
        </div>
      </section>

      {/* LOCATION SEARCH */}
      <section className="max-w-7xl mx-auto px-6 -mt-8 relative z-10">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-5">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-start">
            <div>
              <h3 className="font-black text-gray-900 text-lg">
                Search Location
              </h3>
              <p className="text-sm text-gray-500">
                Type city name and select result
              </p>
            </div>

            <div className="lg:col-span-3">
              <form onSubmit={searchCity} className="relative mb-4">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

                <input
                  value={citySearch}
                  onChange={(e) => setCitySearch(e.target.value)}
                  placeholder={searchPlaceholder}
                  className="w-full pl-12 pr-32 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                />

                <button
                  type="submit"
                  disabled={searchLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-bold disabled:opacity-70"
                >
                  {searchLoading ? "Searching..." : "Search"}
                </button>
              </form>

              {error && (
                <div className="mb-4 rounded-2xl bg-red-50 border border-red-100 px-4 py-3 text-sm font-semibold text-red-600">
                  {error}
                </div>
              )}

              {cityResults.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2">
                  {cityResults.map((city) => (
                    <button
                      key={`${city.id}-${city.latitude}`}
                      onClick={() => selectCity(city)}
                      className="text-left p-3 rounded-2xl bg-gray-50 hover:bg-green-50 border border-gray-100 hover:border-green-200 transition-all"
                    >
                      <div className="font-black text-gray-900 text-sm">
                        {city.name}
                      </div>

                      <div className="text-xs text-gray-500">
                        {city.admin1} {city.country && `, ${city.country}`}
                      </div>
                    </button>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap gap-3 mt-4">
                <button
                  onClick={() => fetchWeather(location)}
                  disabled={loading}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-50 hover:bg-green-100 text-green-700 rounded-xl text-sm font-black border border-green-100 disabled:opacity-70"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                  Load Local Weather
                </button>

                <button
                  onClick={useMyLocation}
                  disabled={locationLoading}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-xl text-sm font-black disabled:opacity-70"
                >
                  <Navigation className="w-4 h-4" />
                  Detect Farm Location
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {stats.map((item) => (
            <div
              key={item.label}
              className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <p className="text-3xl font-black text-green-700">
                {item.value}
              </p>

              <p className="text-sm font-bold text-gray-500 mt-2">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <p className="text-green-600 text-sm font-black uppercase tracking-widest mb-2">
              Key Features
            </p>

            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
              {featureTitle}
            </h2>

            <p className="text-gray-500">{featureSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            {features.map(({ title: itemTitle, desc, icon: FeatureIcon, color }) => (
              <div
                key={itemTitle}
                className={`rounded-3xl p-6 border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all ${
                  color || "bg-green-50 text-green-700 border-green-100"
                }`}
              >
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mb-5 shadow-sm">
                  <FeatureIcon className="w-6 h-6" />
                </div>

                <h3 className="text-lg font-black mb-2">{itemTitle}</h3>

                <p className="text-sm leading-relaxed opacity-80">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ADVISORY */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <p className="text-green-600 text-sm font-black uppercase tracking-widest mb-2">
            Farmer Advisory
          </p>

          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
            {advisoryTitle}
          </h2>

          <p className="text-gray-500">{advisorySubtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {advisoryCards.map(({ title: itemTitle, desc, icon: CardIcon, color }) => (
            <div
              key={itemTitle}
              className={`rounded-3xl p-6 border shadow-sm hover:shadow-xl transition-all ${
                color || "bg-white text-gray-700 border-gray-100"
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mb-5 shadow-sm">
                <CardIcon className="w-6 h-6" />
              </div>

              <h3 className="text-lg font-black mb-2">{itemTitle}</h3>

              <p className="text-sm leading-relaxed opacity-80">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* IMAGE ALERTS */}
      <section className="bg-green-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div>
              <p className="text-green-600 text-sm font-black uppercase tracking-widest mb-2">
                Visual Guide
              </p>

              <h2 className="text-3xl font-black text-gray-900 mb-3">
                Practical farm support with images
              </h2>

              <p className="text-gray-500 leading-relaxed">
                Visual examples help farmers understand field problems, crop
                needs and timely action steps more clearly.
              </p>
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-5">
              {imageCards.map((item) => (
                <div
                  key={item.title}
                  className="relative rounded-3xl overflow-hidden h-72 group shadow-xl"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                  <div className="absolute bottom-0 p-6 text-white">
                    <item.icon className="w-8 h-8 mb-3 text-green-300" />

                    <h3 className="text-xl font-black mb-1">{item.title}</h3>

                    <p className="text-sm text-white/80">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CROP CARDS */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-end justify-between gap-4 mb-8 flex-wrap">
          <div>
            <p className="text-green-600 text-sm font-black uppercase tracking-widest mb-2">
              Crop Guide
            </p>

            <h2 className="text-3xl md:text-4xl font-black text-gray-900">
              Crop-specific recommendations
            </h2>
          </div>

          <Link
            to="/posts"
            className="inline-flex items-center gap-2 text-green-700 font-black hover:text-green-900"
          >
            Ask Expert
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cropCards.map((item) => (
            <div
              key={item.crop}
              className="bg-white rounded-3xl overflow-hidden border border-green-100 shadow-sm hover:shadow-xl transition-all"
            >
              <div className="h-44 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.crop}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3 gap-3">
                  <h3 className="text-xl font-black text-gray-900">
                    {item.crop}
                  </h3>

                  <span className="text-xs font-black bg-green-100 text-green-700 px-3 py-1 rounded-full">
                    {item.tag}
                  </span>
                </div>

                <p className="text-gray-500 text-sm leading-relaxed mb-5">
                  {item.advice}
                </p>

                <button className="inline-flex items-center gap-2 text-green-700 font-black text-sm">
                  View Advisory
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* INDEX */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="rounded-[2rem] bg-gradient-to-br from-green-700 to-emerald-900 p-8 md:p-10 text-white overflow-hidden relative">
          <div className="absolute right-0 top-0 opacity-10">
            <Leaf className="w-72 h-72" />
          </div>

          <div className="relative grid grid-cols-1 lg:grid-cols-4 gap-6 items-center">
            <div>
              <h2 className="text-3xl font-black mb-2">{indexTitle}</h2>

              <p className="text-green-100 text-sm">
                Quick view of service-related farm conditions for better
                decision-making.
              </p>
            </div>

            {[
              {
                label: "Temperature",
                value: current ? `${Math.round(current.temperature_2m)}°C` : "--",
                icon: Thermometer,
              },
              {
                label: "Humidity",
                value: current ? `${current.relative_humidity_2m}%` : "--",
                icon: Droplets,
              },
              {
                label: "Wind Speed",
                value: current ? `${current.wind_speed_10m} km/h` : "--",
                icon: Wind,
              },
            ].map(({ label, value, icon: IndexIcon }) => (
              <div
                key={label}
                className="bg-white/10 border border-white/15 backdrop-blur rounded-3xl p-5"
              >
                <IndexIcon className="w-7 h-7 text-green-200 mb-4" />

                <p className="text-sm text-green-100">{label}</p>

                <h3 className="text-3xl font-black mt-1">{value}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServiceFooter />
    </div>
  );
};

export default DetailedServicePage;