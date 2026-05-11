import React from "react";
import { Link } from "react-router-dom";
import { FiPhone } from "react-icons/fi";
import gogLogo from "../assets/gog-logo.png";

const aboutFarmImage =
  "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1200&q=80";

const AboutUs = () => {
  const roleCards = [
    {
      icon: "👨‍🌾",
      title: "What Farmers Do",
      image:
        "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80",
      text: "Farmers can post crop problems, ask questions, check farming guidance, view market information, and connect directly with buyers and experts.",
    },
    {
      icon: "🌱",
      title: "What Agronomists Do",
      image:
        "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80",
      text: "Agronomists help farmers by giving expert advice about crop disease, soil health, fertilizers, irrigation, pest control, and better farming methods.",
    },
    {
      icon: "🛒",
      title: "What Buyers Do",
      image:
        "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=800&q=80",
      text: "Buyers can explore available crops, connect directly with farmers, discuss crop quality and pricing, and purchase fresh produce without middlemen.",
    },
  ];

  return (
    <div className="min-h-screen bg-earth-50 pt-28 pb-12">
      <div className="max-w-5xl mx-auto px-6">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-leaf-600 text-white p-10">
            <div className="grid md:grid-cols-[1fr_320px] gap-8 items-center">
              {/* Left Side Text */}
              <div className="text-left">
                <p className="inline-block px-4 py-1 rounded-full bg-white/15 border border-white/20 text-xs font-bold uppercase tracking-wider mb-4">
                  Powered by Geeks of Gurukul
                </p>

                <h1 className="font-display font-bold text-4xl">
                  About AgriConnect
                </h1>

                <p className="mt-3 text-earth-100 text-sm max-w-2xl leading-relaxed">
                  AgriConnect is a farmer-first digital platform created to help
                  farmers post agricultural problems, connect with experts,
                  explore market guidance, and make smarter farm decisions.
                </p>

                <p className="mt-4 text-earth-100 text-sm max-w-2xl leading-relaxed">
                  This website is made by <strong>Geeks of Gurukul</strong>, a
                  modern education and technology platform focused on AI/ML,
                  Web3, Robotics, Drone Technology, AR/VR, and future-ready
                  technical programs.
                </p>
              </div>

              {/* Right Side Image */}
              <div className="flex justify-center md:justify-end">
                <div className="relative w-full max-w-[320px] h-60 rounded-3xl overflow-hidden bg-white p-2 shadow-2xl border border-white/30">
                  <img
                    src={aboutFarmImage}
                    alt="Farmer working in agricultural field"
                    className="w-full h-full object-cover rounded-2xl"
                  />

                  <div className="absolute bottom-4 left-4 flex items-center gap-3 bg-white/90 backdrop-blur-md rounded-2xl px-3 py-2 shadow-lg">
                    <img
                      src={gogLogo}
                      alt="Geeks of Gurukul Logo"
                      className="w-9 h-9 object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                    <div>
                      <p className="text-earth-900 text-xs font-bold">
                        AgriConnect
                      </p>
                      <p className="text-earth-500 text-[10px]">
                        Smart Farming Platform
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-10 space-y-8">
            {/* Who We Are */}
            <section className="space-y-4">
              <h2 className="font-display text-2xl text-earth-900 font-bold">
                Who We Are
              </h2>

              <p className="text-earth-600 leading-relaxed">
                AgriConnect is built to empower small farmers by giving them a
                trusted place to share crop issues, receive agronomist advice,
                and connect with the right farming support network.
              </p>

              <p className="text-earth-600 leading-relaxed">
                This website is made by <strong>Geeks of Gurukul</strong>,
                India's modern education and technology platform focused on
                AI/ML, Web3, Robotics, Drone Technology, AR/VR, and future-ready
                technical programs. Through this platform, Geeks of Gurukul aims
                to bring technology-driven solutions closer to farmers and rural
                communities.
              </p>
            </section>

            {/* Farmer, Agronomist, Buyer Section */}
            <section>
              <div className="text-center mb-8">
                <p className="inline-block px-4 py-1 rounded-full bg-leaf-50 text-leaf-600 border border-leaf-100 text-xs font-bold uppercase tracking-wider mb-3">
                  Platform Users
                </p>

                <h2 className="font-display text-3xl text-earth-900 font-bold">
                  Farmers, Agronomists and Buyers
                </h2>

                <p className="text-earth-600 text-sm mt-3 max-w-2xl mx-auto leading-relaxed">
                  AgriConnect brings all important farming users together on one
                  simple and useful digital platform.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {roleCards.map((item) => (
                  <div
                    key={item.title}
                    className="bg-white rounded-3xl border border-leaf-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                  >
                    <div className="relative h-44">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent"></div>

                      <div className="absolute bottom-4 left-4 w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-3xl shadow-lg">
                        {item.icon}
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="font-display font-bold text-xl text-earth-900 mb-3">
                        {item.title}
                      </h3>

                      <p className="text-earth-600 text-sm leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Made by Geeks of Gurukul */}
            <section className="bg-gradient-to-br from-green-50 to-emerald-50 border border-leaf-100 rounded-3xl p-8">
              <div className="flex flex-col md:flex-row gap-6 md:items-center">
                <div className="text-5xl">🚀</div>

                <div>
                  <h3 className="font-display font-bold text-2xl text-earth-900 mb-3">
                    Made by Geeks of Gurukul
                  </h3>

                  <p className="text-earth-600 leading-relaxed">
                    Geeks of Gurukul is known for delivering futuristic
                    education and technology programs in AI, ML, Web3, Robotics,
                    Drone Technology, AR/VR, and more. AgriConnect reflects the
                    same mission — using technology to solve real-world problems
                    and create impact.
                  </p>

                  <div className="grid sm:grid-cols-3 gap-3 mt-5">
                    <div className="rounded-2xl bg-white border border-leaf-100 p-4">
                      <p className="text-2xl font-black text-leaf-600">1M+</p>
                      <p className="text-xs text-earth-500 font-semibold">
                        Learners Impacted
                      </p>
                    </div>

                    <div className="rounded-2xl bg-white border border-leaf-100 p-4">
                      <p className="text-2xl font-black text-leaf-600">250+</p>
                      <p className="text-xs text-earth-500 font-semibold">
                        IIT Mentors
                      </p>
                    </div>

                    <div className="rounded-2xl bg-white border border-leaf-100 p-4">
                      <p className="text-2xl font-black text-leaf-600">80+</p>
                      <p className="text-xs text-earth-500 font-semibold">
                        Institutes
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Post Your Problem",
                  text: "Share your crop or farm challenge and get guidance from experts.",
                },
                {
                  title: "Connect to Agronomists",
                  text: "Talk to experts who understand your soil, crop, climate, and farming needs.",
                },
                {
                  title: "Grow with Confidence",
                  text: "Use real insights, community advice, and technology to improve your yield.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="p-6 bg-earth-50 rounded-3xl border border-earth-100"
                >
                  <h3 className="font-semibold text-earth-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-earth-600 text-sm leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </section>

            {/* Mission Section */}
            <section className="bg-leaf-50 border border-leaf-100 rounded-3xl p-8">
              <h3 className="font-display font-bold text-2xl text-earth-900 mb-3">
                Our Mission
              </h3>

              <p className="text-earth-600 leading-relaxed">
                We want every farmer to feel supported and connected.
                AgriConnect brings expert help, market access, and practical
                digital tools to farming communities across India. With Geeks of
                Gurukul's technology vision, this platform is designed to make
                agricultural support more accessible, modern, and useful.
              </p>
            </section>

            {/* About GOG */}
            <section className="bg-earth-900 text-white rounded-3xl p-8">
              <h3 className="font-display font-bold text-2xl mb-3">
                About Geeks of Gurukul
              </h3>

              <p className="text-earth-100 leading-relaxed">
                Geeks of Gurukul is a futuristic education and technology
                ecosystem offering programs in AI/ML, Web3, Medical Technology,
                Drone Technology, Robotics, AR/VR, and other emerging fields.
                The organization works with mentors, institutes, universities,
                and innovation communities to build real-world technical skills.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mt-6">
                <div className="rounded-2xl bg-white/10 border border-white/10 p-4">
                  <p className="font-bold">Technical Innovation</p>
                  <p className="text-earth-100 text-sm mt-1">
                    Building future-ready digital solutions for education and
                    society.
                  </p>
                </div>

                <div className="rounded-2xl bg-white/10 border border-white/10 p-4">
                  <p className="font-bold">Farmer Empowerment</p>
                  <p className="text-earth-100 text-sm mt-1">
                    Bringing expert guidance and digital access to farming
                    communities.
                  </p>
                </div>
              </div>
            </section>

            {/* Contact Button */}
            <div className="text-center">
              <Link
                to="/contact"
                className="inline-flex px-8 py-4 bg-leaf-500 text-white font-bold rounded-2xl hover:bg-leaf-400 transition-all duration-200 items-center gap-2 justify-center"
              >
                <FiPhone /> Contact Geeks of Gurukul
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;