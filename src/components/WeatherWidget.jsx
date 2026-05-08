import React, { useState, useEffect } from "react";
import { FiMapPin, FiAlertTriangle, FiCheck, FiDroplet, FiWind } from "react-icons/fi";
import { WiDaySunny, WiDayCloudy, WiCloud, WiFog, WiDayRain, WiRain, WiSnow, WiThunderstorm, WiThermometer, WiHumidity } from "react-icons/wi";

const WeatherWidget = () => {
  const [weather, setWeather]   = useState(null);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(false);
  const [city, setCity]         = useState("Bhopal");
  const [coords, setCoords]     = useState({ lat: 23.2599, lon: 77.4126 }); // default Bhopal

  // Weather code → icon component + label
  const weatherInfo = (code) => {
    const iconClass = "text-2xl";
    if (code === 0)              return { icon: <WiDaySunny className={iconClass} />,  label: "Clear Sky" };
    if ([1,2].includes(code))    return { icon: <WiDayCloudy className={iconClass} />, label: "Partly Cloudy" };
    if (code === 3)              return { icon: <WiCloud className={iconClass} />,  label: "Overcast" };
    if ([45,48].includes(code))  return { icon: <WiFog className={iconClass} />, label: "Foggy" };
    if ([51,53,55].includes(code)) return { icon: <WiRain className={iconClass} />, label: "Drizzle" };
    if ([61,63,65].includes(code)) return { icon: <WiRain className={iconClass} />, label: "Rain" };
    if ([71,73,75].includes(code)) return { icon: <WiSnow className={iconClass} />,  label: "Snow" };
    if ([80,81,82].includes(code)) return { icon: <WiThunderstorm className={iconClass} />, label: "Showers" };
    if ([95,96,99].includes(code)) return { icon: <WiThunderstorm className={iconClass} />,  label: "Thunderstorm" };
    return { icon: <WiThermometer className={iconClass} />, label: "Unknown" };
  };

  // Crop advisory based on weather
  const getCropAdvisory = (code, temp, humidity) => {
    if ([95,96,99].includes(code))
      return { msg: "Thunderstorm alert! Protect your crops and avoid field work.", icon: <FiAlertTriangle className="text-lg" />, color: "bg-red-50 text-red-700 border-red-200" };
    if ([61,63,65,80,81,82].includes(code))
      return { msg: "Rain expected. Avoid pesticide/fertilizer spraying today.", icon: <WiRain className="text-lg" />, color: "bg-blue-50 text-blue-700 border-blue-200" };
    if (temp > 38)
      return { msg: "Very hot! Irrigate crops early morning or evening.", icon: <WiThermometer className="text-lg" />, color: "bg-orange-50 text-orange-700 border-orange-200" };
    if (humidity > 80)
      return { msg: "High humidity. Watch for fungal diseases on crops.", icon: <WiHumidity className="text-lg" />, color: "bg-yellow-50 text-yellow-700 border-yellow-200" };
    if (code === 0 && temp >= 20 && temp <= 32)
      return { msg: "Perfect weather for farming! Great day for field work.", icon: <FiCheck className="text-lg" />, color: "bg-leaf-50 text-leaf-700 border-leaf-200" };
    return { msg: "Moderate conditions. Monitor your crops regularly.", icon: <WiDaySunny className="text-lg" />, color: "bg-earth-50 text-earth-700 border-earth-200" };
  };

  // Fetch weather from Open-Meteo (FREE, no API key!)
  const fetchWeather = async (lat, lon) => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,apparent_temperature&daily=temperature_2m_max,temperature_2m_min,weather_code,precipitation_sum&timezone=Asia/Kolkata&forecast_days=5`
      );
      const data = await res.json();
      setWeather(data);
    } catch {
      setError(true);
    }
    setLoading(false);
  };

  // Get user's location
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude });
          setCity("Your Location");
        },
        () => fetchWeather(coords.lat, coords.lon)
      );
    }
  };

  useEffect(() => {
    fetchWeather(coords.lat, coords.lon);
  }, [coords]);

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  if (loading) return (
    <div className="bg-white rounded-3xl shadow-xl border border-earth-100 p-8 text-center">
      <div className="text-4xl mb-3 animate-bounce"><WiDayCloudy className="mx-auto" /></div>
      <p className="text-earth-500 font-semibold">Fetching weather data...</p>
    </div>
  );

  if (error) return (
    <div className="bg-white rounded-3xl shadow-xl border border-earth-100 p-8 text-center">
      <div className="text-4xl mb-3"><FiAlertTriangle className="mx-auto" /></div>
      <p className="text-earth-500 font-semibold">Could not load weather.</p>
      <button
        onClick={() => fetchWeather(coords.lat, coords.lon)}
        className="mt-3 px-4 py-2 bg-leaf-500 text-white rounded-full text-sm font-bold hover:bg-leaf-400 transition-all"
      >
        Retry
      </button>
    </div>
  );

  const current  = weather?.current;
  const daily    = weather?.daily;
  const wInfo    = weatherInfo(current?.weather_code);
  const advisory = getCropAdvisory(
    current?.weather_code,
    current?.temperature_2m,
    current?.relative_humidity_2m
  );

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-earth-100 overflow-hidden">

      {/* ── Header ── */}
      <div
        className="p-6 text-white relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0e5a20, #3f3018)" }}
      >
        <div className="absolute top-2 right-4 text-6xl opacity-20 flex">{wInfo.icon}</div>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-widest text-white/60 flex items-center gap-1">
                <FiMapPin className="text-sm" /> {city}
              </span>
              <button
                onClick={getLocation}
                className="text-xs bg-white/20 hover:bg-white/30 px-2 py-0.5 rounded-full font-semibold transition-all"
              >
                Use My Location
              </button>
            </div>
            <div className="text-6xl font-black leading-none">
              {Math.round(current?.temperature_2m)}°C
            </div>
            <div className="text-white/80 text-sm mt-1 font-semibold flex items-center gap-2">
              {wInfo.icon} {wInfo.label}
            </div>
            <div className="text-white/60 text-xs mt-1">
              Feels like {Math.round(current?.apparent_temperature)}°C
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-2 text-right">
            <div className="bg-white/10 rounded-2xl px-4 py-2">
              <div className="text-white/60 text-xs flex items-center gap-1"><WiHumidity className="text-sm" />Humidity</div>
              <div className="text-white font-bold">{current?.relative_humidity_2m}%</div>
            </div>
            <div className="bg-white/10 rounded-2xl px-4 py-2">
              <div className="text-white/60 text-xs flex items-center gap-1"><FiWind className="text-sm" />Wind</div>
              <div className="text-white font-bold">{current?.wind_speed_10m} km/h</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Crop Advisory ── */}
      <div className={`mx-4 mt-4 px-4 py-3 rounded-2xl border text-sm font-semibold ${advisory.color} flex items-center gap-2`}>
        {advisory.icon}
        {advisory.msg}
      </div>

      {/* ── 5-Day Forecast ── */}
      <div className="p-4">
        <p className="text-xs font-bold text-earth-400 uppercase tracking-widest mb-3">
          5-Day Forecast
        </p>
        <div className="grid grid-cols-5 gap-2">
          {daily?.time?.slice(0, 5).map((date, i) => {
            const d    = new Date(date);
            const info = weatherInfo(daily.weather_code[i]);
            return (
              <div
                key={date}
                className="flex flex-col items-center p-2 rounded-2xl bg-earth-50 hover:bg-earth-100 transition-all"
              >
                <div className="text-xs font-bold text-earth-500">
                  {i === 0 ? "Today" : days[d.getDay()]}
                </div>
                <div className="text-3xl my-1 flex justify-center">{info.icon}</div>
                <div className="text-xs font-bold text-earth-800">
                  {Math.round(daily.temperature_2m_max[i])}°
                </div>
                <div className="text-xs text-earth-400">
                  {Math.round(daily.temperature_2m_min[i])}°
                </div>
                {daily.precipitation_sum[i] > 0 && (
                  <div className="text-xs text-blue-500 font-semibold mt-0.5 flex items-center gap-1">
                    <FiDroplet className="text-xs" />{daily.precipitation_sum[i]}mm
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 pb-4 text-center">
        <p className="text-xs text-earth-300">
          Powered by Open-Meteo • Updated just now
        </p>
      </div>
    </div>
  );
};

export default WeatherWidget;