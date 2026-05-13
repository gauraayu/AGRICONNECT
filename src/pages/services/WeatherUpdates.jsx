import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  ArrowUpRight,
  Bell,
  CalendarDays,
  CloudRain,
  CloudSun,
  Droplets,
  Leaf,
  Loader2,
  MapPin,
  Navigation,
  RefreshCw,
  Search,
  ShieldCheck,
  Sprout,
  Sun,
  Thermometer,
  Umbrella,
  Waves,
  Wind,
} from "lucide-react";

const DEFAULT_LOCATION = {
  name: "Bhopal",
  admin1: "Madhya Pradesh",
  country: "India",
  latitude: 23.2599,
  longitude: 77.4126,
};

const heroImages = {
  hero: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&auto=format&fit=crop",
  rain: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=900&auto=format&fit=crop",
  irrigation: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=900&auto=format&fit=crop",
  wheat: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=700&auto=format&fit=crop",
  rice: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=700&auto=format&fit=crop",
  tomato: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=700&auto=format&fit=crop",
};

const weatherCodeMap = {
  0: { label: "Clear Sky", icon: Sun },
  1: { label: "Mainly Clear", icon: Sun },
  2: { label: "Partly Cloudy", icon: CloudSun },
  3: { label: "Cloudy", icon: CloudSun },
  45: { label: "Foggy", icon: CloudSun },
  48: { label: "Foggy", icon: CloudSun },
  51: { label: "Light Drizzle", icon: CloudRain },
  53: { label: "Drizzle", icon: CloudRain },
  55: { label: "Heavy Drizzle", icon: CloudRain },
  61: { label: "Light Rain", icon: CloudRain },
  63: { label: "Rain", icon: CloudRain },
  65: { label: "Heavy Rain", icon: CloudRain },
  80: { label: "Rain Showers", icon: CloudRain },
  81: { label: "Rain Showers", icon: CloudRain },
  82: { label: "Heavy Showers", icon: CloudRain },
  95: { label: "Thunderstorm", icon: CloudRain },
};

const getWeatherInfo = (code) => {
  return weatherCodeMap[code] || { label: "Weather Update", icon: CloudSun };
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
      advice: "Heavy rain/humidity risk. Avoid spraying and protect harvested crops.",
    };
  }

  if (temp > 35 || humidity > 75 || rain > 2 || wind > 22) {
    return {
      label: "Medium",
      color: "text-amber-700 bg-amber-50 border-amber-100",
      advice: "Monitor crop disease risk and irrigation timing carefully.",
    };
  }

  return {
    label: "Low",
    color: "text-green-700 bg-green-50 border-green-100",
    advice: "Weather looks suitable for normal farm activities.",
  };
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
};

const WeatherUpdates = () => {
  const [location, setLocation] = useState(DEFAULT_LOCATION);
  const [weather, setWeather] = useState(null);
  const [citySearch, setCitySearch] = useState("");
  const [cityResults, setCityResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [error, setError] = useState("");

  const current = weather?.current;
  const daily = weather?.daily;
  const risk = useMemo(() => getCropRisk(current), [current]);

  const weatherInfo = getWeatherInfo(current?.weather_code);
  const CurrentIcon = weatherInfo.icon;

  const fetchWeather = async (loc = location) => {
    try {
      setLoading(true);
      setError("");

      const url =
        `https://api.open-meteo.com/v1/forecast` +
        `?latitude=${loc.latitude}` +
        `&longitude=${loc.longitude}` +
        `&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m,surface_pressure` +
        `&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,precipitation,weather_code,wind_speed_10m` +
        `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum,wind_speed_10m_max` +
        `&timezone=auto&forecast_days=7`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Weather data not found.");
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
        setError("Location permission denied. Please allow location or search city manually.");
        setLocationLoading(false);
      }
    );
  };

  useEffect(() => {
    fetchWeather(DEFAULT_LOCATION);
  }, []);

  const advisoryCards = [
    {
      title: "Irrigation Advisory",
      desc:
        (current?.temperature_2m || 0) > 33
          ? "Temperature is high. Irrigate early morning or evening to reduce water loss."
          : "Weather is suitable. Check soil moisture before irrigation.",
      icon: Droplets,
      color: "bg-blue-50 text-blue-700 border-blue-100",
    },
    {
      title: "Spraying Advisory",
      desc:
        (current?.wind_speed_10m || 0) > 20
          ? "Wind speed is high. Avoid pesticide spraying now."
          : "Wind speed is controlled. Spraying can be done carefully.",
      icon: Wind,
      color: "bg-sky-50 text-sky-700 border-sky-100",
    },
    {
      title: "Rain Protection",
      desc:
        (current?.rain || 0) > 0
          ? "Rain is active. Cover harvested crops and avoid fertilizer application."
          : "No active rain detected. Keep monitoring forecast before field work.",
      icon: Umbrella,
      color: "bg-indigo-50 text-indigo-700 border-indigo-100",
    },
    {
      title: "Crop Disease Risk",
      desc: risk.advice,
      icon: AlertTriangle,
      color: risk.color,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-28">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImages.hero}
            alt="Farm weather background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-950/95 via-green-900/75 to-emerald-700/30" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 border border-white/20 text-green-100 text-xs font-black uppercase tracking-widest mb-6 backdrop-blur">
              <CloudSun className="w-4 h-4" />
              Real-Time Weather API
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-5">
              Weather Updates for
              <span className="block text-green-300">Smart Farming</span>
            </h1>

            <p className="text-green-50 text-base md:text-lg leading-relaxed max-w-xl mb-8">
              Get live temperature, rain chances, humidity, wind speed, and crop advisory based on your selected location.
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={useMyLocation}
                disabled={locationLoading}
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-400 text-white font-bold rounded-xl shadow-lg transition-all disabled:opacity-70"
              >
                {locationLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Navigation className="w-4 h-4" />
                )}
                Use My Location
              </button>

              <button
                onClick={() => fetchWeather(location)}
                disabled={loading}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/15 hover:bg-white/25 text-white font-bold rounded-xl border border-white/25 backdrop-blur transition-all disabled:opacity-70"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                Refresh
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white/95 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white/60 p-6">
              {loading && !current ? (
                <div className="h-96 flex flex-col items-center justify-center">
                  <Loader2 className="w-10 h-10 text-green-600 animate-spin mb-4" />
                  <p className="text-gray-500 font-semibold">Loading live weather...</p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-xs font-black text-green-600 uppercase tracking-widest">
                        Current Weather
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
                      <CurrentIcon className="w-9 h-9 text-green-700" />
                    </div>
                  </div>

                  <div className="flex items-end gap-3 mb-6">
                    <h3 className="text-7xl font-black text-gray-900">
                      {Math.round(current?.temperature_2m ?? 0)}°
                    </h3>
                    <div className="pb-3">
                      <p className="font-bold text-gray-800">{weatherInfo.label}</p>
                      <p className="text-sm text-gray-500">
                        Feels like {Math.round(current?.apparent_temperature ?? 0)}°C
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-blue-50 p-4 border border-blue-100">
                      <Droplets className="w-5 h-5 text-blue-600 mb-2" />
                      <p className="text-xs font-bold text-gray-500">Humidity</p>
                      <p className="text-xl font-black text-gray-900">
                        {current?.relative_humidity_2m}%
                      </p>
                    </div>

                    <div className="rounded-2xl bg-sky-50 p-4 border border-sky-100">
                      <Wind className="w-5 h-5 text-sky-600 mb-2" />
                      <p className="text-xs font-bold text-gray-500">Wind Speed</p>
                      <p className="text-xl font-black text-gray-900">
                        {current?.wind_speed_10m} km/h
                      </p>
                    </div>

                    <div className="rounded-2xl bg-indigo-50 p-4 border border-indigo-100">
                      <CloudRain className="w-5 h-5 text-indigo-600 mb-2" />
                      <p className="text-xs font-bold text-gray-500">Rain Now</p>
                      <p className="text-xl font-black text-gray-900">
                        {current?.rain ?? 0} mm
                      </p>
                    </div>

                    <div className={`rounded-2xl p-4 border ${risk.color}`}>
                      <Sprout className="w-5 h-5 mb-2" />
                      <p className="text-xs font-bold opacity-80">Crop Risk</p>
                      <p className="text-xl font-black">{risk.label}</p>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="absolute -top-5 -right-4 bg-amber-400 text-amber-950 px-4 py-2 rounded-full shadow-xl text-xs font-black flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Live Data
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 -mt-8 relative z-10">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-5">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-start">
            <div>
              <h3 className="font-black text-gray-900 text-lg">Search Location</h3>
              <p className="text-sm text-gray-500">Type city name and select result</p>
            </div>

            <div className="lg:col-span-3">
              <form onSubmit={searchCity} className="relative mb-4">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  value={citySearch}
                  onChange={(e) => setCitySearch(e.target.value)}
                  placeholder="Search city... Bhopal, Indore, Delhi, Pune"
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
                      <div className="font-black text-gray-900 text-sm">{city.name}</div>
                      <div className="text-xs text-gray-500">
                        {city.admin1} {city.country && `, ${city.country}`}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="forecast" className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-end justify-between gap-4 mb-8 flex-wrap">
          <div>
            <p className="text-green-600 text-sm font-black uppercase tracking-widest mb-2">
              7-Day Forecast
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">
              Upcoming Weather Conditions
            </h2>
            <p className="text-gray-500 mt-2">
              Forecast is coming from Open-Meteo live API using latitude and longitude.
            </p>
          </div>

          <div className="text-sm font-bold text-green-700 bg-green-50 px-4 py-2 rounded-full border border-green-100">
            {location.name}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-7 gap-4">
          {daily?.time?.map((date, index) => {
            const info = getWeatherInfo(daily.weather_code[index]);
            const Icon = info.icon;

            return (
              <div
                key={date}
                className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-black text-gray-900">{formatDate(date)}</h3>
                  <Icon className="w-7 h-7 text-green-600" />
                </div>

                <p className="text-sm font-bold text-gray-600 mb-2">{info.label}</p>

                <p className="text-2xl font-black text-gray-900 mb-2">
                  {Math.round(daily.temperature_2m_max[index])}° /
                  {Math.round(daily.temperature_2m_min[index])}°
                </p>

                <div className="flex items-center gap-1 text-sm text-blue-600 font-bold mb-2">
                  <CloudRain className="w-4 h-4" />
                  {daily.precipitation_probability_max[index]}%
                </div>

                <div className="flex items-center gap-1 text-xs text-gray-500 font-semibold">
                  <Wind className="w-3 h-3" />
                  {daily.wind_speed_10m_max[index]} km/h
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <p className="text-green-600 text-sm font-black uppercase tracking-widest mb-2">
              Farmer Advisory
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
              Weather-Based Crop Protection
            </h2>
            <p className="text-gray-500">
              Advisory automatically changes according to live weather data.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            {advisoryCards.map(({ title, desc, icon: Icon, color }) => (
              <div
                key={title}
                className={`rounded-3xl p-6 border shadow-sm hover:shadow-xl transition-all ${color}`}
              >
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mb-5 shadow-sm">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black mb-2">{title}</h3>
                <p className="text-sm leading-relaxed opacity-80">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div>
            <p className="text-green-600 text-sm font-black uppercase tracking-widest mb-2">
              Smart Alerts
            </p>
            <h2 className="text-3xl font-black text-gray-900 mb-3">
              Important Weather Alerts
            </h2>
            <p className="text-gray-500 leading-relaxed">
              Farmers should make decisions based on rainfall, humidity, temperature,
              wind speed, and crop disease risk.
            </p>
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="relative rounded-3xl overflow-hidden h-72 group shadow-xl">
              <img
                src={heroImages.rain}
                alt="Rain alert"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 p-6 text-white">
                <Umbrella className="w-8 h-8 mb-3 text-blue-300" />
                <h3 className="text-xl font-black mb-1">Heavy Rain Alert</h3>
                <p className="text-sm text-white/80">
                  Cover harvested crops and avoid pesticide spraying during rainfall.
                </p>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden h-72 group shadow-xl">
              <img
                src={heroImages.irrigation}
                alt="Irrigation advisory"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-950/90 via-green-900/20 to-transparent" />
              <div className="absolute bottom-0 p-6 text-white">
                <Waves className="w-8 h-8 mb-3 text-green-300" />
                <h3 className="text-xl font-black mb-1">Irrigation Planning</h3>
                <p className="text-sm text-white/80">
                  Save water by planning irrigation according to temperature and rain forecast.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-green-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between gap-4 mb-8 flex-wrap">
            <div>
              <p className="text-green-600 text-sm font-black uppercase tracking-widest mb-2">
                Crop Weather Guide
              </p>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900">
                Crop-Specific Weather Tips
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
            {[
              {
                crop: "Wheat",
                weather: "Cool & Dry",
                advice: "Avoid excess irrigation during cloudy weather.",
                image: heroImages.wheat,
              },
              {
                crop: "Rice",
                weather: "Humid & Wet",
                advice: "Maintain proper water level and drainage.",
                image: heroImages.rice,
              },
              {
                crop: "Tomato",
                weather: "Moderate Sunlight",
                advice: "Watch fungal disease risk after rainfall.",
                image: heroImages.tomato,
              },
            ].map((item) => (
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
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-black text-gray-900">{item.crop}</h3>
                    <span className="text-xs font-black bg-green-100 text-green-700 px-3 py-1 rounded-full">
                      {item.weather}
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
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="rounded-[2rem] bg-gradient-to-br from-green-700 to-emerald-900 p-8 md:p-10 text-white overflow-hidden relative">
          <div className="absolute right-0 top-0 opacity-10">
            <CloudRain className="w-72 h-72" />
          </div>

          <div className="relative grid grid-cols-1 lg:grid-cols-4 gap-6 items-center">
            <div>
              <h2 className="text-3xl font-black mb-2">Farm Weather Index</h2>
              <p className="text-green-100 text-sm">
                Quick view of important climate conditions for farming decisions.
              </p>
            </div>

            {[
              {
                label: "Temperature",
                value: `${Math.round(current?.temperature_2m ?? 0)}°C`,
                icon: Thermometer,
              },
              {
                label: "Humidity",
                value: `${current?.relative_humidity_2m ?? 0}%`,
                icon: Droplets,
              },
              {
                label: "Wind Speed",
                value: `${current?.wind_speed_10m ?? 0} km/h`,
                icon: Wind,
              },
            ].map(({ label, value, icon: Icon }) => (
              <div
                key={label}
                className="bg-white/10 border border-white/15 backdrop-blur rounded-3xl p-5"
              >
                <Icon className="w-7 h-7 text-green-200 mb-4" />
                <p className="text-sm text-green-100">{label}</p>
                <h3 className="text-3xl font-black mt-1">{value}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default WeatherUpdates;