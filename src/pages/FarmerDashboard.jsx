import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Wheat,
  ShoppingBag,
  Megaphone,
  MessageCircle,
  Camera,
  Store,
  TrendingUp,
  CloudSun,
  Bot,
  Plus,
  User,
  MapPin,
  Phone,
  ArrowRight,
} from "lucide-react";

const FarmerDashboard = ({ user }) => {
  const [myCrops, setMyCrops] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("farmerCropListings") || "[]");
    const ownCrops = saved.filter(
      (crop) =>
        crop.farmerEmail === user?.email ||
        crop.farmer === user?.name ||
        crop.source === "farmer-upload"
    );

    setMyCrops(ownCrops);
  }, [user]);

  const stats = [
    {
      title: "Uploaded Crops",
      value: myCrops.length,
      icon: ShoppingBag,
      color: "from-green-500 to-emerald-700",
    },
    {
      title: "Active Posts",
      value: "12",
      icon: MessageCircle,
      color: "from-blue-500 to-indigo-700",
    },
    {
      title: "Market Reach",
      value: "28K",
      icon: TrendingUp,
      color: "from-orange-500 to-amber-700",
    },
    {
      title: "AI Checks",
      value: "5",
      icon: Bot,
      color: "from-purple-500 to-violet-700",
    },
  ];

  const actions = [
    {
      title: "Upload Crop for Sale",
      desc: "Add crop photo, price, quantity, quality and location to show it in marketplace.",
      icon: Store,
      path: "/farmer/upload-crop",
      color: "from-green-600 to-emerald-800",
      button: "Upload Crop",
    },
    {
      title: "Post Crop Problem",
      desc: "Upload crop issue, disease photo, pest problem or farming question for experts.",
      icon: Camera,
      path: "/post-problem",
      color: "from-red-500 to-orange-700",
      button: "Create Post",
    },
    {
      title: "View Community Posts",
      desc: "Check farmer posts, expert replies, crop problems and farming discussions.",
      icon: MessageCircle,
      path: "/posts",
      color: "from-blue-600 to-indigo-800",
      button: "View Posts",
    },
    {
      title: "Open Marketplace",
      desc: "See all crops listed by farmers and check how your crop listing appears to buyers.",
      icon: ShoppingBag,
      path: "/marketplace",
      color: "from-yellow-500 to-orange-700",
      button: "Marketplace",
    },
    {
      title: "AI Crop Doctor",
      desc: "Upload leaf or crop image and get AI-style disease diagnosis and treatment plan.",
      icon: Bot,
      path: "/ai-crop-doctor",
      color: "from-purple-600 to-violet-800",
      button: "Scan Crop",
    },
    {
      title: "Weather Updates",
      desc: "Check weather alerts and irrigation-friendly farming weather guidance.",
      icon: CloudSun,
      path: "/services/weather",
      color: "from-sky-500 to-cyan-700",
      button: "Check Weather",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-green-800 via-emerald-800 to-green-950 text-white p-8 md:p-12 shadow-2xl">
          <Wheat className="absolute -right-10 -top-10 w-48 h-48 text-white/10 rotate-12" />

          <div className="relative z-10 grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 border border-white/20 text-green-100 text-xs font-bold uppercase tracking-widest mb-5">
                <User className="w-4 h-4" />
                Farmer Dashboard
              </div>

              <h1 className="text-3xl md:text-5xl font-black leading-tight mb-4">
                Welcome back, {user?.name || "Farmer"}
              </h1>

              <p className="text-green-100 text-lg max-w-2xl leading-relaxed">
                Manage your crop listings, post farming problems, connect with experts,
                check marketplace visibility and use smart farming tools from one dashboard.
              </p>

              <div className="flex flex-wrap gap-4 mt-6">
                <Link
                  to="/farmer/upload-crop"
                  className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-white text-green-800 font-black hover:bg-green-50 transition shadow-lg"
                >
                  <Plus className="w-5 h-5" />
                  Upload Crop for Sale
                </Link>

                <Link
                  to="/post-problem"
                  className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-green-600/70 border border-white/20 text-white font-black hover:bg-green-600 transition"
                >
                  <Megaphone className="w-5 h-5" />
                  Post Problem
                </Link>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-3xl p-6 border border-white/20">
              <h3 className="font-black text-xl mb-4">Farmer Profile</h3>

              <div className="space-y-4 text-green-50">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-green-200" />
                  <span>{user?.name || "Farmer"}</span>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-green-200" />
                  <span>{user?.location || "Location not added"}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-green-200" />
                  <span>{user?.phone || "Phone not added"}</span>
                </div>

                <div className="pt-4 border-t border-white/20">
                  <p className="text-sm text-green-200">Role</p>
                  <p className="font-black capitalize">{user?.role || "farmer"}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="bg-white rounded-3xl p-6 shadow-lg border border-green-100"
              >
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center mb-4`}
                >
                  <Icon className="w-7 h-7" />
                </div>

                <p className="text-gray-500 text-sm font-semibold">{item.title}</p>
                <h3 className="text-3xl font-black text-gray-900 mt-1">
                  {item.value}
                </h3>
              </div>
            );
          })}
        </section>

        <section className="mt-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-green-600 text-xs font-black uppercase tracking-widest">
                Farmer Actions
              </p>
              <h2 className="text-3xl font-black text-gray-900">
                What do you want to do today?
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {actions.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  to={item.path}
                  key={item.title}
                  className="group bg-white rounded-3xl p-6 shadow-lg border border-green-100 hover:-translate-y-1 hover:shadow-2xl transition"
                >
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center mb-5`}
                  >
                    <Icon className="w-8 h-8" />
                  </div>

                  <h3 className="text-xl font-black text-gray-900 mb-2">
                    {item.title}
                  </h3>

                  <p className="text-gray-500 leading-relaxed text-sm mb-5">
                    {item.desc}
                  </p>

                  <div className="inline-flex items-center gap-2 text-green-700 font-black">
                    {item.button}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mt-10 bg-white rounded-3xl p-6 md:p-8 shadow-lg border border-green-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <p className="text-green-600 text-xs font-black uppercase tracking-widest">
                My Crop Listings
              </p>
              <h2 className="text-2xl font-black text-gray-900">
                Recently Uploaded Crops
              </h2>
            </div>

            <Link
              to="/farmer/upload-crop"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700"
            >
              <Plus className="w-4 h-4" />
              Add New Crop
            </Link>
          </div>

          {myCrops.length === 0 ? (
            <div className="text-center py-12 bg-green-50 rounded-3xl border border-green-100">
              <ShoppingBag className="w-14 h-14 text-green-400 mx-auto mb-3" />
              <h3 className="font-black text-gray-900 text-xl">
                No crops uploaded yet
              </h3>
              <p className="text-gray-500 mt-2">
                Upload your first crop listing and it will appear in marketplace.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-5">
              {myCrops.slice(0, 3).map((crop) => (
                <div
                  key={crop.id}
                  className="rounded-3xl overflow-hidden border border-green-100 bg-green-50"
                >
                  <img
                    src={crop.image}
                    alt={crop.name}
                    className="h-44 w-full object-cover"
                  />

                  <div className="p-5">
                    <h3 className="font-black text-gray-900">{crop.name}</h3>
                    <p className="text-green-700 font-black text-xl mt-1">
                      {crop.price}
                    </p>
                    <p className="text-gray-500 text-sm mt-2">
                      {crop.quantity} • {crop.quality}
                    </p>
                    <p className="text-gray-500 text-sm">{crop.region}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default FarmerDashboard;