import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API = "http://localhost:5000";

const roles = [
  { value: "farmer",     label: "Farmer",     icon: "👨‍🌾", desc: "Grow & sell crops" },
  { value: "buyer",      label: "Buyer",       icon: "🛒", desc: "Buy fresh produce" },
  { value: "agronomist", label: "Agronomist",  icon: "🔬", desc: "Provide expert advice" },
  { value: "vendor",     label: "Vendor",      icon: "🏪", desc: "Supply & distribute" },
];

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState("farmer");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Password validation function
  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    
    if (!hasUpperCase) return "Password must contain at least one uppercase letter.";
    if (!hasLowerCase) return "Password must contain at least one lowercase letter.";
    if (!hasNumbers) return "Password must contain at least one number.";
    if (!hasSpecialChar) return "Password must contain at least one special character.";
    if (password.length < 8) return "Password must be at least 8 characters long.";
    
    return null; // Valid password
  };

  // ── REGISTER ──
  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password) {
      setError("Please fill all required fields.");
      return;
    }

    // Validate password
    const passwordError = validatePassword(form.password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    try {
      // Check if email already exists
      const { data: existing } = await axios.get(
        `${API}/users?email=${form.email}`
      );
      if (existing.length > 0) {
        setError("Email already registered. Please login.");
        return;
      }

      // Save new user
      await axios.post(`${API}/users`, {
        name: form.name,
        email: form.email,
        password: form.password,
        phone: form.phone,
        role: role,
        createdAt: new Date().toISOString(),
      });

      setSuccess(`Account created successfully as ${role}! Please login.`);
      setError("");
      setForm({ name: "", email: "", password: "", phone: "" });
      setTimeout(() => {
        setIsLogin(true);
        setSuccess("");
      }, 2000);
    } catch (err) {
      setError("Something went wrong. Is the server running?");
    }
  };

  // ── LOGIN ──
  const handleLogin = async () => {
    if (!form.email || !form.password) {
      setError("Please enter email and password.");
      return;
    }

    try {
      const { data: users } = await axios.get(
        `${API}/users?email=${form.email}&password=${form.password}`
      );

      if (users.length === 0) {
        setError("Invalid email or password.");
        return;
      }

      const user = users[0];
      localStorage.setItem("agriUser", JSON.stringify(user));
      setSuccess(`Welcome back, ${user.name}! 🌾`);
      setError("");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setError("Something went wrong. Is the server running?");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    setTimeout(() => {
      if (isLogin) handleLogin();
      else handleRegister();
      setLoading(false);
    }, 500);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #3f3018 0%, #0e5a20 60%, #3f3018 100%)",
      }}
    >
      {/* Background blobs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-leaf-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-earth-300/10 rounded-full blur-3xl" />
      <div className="absolute top-20 right-24 text-6xl opacity-20 animate-float">🌾</div>
      <div className="absolute bottom-24 left-16 text-5xl opacity-20 animate-float delay-300">🌿</div>

      <div className="relative z-10 w-full max-w-lg">
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden">

          {/* Top Bar */}
          <div className="bg-gradient-to-r from-earth-800 to-leaf-800 p-6 text-center">
            <Link to="/" className="inline-flex items-center gap-2 mb-3">
              <span className="text-2xl">🌾</span>
              <span className="font-display font-bold text-xl text-white">
                Agri<span className="text-leaf-400">Connect</span>
              </span>
            </Link>
            <h2 className="font-display font-bold text-2xl text-white">
              {isLogin ? "Welcome Back!" : "Join AgriConnect"}
            </h2>
            <p className="text-earth-200 text-sm mt-1">
              {isLogin
                ? "Login to your account"
                : "Create your free account today"}
            </p>
          </div>

          <div className="p-8">

            {/* Login / Register Toggle */}
            <div className="flex rounded-xl overflow-hidden border border-earth-200 mb-6">
              <button
                onClick={() => { setIsLogin(true); setError(""); setSuccess(""); }}
                className={`flex-1 py-2.5 text-sm font-bold transition-all ${
                  isLogin
                    ? "bg-leaf-500 text-white"
                    : "bg-white text-earth-500 hover:bg-earth-50"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => { setIsLogin(false); setError(""); setSuccess(""); }}
                className={`flex-1 py-2.5 text-sm font-bold transition-all ${
                  !isLogin
                    ? "bg-leaf-500 text-white"
                    : "bg-white text-earth-500 hover:bg-earth-50"
                }`}
              >
                Register
              </button>
            </div>

            {/* Role Selector */}
            <div className="mb-6">
              <p className="text-xs font-bold text-earth-400 uppercase tracking-widest mb-3">
                I am a...
              </p>
              <div className="grid grid-cols-2 gap-3">
                {roles.map(({ value, label, icon, desc }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setRole(value)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all ${
                      role === value
                        ? "border-leaf-500 bg-leaf-50 shadow-md"
                        : "border-earth-200 hover:border-earth-300 bg-white"
                    }`}
                  >
                    <span className="text-2xl">{icon}</span>
                    <div>
                      <div className={`text-sm font-bold ${role === value ? "text-leaf-700" : "text-earth-700"}`}>
                        {label}
                      </div>
                      <div className="text-xs text-earth-400">{desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Error / Success Messages */}
            {error && (
              <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-semibold">
                ❌ {error}
              </div>
            )}
            {success && (
              <div className="mb-4 px-4 py-3 rounded-xl bg-leaf-50 border border-leaf-200 text-leaf-700 text-sm font-semibold">
                ✅ {success}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {!isLogin && (
                <div>
                  <label className="text-xs font-bold text-earth-500 uppercase tracking-wider mb-1 block">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Ramesh Patel"
                    className="w-full px-4 py-3 rounded-xl border border-earth-200 text-earth-800 text-sm focus:outline-none focus:border-leaf-500 focus:ring-2 focus:ring-leaf-500/20 transition-all"
                  />
                </div>
              )}

              <div>
                <label className="text-xs font-bold text-earth-500 uppercase tracking-wider mb-1 block">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="farmer@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-earth-200 text-earth-800 text-sm focus:outline-none focus:border-leaf-500 focus:ring-2 focus:ring-leaf-500/20 transition-all"
                />
              </div>

              {!isLogin && (
                <div>
                  <label className="text-xs font-bold text-earth-500 uppercase tracking-wider mb-1 block">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 rounded-xl border border-earth-200 text-earth-800 text-sm focus:outline-none focus:border-leaf-500 focus:ring-2 focus:ring-leaf-500/20 transition-all"
                  />
                </div>
              )}

              <div>
                <label className="text-xs font-bold text-earth-500 uppercase tracking-wider mb-1 block">
                  Password *
                </label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl border border-earth-200 text-earth-800 text-sm focus:outline-none focus:border-leaf-500 focus:ring-2 focus:ring-leaf-500/20 transition-all"
                />
                {!isLogin && (
                  <p className="text-xs text-earth-400 mt-1">
                    Must contain uppercase, lowercase, number, and special character (min 8 chars)
                  </p>
                )}
              </div>

              {isLogin && (
                <div className="text-right -mt-2">
                  <a href="#" className="text-xs text-leaf-600 hover:text-leaf-500 font-semibold">
                    Forgot Password?
                  </a>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-leaf-500 hover:bg-leaf-400 text-white font-bold text-base rounded-xl shadow-lg shadow-leaf-500/30 hover:-translate-y-0.5 transition-all duration-200 mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading
                  ? "Please wait..."
                  : isLogin
                  ? "Login to Account 🌾"
                  : "Create Account 🌱"}
              </button>
            </form>

            <p className="text-center text-earth-400 text-sm mt-5">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => { setIsLogin(!isLogin); setError(""); setSuccess(""); }}
                className="text-leaf-600 font-bold hover:text-leaf-500 transition-colors"
              >
                {isLogin ? "Register here" : "Login here"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;