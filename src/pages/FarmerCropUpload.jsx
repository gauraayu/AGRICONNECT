import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Upload,
  ImagePlus,
  X,
  Wheat,
  MapPin,
  IndianRupee,
  Package,
  User,
  Phone,
  Calendar,
  FileText,
  CheckCircle,
  ShoppingBag,
} from "lucide-react";

const cropImages = {
  Wheat:
    "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=900&auto=format&fit=crop",
  Rice:
    "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=900&auto=format&fit=crop",
  Tomato:
    "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=900&auto=format&fit=crop",
  Potato:
    "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=900&auto=format&fit=crop",
  Onion:
    "https://images.unsplash.com/photo-1508747703725-719777637510?w=900&auto=format&fit=crop",
  Maize:
    "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=900&auto=format&fit=crop",
  Banana:
    "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=900&auto=format&fit=crop",
  Mango:
    "https://images.unsplash.com/photo-1553279768-865429fa0078?w=900&auto=format&fit=crop",
};

const FarmerCropUpload = () => {
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("agriUser");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const [preview, setPreview] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    name: "",
    category: "Vegetable",
    variety: "",
    price: "",
    quantity: "",
    quality: "Fresh",
    region: user?.location || "",
    farmer: user?.name || "",
    farmerEmail: user?.email || "",
    phone: user?.phone || "",
    harvestDate: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "name" && cropImages[value]) {
      setPreview(cropImages[value]);

      setForm((prev) => ({
        ...prev,
        image: cropImages[value],
      }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setPreview(reader.result);

      setForm((prev) => ({
        ...prev,
        image: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setPreview("");

    setForm((prev) => ({
      ...prev,
      image: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.price || !form.quantity || !form.region) {
      alert("Please fill crop name, price, quantity and location.");
      return;
    }

    const newCrop = {
      id: Date.now(),
      name: form.variety ? `${form.variety} ${form.name}` : form.name,
      category: form.category,
      price: `₹${form.price}/qt`,
      quantity: `${form.quantity} quintal`,
      quality: form.quality,
      region: form.region,
      farmer: form.farmer || user?.name || "Farmer",
      farmerEmail: user?.email || form.farmerEmail,
      phone: form.phone,
      image:
        form.image ||
        cropImages[form.name] ||
        "https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?w=900&auto=format&fit=crop",
      harvestDate: form.harvestDate,
      description: form.description,
      source: "farmer-upload",
      createdAt: new Date().toISOString(),
    };

    const oldCrops = JSON.parse(
      localStorage.getItem("farmerCropListings") || "[]"
    );

    localStorage.setItem(
      "farmerCropListings",
      JSON.stringify([newCrop, ...oldCrops])
    );

    setSuccess("Crop uploaded successfully. It will now appear in Marketplace.");

    setTimeout(() => {
      navigate("/marketplace");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-green-700 hover:text-green-800 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Farmer Dashboard
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-8 items-start">
          <div className="bg-white rounded-3xl shadow-xl border border-green-100 overflow-hidden">
            <div className="bg-gradient-to-br from-green-700 to-emerald-900 p-8 text-white relative overflow-hidden">
              <Wheat className="absolute -right-10 -top-10 w-44 h-44 text-white/10 rotate-12" />

              <div className="relative">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 border border-white/20 text-green-100 text-xs font-bold uppercase tracking-widest mb-4">
                  <ShoppingBag className="w-4 h-4" />
                  Farmer Crop Listing
                </div>

                <h1 className="text-3xl md:text-5xl font-black mb-3">
                  Upload Crop for Sale
                </h1>

                <p className="text-green-100 max-w-2xl">
                  Add crop details, quantity, price, quality, location and crop
                  photo. After submission, this crop will be shown in marketplace
                  for buyers.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 md:p-8">
              {success && (
                <div className="mb-6 flex items-center gap-3 rounded-2xl bg-green-50 border border-green-200 px-4 py-3 text-green-700 font-semibold">
                  <CheckCircle className="w-5 h-5" />
                  {success}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Crop Name
                  </label>
                  <select
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-green-500 bg-white"
                  >
                    <option value="">Select Crop</option>
                    <option>Wheat</option>
                    <option>Rice</option>
                    <option>Tomato</option>
                    <option>Potato</option>
                    <option>Onion</option>
                    <option>Maize</option>
                    <option>Banana</option>
                    <option>Mango</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Crop Category
                  </label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-green-500 bg-white"
                  >
                    <option>Vegetable</option>
                    <option>Fruit</option>
                    <option>Grain</option>
                    <option>Pulse</option>
                    <option>Oilseed</option>
                    <option>Cash Crop</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Variety / Crop Type
                  </label>
                  <input
                    name="variety"
                    value={form.variety}
                    onChange={handleChange}
                    placeholder="Example: Hybrid, Organic, Basmati"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Quality
                  </label>
                  <select
                    name="quality"
                    value={form.quality}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-green-500 bg-white"
                  >
                    <option>Fresh</option>
                    <option>Premium</option>
                    <option>Organic</option>
                    <option>A Grade</option>
                    <option>Export Quality</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <IndianRupee className="w-4 h-4 text-green-600" />
                    Price per Quintal
                  </label>
                  <input
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="Example: 2100"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-green-500"
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <Package className="w-4 h-4 text-green-600" />
                    Quantity in Quintal
                  </label>
                  <input
                    name="quantity"
                    value={form.quantity}
                    onChange={handleChange}
                    placeholder="Example: 50"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-green-500"
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-green-600" />
                    Location / Region
                  </label>
                  <input
                    name="region"
                    value={form.region}
                    onChange={handleChange}
                    placeholder="Example: Madhya Pradesh — Bhopal"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-green-500"
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-green-600" />
                    Harvest Date
                  </label>
                  <input
                    type="date"
                    name="harvestDate"
                    value={form.harvestDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-green-500"
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <User className="w-4 h-4 text-green-600" />
                    Farmer Name
                  </label>
                  <input
                    name="farmer"
                    value={form.farmer}
                    onChange={handleChange}
                    placeholder="Farmer name"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-green-500"
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-green-600" />
                    Contact Number
                  </label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Example: +91 9876543210"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-green-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-green-600" />
                    Crop Description
                  </label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Write details about crop freshness, storage, farming method, delivery availability..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-green-500 resize-none"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Upload Crop Photo
                </label>

                <label className="flex flex-col items-center justify-center min-h-48 rounded-3xl border-2 border-dashed border-green-300 bg-green-50/60 hover:bg-green-50 cursor-pointer transition">
                  <ImagePlus className="w-10 h-10 text-green-600 mb-3" />
                  <p className="font-bold text-gray-800">
                    Click to upload crop image
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    JPG, PNG, JPEG supported
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-black shadow-lg shadow-green-200 transition"
                >
                  <Upload className="w-5 h-5" />
                  Upload Crop to Marketplace
                </button>

                <Link
                  to="/marketplace"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-gray-900 hover:bg-black text-white font-black transition"
                >
                  View Marketplace
                </Link>
              </div>
            </form>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-xl border border-green-100 p-5">
              <h2 className="text-xl font-black text-gray-900 mb-4">
                Crop Preview
              </h2>

              <div className="rounded-3xl overflow-hidden bg-gray-100 min-h-72 relative">
                {preview ? (
                  <>
                    <img
                      src={preview}
                      alt="Crop Preview"
                      className="w-full h-72 object-cover"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white shadow flex items-center justify-center text-red-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </>
                ) : (
                  <div className="h-72 flex flex-col items-center justify-center text-gray-400">
                    <ImagePlus className="w-14 h-14 mb-3" />
                    <p className="font-semibold">Image preview will appear here</p>
                  </div>
                )}
              </div>

              <div className="mt-5 rounded-2xl bg-green-50 border border-green-100 p-5">
                <h3 className="font-black text-gray-900 text-lg">
                  {form.variety || form.name
                    ? `${form.variety} ${form.name}`.trim()
                    : "Crop Name"}
                </h3>

                <p className="text-green-600 font-black text-2xl mt-1">
                  {form.price ? `₹${form.price}/qt` : "₹0/qt"}
                </p>

                <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
                  <div className="bg-white rounded-xl p-3">
                    <p className="text-gray-400">Quantity</p>
                    <p className="font-bold text-gray-800">
                      {form.quantity || "0"} quintal
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-3">
                    <p className="text-gray-400">Quality</p>
                    <p className="font-bold text-gray-800">{form.quality}</p>
                  </div>

                  <div className="bg-white rounded-xl p-3 col-span-2">
                    <p className="text-gray-400">Location</p>
                    <p className="font-bold text-gray-800">
                      {form.region || "Location not added"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-emerald-900 rounded-3xl p-6 text-white shadow-xl">
              <h3 className="text-xl font-black mb-3">
                What happens after upload?
              </h3>

              <div className="space-y-3 text-sm text-emerald-100">
                <p>1. Crop data is saved in localStorage.</p>
                <p>2. Crop listing appears in Marketplace page.</p>
                <p>3. Buyers can view price, quantity, quality and farmer name.</p>
                <p>4. Later this can be connected with MongoDB and Cloudinary.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerCropUpload;