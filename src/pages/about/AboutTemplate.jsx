import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle,
  Sparkles,
  Users,
  MessageCircle,
  Store,
} from "lucide-react";

const AboutTemplate = ({ data }) => {
  const MainIcon = data.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <section className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-green-100 shadow-sm text-green-700 text-xs font-black uppercase tracking-widest mb-5">
              <MainIcon className="w-4 h-4" />
              {data.badge}
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-gray-950 leading-tight tracking-tight mb-5">
              {data.title}
            </h1>

            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl">
              {data.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-black shadow-lg shadow-green-200 transition"
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-white border border-green-100 text-green-700 font-black hover:bg-green-50 transition shadow-sm"
              >
                Contact Us
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[2rem] overflow-hidden shadow-2xl border border-white">
              <img
  src={data.image}
  alt={data.title}
  loading="lazy"
  referrerPolicy="no-referrer"
  onError={(e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src =
      "https://images.pexels.com/photos/3912519/pexels-photo-3912519.jpeg?auto=compress&cs=tinysrgb&w=1400&h=900&fit=crop";
  }}
  className="w-full h-[440px] object-cover"
/>
            </div>

            <div
              className={`absolute -bottom-7 left-6 right-6 rounded-3xl bg-gradient-to-br ${data.theme} p-6 text-white shadow-xl`}
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center">
                  <Sparkles className="w-7 h-7" />
                </div>

                <div>
                  <p className="text-white/70 text-sm font-semibold">
                    AgriConnect Platform
                  </p>
                  <h3 className="text-xl font-black">
                    Grow • Connect • Prosper
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-20">
          {data.stats.map((item) => (
            <div
              key={item.label}
              className="bg-white rounded-3xl p-6 shadow-lg border border-green-100"
            >
              <p className="text-3xl font-black text-green-700">{item.value}</p>
              <p className="text-gray-500 text-sm font-semibold mt-1">
                {item.label}
              </p>
            </div>
          ))}
        </section>

        <section className="mt-14">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <p className="text-green-600 text-xs font-black uppercase tracking-[0.25em] mb-3">
              Key Features
            </p>

            <h2 className="text-3xl md:text-5xl font-black text-gray-950">
              Professional Agriculture Solutions
            </h2>

            <p className="text-gray-500 mt-4 leading-relaxed">
              Every page explains how AgriConnect supports users with practical farming,
              market, expert, and technology-based solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {data.features.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group bg-white rounded-3xl p-7 shadow-lg border border-green-100 hover:-translate-y-1 hover:shadow-2xl transition"
                >
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${data.theme} text-white flex items-center justify-center mb-5 group-hover:scale-105 transition`}
                  >
                    <Icon className="w-8 h-8" />
                  </div>

                  <h3 className="text-xl font-black text-gray-950 mb-3">
                    {item.title}
                  </h3>

                  <p className="text-gray-500 leading-relaxed">{item.text}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-14 grid lg:grid-cols-[0.9fr_1.1fr] gap-8 items-start">
          <div className="bg-gray-950 rounded-[2rem] p-8 text-white sticky top-28">
            <p className="text-green-300 text-xs font-black uppercase tracking-[0.25em] mb-4">
              Platform Highlights
            </p>

            <h2 className="text-3xl font-black mb-6">
              Built for modern agriculture
            </h2>

            <div className="space-y-4">
              {[
                "Role-based dashboards",
                "Crop problem posting",
                "AI and smart farming tools",
                "Marketplace crop listings",
                "Expert advisory support",
              ].map((point) => (
                <div key={point} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-gray-200 font-semibold">{point}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {data.sections.map((section, index) => (
              <div
                key={section.title}
                className="bg-white rounded-3xl p-8 shadow-lg border border-green-100"
              >
                <div className="w-12 h-12 rounded-2xl bg-green-100 text-green-700 flex items-center justify-center font-black mb-5">
                  {index + 1}
                </div>

                <h3 className="text-2xl font-black text-gray-950 mb-3">
                  {section.title}
                </h3>

                <p className="text-gray-600 leading-relaxed text-lg">
                  {section.text}
                </p>
              </div>
            ))}

            <div className="grid md:grid-cols-3 gap-4">
              <Link
                to="/posts"
                className="bg-white rounded-3xl p-6 border border-green-100 shadow hover:shadow-lg transition"
              >
                <MessageCircle className="w-8 h-8 text-green-600 mb-3" />
                <h4 className="font-black text-gray-900">Community</h4>
                <p className="text-sm text-gray-500 mt-1">Ask and answer posts</p>
              </Link>

              <Link
                to="/marketplace"
                className="bg-white rounded-3xl p-6 border border-green-100 shadow hover:shadow-lg transition"
              >
                <Store className="w-8 h-8 text-green-600 mb-3" />
                <h4 className="font-black text-gray-900">Marketplace</h4>
                <p className="text-sm text-gray-500 mt-1">Buy and sell crops</p>
              </Link>

              <Link
                to="/ai-crop-doctor"
                className="bg-white rounded-3xl p-6 border border-green-100 shadow hover:shadow-lg transition"
              >
                <Users className="w-8 h-8 text-green-600 mb-3" />
                <h4 className="font-black text-gray-900">Smart Tools</h4>
                <p className="text-sm text-gray-500 mt-1">Use AI crop tools</p>
              </Link>
            </div>
          </div>
        </section>

        <section
          className={`mt-14 rounded-[2rem] bg-gradient-to-br ${data.theme} p-8 md:p-12 text-white shadow-2xl relative overflow-hidden`}
        >
          <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-white/10"></div>

          <div className="relative grid md:grid-cols-[1fr_auto] gap-6 items-center">
            <div>
              <p className="text-white/70 text-xs font-black uppercase tracking-[0.25em] mb-3">
                Join AgriConnect
              </p>

              <h2 className="text-3xl md:text-5xl font-black mb-3">
                Start your smart farming journey today
              </h2>

              <p className="text-white/80 max-w-2xl">
                Connect with farmers, buyers, and agronomists while using smart tools
                to improve farming decisions.
              </p>
            </div>

            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-white text-green-700 font-black hover:bg-green-50 transition shadow-lg"
            >
              Join Now
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutTemplate;
