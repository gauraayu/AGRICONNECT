import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import gogLogo from "../assets/gog-logo.png";
const ContactUs = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!form.name || !form.email || !form.subject || !form.message) {
      setError("Please fill all required fields.");
      setLoading(false);
      return;
    }

    try {
      setTimeout(() => {
        setSuccess(
          "Message sent successfully! Geeks of Gurukul team will get back to you soon."
        );
        setForm({ name: "", email: "", subject: "", message: "" });
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-earth-50 pt-28 pb-12">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-8">
          <p className="inline-block px-4 py-1 rounded-full bg-leaf-100 text-leaf-700 text-xs font-black uppercase tracking-wider mb-3">
            Website by Geeks of Gurukul
          </p>

          <h1 className="font-display font-bold text-4xl text-earth-900">
            Contact Us
          </h1>

          <p className="text-earth-500 text-sm mt-3 max-w-2xl mx-auto leading-relaxed">
            AgriConnect is made by <strong>Geeks of Gurukul</strong>. For platform
            support, collaboration, program queries, or technical assistance, you can
            connect with the Geeks of Gurukul team.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">📞</div>

              <h2 className="font-display font-bold text-2xl text-earth-800">
                Get In Touch
              </h2>

              <p className="text-earth-500 text-sm mt-2">
                Contact Geeks of Gurukul for AgriConnect support
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-leaf-100 flex items-center justify-center text-leaf-600">
                  🏢
                </div>
                <div>
                  <div className="font-semibold text-earth-800">
                    Developed By
                  </div>
                  <div className="text-earth-500 text-sm">
                    Geeks of Gurukul
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-leaf-100 flex items-center justify-center text-leaf-600">
                  📧
                </div>
                <div>
                  <div className="font-semibold text-earth-800">Email</div>
                  <a
                    href="mailto:admin@geeksofgurukul.com"
                    className="text-leaf-600 hover:text-leaf-500 text-sm font-semibold"
                  >
                    admin@geeksofgurukul.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-leaf-100 flex items-center justify-center text-leaf-600">
                  📱
                </div>
                <div>
                  <div className="font-semibold text-earth-800">Phone</div>
                  <a
                    href="tel:+919109976089"
                    className="text-leaf-600 hover:text-leaf-500 text-sm font-semibold"
                  >
                    +91 9109976089
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-leaf-100 flex items-center justify-center text-leaf-600">
                  🎓
                </div>
                <div>
                  <div className="font-semibold text-earth-800">
                    Organization
                  </div>
                  <div className="text-earth-500 text-sm">
                    Skillscan Edtech India Private Ltd.
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-leaf-100 flex items-center justify-center text-leaf-600">
                  🌐
                </div>
                <div>
                  <div className="font-semibold text-earth-800">Website</div>
                  <a
                    href="https://geeksofgurukul.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-leaf-600 hover:text-leaf-500 text-sm font-semibold"
                  >
                    geeksofgurukul.com
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-gradient-to-br from-green-50 to-emerald-50 border border-leaf-100 rounded-3xl p-6">
              <h3 className="font-display font-bold text-xl text-earth-900 mb-2">
                About Geeks of Gurukul
              </h3>

              <p className="text-earth-600 text-sm leading-relaxed">
                Geeks of Gurukul is a modern education and technology platform
                delivering programs in AI/ML, Web3, AR/VR, Robotics, Drone
                Technology, and other future-ready domains.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="p-8">
              <h3 className="font-display font-bold text-xl text-earth-800 mb-2">
                Send a Message
              </h3>

              <p className="text-earth-500 text-sm mb-6">
                Your message will be treated as a query for the Geeks of Gurukul
                team regarding AgriConnect.
              </p>

              {error && (
                <div className="mb-6 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-semibold">
                  ❌ {error}
                </div>
              )}

              {success && (
                <div className="mb-6 px-4 py-3 rounded-xl bg-leaf-50 border border-leaf-200 text-leaf-700 text-sm font-semibold">
                  ✅ {success}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-bold text-earth-600 uppercase tracking-wider mb-2 block">
                      Name *
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="w-full px-4 py-3 rounded-xl border border-earth-200 text-earth-800 text-sm focus:outline-none focus:border-leaf-500 focus:ring-2 focus:ring-leaf-500/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-bold text-earth-600 uppercase tracking-wider mb-2 block">
                      Email *
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 rounded-xl border border-earth-200 text-earth-800 text-sm focus:outline-none focus:border-leaf-500 focus:ring-2 focus:ring-leaf-500/20 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-bold text-earth-600 uppercase tracking-wider mb-2 block">
                    Subject *
                  </label>

                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="What's this about?"
                    className="w-full px-4 py-3 rounded-xl border border-earth-200 text-earth-800 text-sm focus:outline-none focus:border-leaf-500 focus:ring-2 focus:ring-leaf-500/20 transition-all"
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-earth-600 uppercase tracking-wider mb-2 block">
                    Message *
                  </label>

                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us how the Geeks of Gurukul team can help you..."
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-earth-200 text-earth-800 text-sm focus:outline-none focus:border-leaf-500 focus:ring-2 focus:ring-leaf-500/20 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-leaf-500 hover:bg-leaf-400 text-white font-bold text-lg rounded-xl shadow-lg shadow-leaf-500/30 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "Sending..." : "Send Message 📤"}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate("/")}
            className="text-leaf-600 hover:text-leaf-500 font-semibold text-sm"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;