import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  AlertTriangle, Megaphone, Lightbulb, FileText,
  Camera, X, MapPin, Sparkles, ArrowLeft,
  CheckCircle, AlertCircle, ImagePlus, CloudUpload,
  Wheat, Bug, Droplets, Cloud, Wrench, Leaf, Send, Plus
} from "lucide-react";
import { uploadToS3, uploadBase64ToS3, deleteFromS3 } from "../utils/s3Upload";

const API = "http://localhost:5000";

// ─── POST TYPES ───
const postTypes = [
  {
    key:      "problem",
    label:    "Problem",
    desc:     "Need help with crop/farm issue",
    icon:     AlertTriangle,
    gradient: "from-red-500 to-orange-500",
    light:    "bg-red-50",
    iconBg:   "bg-red-100",
    textColor:"text-red-600",
  },
  {
    key:      "advertisement",
    label:    "Advertisement",
    desc:     "Sell crops, products, services",
    icon:     Megaphone,
    gradient: "from-amber-500 to-yellow-500",
    light:    "bg-amber-50",
    iconBg:   "bg-amber-100",
    textColor:"text-amber-600",
  },
  {
    key:      "advice",
    label:    "Advice",
    desc:     "Share tips, knowledge, solutions",
    icon:     Lightbulb,
    gradient: "from-blue-500 to-indigo-500",
    light:    "bg-blue-50",
    iconBg:   "bg-blue-100",
    textColor:"text-blue-600",
  },
  {
    key:      "general",
    label:    "General Post",
    desc:     "Discussions, news, updates",
    icon:     FileText,
    gradient: "from-gray-500 to-slate-500",
    light:    "bg-gray-50",
    iconBg:   "bg-gray-200",
    textColor:"text-gray-600",
  },
];

const categories = [
  { key: "crop",       label: "Crop Disease", icon: Wheat,       color: "bg-green-100 text-green-700" },
  { key: "soil",       label: "Soil Issues",  icon: AlertCircle, color: "bg-yellow-100 text-yellow-700" },
  { key: "pest",       label: "Pest Control", icon: Bug,         color: "bg-red-100 text-red-700" },
  { key: "irrigation", label: "Irrigation",   icon: Droplets,    color: "bg-blue-100 text-blue-700" },
  { key: "weather",    label: "Weather",      icon: Cloud,       color: "bg-sky-100 text-sky-700" },
  { key: "equipment",  label: "Equipment",    icon: Wrench,      color: "bg-purple-100 text-purple-700" },
  { key: "other",      label: "Other",        icon: FileText,    color: "bg-gray-100 text-gray-700" },
];

const urgencyLevels = [
  { key: "low",      label: "Low",      dot: "bg-green-500" },
  { key: "medium",   label: "Medium",   dot: "bg-yellow-500" },
  { key: "high",     label: "High",     dot: "bg-orange-500" },
  { key: "critical", label: "Critical", dot: "bg-red-500 animate-pulse" },
];

const PostProblem = () => {
  const navigate = useNavigate();
  const stored   = localStorage.getItem("agriUser");
  const user     = stored ? JSON.parse(stored) : null;

  const fileInputRef = useRef(null);
  const videoRef     = useRef(null);
  const canvasRef    = useRef(null);

  // ── Step state ──
  const [selectedType,   setSelectedType]   = useState(null);  // null → show selector first
  const [showCamera,     setShowCamera]     = useState(false);
  const [cameraStream,   setCameraStream]   = useState(null);

  // ── Photo state ──
  const [photoPreview,   setPhotoPreview]   = useState([]);
  const [photoUrls,      setPhotoUrls]      = useState([]);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  // ── UI state ──
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");
  const [success, setSuccess] = useState("");

  // ── Form ──
  const [form, setForm] = useState({
    title:       "",
    description: "",
    category:    "crop",
    urgency:     "medium",
    location:    "",
    cropName:    "",
    price:       "",  // for advertisement
  });

  useEffect(() => {
    if (!showCamera && cameraStream) {
      cameraStream.getTracks().forEach((t) => t.stop());
      setCameraStream(null);
    }
  }, [showCamera]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // ── Upload from device ──
  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setError("");
    setUploadingPhoto(true);

    try {
      const newPreviews = [];
      const newUrls     = [];

      for (const file of files) {
        if (file.size > 5 * 1024 * 1024) {
          setError(`${file.name} too large (max 5MB)`);
          continue;
        }

        const reader = new FileReader();
        const previewUrl = await new Promise((resolve) => {
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(file);
        });
        newPreviews.push(previewUrl);

        try {
          const s3Url = await uploadToS3(file, "problems");
          newUrls.push(s3Url);
        } catch {
          newUrls.push(previewUrl);
        }
      }

      setPhotoPreview((prev) => [...prev, ...newPreviews]);
      setPhotoUrls((prev) => [...prev, ...newUrls]);
      setSuccess("Photos uploaded! ☁️");
      setTimeout(() => setSuccess(""), 3000);
    } catch {
      setError("Upload failed");
    }
    setUploadingPhoto(false);
  };

  // ── Camera ──
  const openCamera = async () => {
    setShowCamera(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      setCameraStream(stream);
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch {
      setError("Camera access denied");
      setShowCamera(false);
    }
  };

  const capturePhoto = async () => {
    const canvas = canvasRef.current;
    const video  = videoRef.current;
    if (!canvas || !video) return;

    canvas.width  = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.8);

    setShowCamera(false);
    setUploadingPhoto(true);

    try {
      let s3Url = dataUrl;
      try { s3Url = await uploadBase64ToS3(dataUrl, "problems"); } catch {}
      setPhotoPreview((prev) => [...prev, dataUrl]);
      setPhotoUrls((prev) => [...prev, s3Url]);
      setSuccess("Photo captured! ☁️");
      setTimeout(() => setSuccess(""), 3000);
    } catch {
      setError("Failed to capture");
    }
    setUploadingPhoto(false);
  };

  const removePhotoAtIndex = async (index) => {
    const url = photoUrls[index];
    if (url?.includes?.("amazonaws.com")) {
      try { await deleteFromS3(url); } catch {}
    }
    setPhotoPreview((prev) => prev.filter((_, i) => i !== index));
    setPhotoUrls((prev) => prev.filter((_, i) => i !== index));
  };

  // ── Submit ──
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (uploadingPhoto) { setError("Wait for photo upload"); return; }
    if (!form.title || !form.description) { setError("Title & description required"); return; }

    setLoading(true);
    try {
      await axios.post(`${API}/problems`, {
        ...form,
        postType:    selectedType,
        photo:       photoUrls,
        farmerName:  user?.name  || "Anonymous",
        farmerEmail: user?.email || "",
        farmerId:    user?.id    || user?._id,
        farmerRole:  user?.role  || "farmer",
        status:      "open",
        replies:     [],
        likes:       0,
        upvotes:     0,
        downvotes:   0,
        views:       0,
        postedAt:    new Date().toISOString(),
      });
      setSuccess("✅ Posted successfully!");
      setTimeout(() => navigate("/posts"), 1200);
    } catch {
      setError("Failed to post. Server running?");
    }
    setLoading(false);
  };

  // ─────────────────────────────────────────
  // STEP 1 — POST TYPE SELECTION
  // ─────────────────────────────────────────
  if (!selectedType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50/40 to-white pt-28 pb-12">
        <div className="max-w-4xl mx-auto px-4">

          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200 hover:border-green-300 hover:bg-green-50 text-gray-700 text-sm font-semibold transition shadow-sm"
          >
            <ArrowLeft size={16} /> Back
          </button>

          {/* Selection Card */}
          <div className="bg-white rounded-3xl shadow-2xl border border-white/60 overflow-hidden">

            {/* Header (green gradient like modal reference) */}
            <div className="bg-gradient-to-br from-green-700 via-emerald-700 to-green-800 px-7 py-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-24 translate-x-24"></div>
              <div className="relative">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 text-white/90 text-[10px] font-bold tracking-wider mb-2 backdrop-blur">
                  <Sparkles size={10} /> CREATE NEW POST
                </div>
                <h1 className="text-white text-2xl font-bold">Create New Post</h1>
                <p className="text-green-100 text-sm mt-1">
                  Choose the type of post you want to share
                </p>
              </div>
            </div>

            {/* Type Cards Grid */}
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {postTypes.map((t) => {
                  const Icon = t.icon;
                  return (
                    <button
                      key={t.key}
                      onClick={() => setSelectedType(t.key)}
                      className="group relative text-left p-5 rounded-2xl border-2 border-gray-200 hover:border-green-400 bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${t.gradient} flex items-center justify-center shadow-md mb-3 group-hover:scale-110 transition-transform`}>
                        <Icon className="text-white" size={22} />
                      </div>
                      <h3 className="font-bold text-gray-900 text-base">{t.label}</h3>
                      <p className="text-xs text-gray-500 mt-1">{t.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────
  // STEP 2 — POST FORM
  // ─────────────────────────────────────────
  const currentType = postTypes.find((t) => t.key === selectedType);
  const TypeIcon    = currentType.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50/40 to-white pt-28 pb-12">
      <div className="max-w-3xl mx-auto px-4">

        {/* Back button */}
        <button
          onClick={() => setSelectedType(null)}
          className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200 hover:border-green-300 hover:bg-green-50 text-gray-700 text-sm font-semibold transition shadow-sm"
        >
          <ArrowLeft size={16} /> Change post type
        </button>

        {/* Camera Modal */}
        {showCamera && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white rounded-3xl overflow-hidden w-full max-w-lg shadow-2xl">
              <div className="bg-gradient-to-br from-green-700 to-emerald-800 px-5 py-4 flex items-center justify-between">
                <h3 className="text-white font-bold text-lg flex items-center gap-2">
                  <Camera size={20} /> Take Photo
                </h3>
                <button onClick={() => setShowCamera(false)} className="text-white/80 hover:text-white p-1.5 rounded-lg hover:bg-white/10">
                  <X size={20} />
                </button>
              </div>
              <div className="p-4">
                <video ref={videoRef} autoPlay playsInline className="w-full rounded-2xl bg-black" style={{ maxHeight: "400px" }} />
                <canvas ref={canvasRef} className="hidden" />
              </div>
              <div className="px-4 pb-4 flex gap-3">
                <button onClick={() => setShowCamera(false)} className="flex-1 py-3 border-2 border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition">
                  Cancel
                </button>
                <button onClick={capturePhoto} className="flex-1 py-3 bg-gradient-to-br from-green-600 to-emerald-700 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2">
                  <Camera size={18} /> Capture
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-white/60 overflow-hidden">

          {/* Type Header — gradient matching selected type */}
          <div className={`bg-gradient-to-br ${currentType.gradient} px-7 py-6 relative overflow-hidden`}>
            <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-white/10 blur-2xl"></div>
            <div className="relative flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
                <TypeIcon size={26} className="text-white" />
              </div>
              <div>
                <h2 className="text-white text-2xl font-bold">Posting: {currentType.label}</h2>
                <p className="text-white/90 text-sm mt-0.5">{currentType.desc}</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 lg:p-8 space-y-5">

            {error && (
              <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-semibold flex items-center gap-2">
                <AlertCircle size={16} /> {error}
              </div>
            )}
            {success && (
              <div className="px-4 py-3 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm font-semibold flex items-center gap-2">
                <CheckCircle size={16} /> {success}
              </div>
            )}

            {/* Title */}
            <div>
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 block">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                placeholder={
                  selectedType === "problem"       ? "e.g. Yellowing leaves on wheat plants" :
                  selectedType === "advertisement" ? "e.g. Premium organic wheat — 100kg available" :
                  selectedType === "advice"        ? "e.g. How to use neem oil for pest control" :
                                                     "e.g. Monsoon update for Madhya Pradesh"
                }
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-300 transition"
              />
            </div>

            {/* Crop & Location */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 block">
                  <Wheat className="inline w-3 h-3 mr-1" /> Crop Name
                </label>
                <input
                  name="cropName"
                  value={form.cropName}
                  onChange={handleChange}
                  placeholder="e.g. Wheat"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 block">
                  <MapPin className="inline w-3 h-3 mr-1" /> Location
                </label>
                <input
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="e.g. Bhopal, MP"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            {/* Category Pills */}
            <div>
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 block">
                Category
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((c) => {
                  const Icon = c.icon;
                  return (
                    <button
                      key={c.key}
                      type="button"
                      onClick={() => setForm({ ...form, category: c.key })}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold border-2 transition ${
                        form.category === c.key
                          ? "bg-green-600 text-white border-green-600 shadow-md"
                          : "bg-white border-gray-200 text-gray-700 hover:border-green-300"
                      }`}
                    >
                      <Icon size={14} /> {c.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Urgency — only for problems */}
            {selectedType === "problem" && (
              <div>
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 block">
                  Urgency
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {urgencyLevels.map((u) => (
                    <button
                      key={u.key}
                      type="button"
                      onClick={() => setForm({ ...form, urgency: u.key })}
                      className={`flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-sm font-bold border-2 transition ${
                        form.urgency === u.key
                          ? "border-green-500 bg-green-50 text-green-700"
                          : "border-gray-200 text-gray-500 hover:border-gray-300"
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full ${u.dot}`}></span>
                      {u.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Price — only for advertisement */}
            {selectedType === "advertisement" && (
              <div>
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 block">
                  💰 Price (Optional)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₹</span>
                  <input
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="e.g. 25,000 per quintal"
                    className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
            )}

            {/* Description */}
            <div>
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 block">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                rows={5}
                placeholder={
                  selectedType === "problem"       ? "Describe in detail — symptoms, when started, what you tried..." :
                  selectedType === "advertisement" ? "Describe what you're selling — quality, quantity, terms..." :
                  selectedType === "advice"        ? "Share your knowledge or solution in detail..." :
                                                     "Share your update, news, or thoughts..."
                }
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
              />
              <div className="text-xs text-gray-400 mt-1 text-right">
                {form.description.length} / 3000
              </div>
            </div>

            {/* Photos */}
            <div>
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-1">
                <Camera className="w-3 h-3" /> Photos (Optional)
              </label>

              {/* Photo Preview Grid */}
              {photoPreview.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-3">
                  {photoPreview.map((img, idx) => (
                    <div key={idx} className="relative rounded-xl overflow-hidden border-2 border-green-200 group aspect-square">
                      <img src={img} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removePhotoAtIndex(idx)}
                        className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-red-500 hover:bg-red-600 text-white text-xs font-bold flex items-center justify-center shadow opacity-0 group-hover:opacity-100 transition"
                      >
                        ✕
                      </button>
                      {photoUrls[idx]?.includes?.("amazonaws.com") && (
                        <div className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded-full bg-orange-500/90 text-white text-[8px] font-bold flex items-center gap-0.5">
                          <CloudUpload size={8} /> S3
                        </div>
                      )}
                    </div>
                  ))}

                  {uploadingPhoto && (
                    <div className="aspect-square rounded-xl border-2 border-dashed border-green-300 bg-green-50 flex flex-col items-center justify-center">
                      <div className="animate-spin w-5 h-5 border-2 border-green-500 border-t-transparent rounded-full mb-1"></div>
                      <p className="text-[10px] font-bold text-green-700">Uploading</p>
                    </div>
                  )}
                </div>
              )}

              {/* Upload Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingPhoto}
                  className="flex flex-col items-center gap-2 p-5 rounded-2xl border-2 border-dashed border-gray-200 hover:border-green-400 hover:bg-green-50 transition group disabled:opacity-50"
                >
                  <div className="w-12 h-12 rounded-xl bg-gray-100 group-hover:bg-green-100 flex items-center justify-center transition">
                    <ImagePlus className="w-6 h-6 text-gray-500 group-hover:text-green-600" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-gray-700 group-hover:text-green-700">Upload Photos</p>
                    <p className="text-xs text-gray-400">JPG, PNG · max 5MB</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={openCamera}
                  disabled={uploadingPhoto}
                  className="flex flex-col items-center gap-2 p-5 rounded-2xl border-2 border-dashed border-gray-200 hover:border-green-400 hover:bg-green-50 transition group disabled:opacity-50"
                >
                  <div className="w-12 h-12 rounded-xl bg-gray-100 group-hover:bg-green-100 flex items-center justify-center transition">
                    <Camera className="w-6 h-6 text-gray-500 group-hover:text-green-600" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-gray-700 group-hover:text-green-700">Take Photo</p>
                    <p className="text-xs text-gray-400">Use camera</p>
                  </div>
                </button>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileUpload}
                className="hidden"
              />

              <div className="mt-3 flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-50 border border-blue-100">
                <CloudUpload className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                <p className="text-[11px] text-gray-600">
                  Photos stored on <strong>AWS S3</strong> · Multiple allowed · 5MB max each
                </p>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-3 pt-3">
              <button
                type="button"
                onClick={() => setSelectedType(null)}
                className="flex-1 py-3.5 rounded-xl border-2 border-gray-200 text-gray-700 font-bold hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || uploadingPhoto}
                className={`flex-[2] py-3.5 rounded-xl text-white font-bold shadow-lg hover:shadow-xl transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 bg-gradient-to-br ${currentType.gradient}`}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Posting...
                  </>
                ) : uploadingPhoto ? (
                  "⏳ Wait for upload..."
                ) : (
                  <>
                    <CloudUpload size={18} />
                    Publish {currentType.label}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostProblem;