// src/pages/Posts.jsx

import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  AlertCircle,
  AlertTriangle,
  Bookmark,
  Camera,
  CheckCircle,
  ChevronDown,
  Lock,
LogIn,
UserPlus,
  ChevronRight,
  ChevronUp,
  Clock,
  CloudUpload,
  FileText,
  Image as ImageIcon,
  ImagePlus,
  Lightbulb,
  MapPin,
  Megaphone,
  MessageCircle,
  Plus,
  Reply,
  Search,
  Send,
  Share2,
  Trash2,
  TrendingUp,
  X,
} from "lucide-react";
import { uploadToS3, uploadBase64ToS3, deleteFromS3 } from "../utils/s3Upload";

const API = "http://localhost:5000";

const safeParseUser = () => {
  try {
    return JSON.parse(localStorage.getItem("agriUser") || "{}");
  } catch {
    return {};
  }
};

const staticPosts = [
  {
    id: "static-wheat-yellow-leaves",
    postType: "problem",
    title: "Yellow leaves appearing on wheat crop",
    description:
      "My wheat crop leaves are turning yellow from the edges. I have watered properly, but the problem is spreading slowly. What could be the reason and how can I stop it?",
    cropName: "Wheat",
    category: "crop",
    urgency: "medium",
    location: "Bhopal, Madhya Pradesh",
    farmerName: "Ramesh Patel",
    farmerRole: "farmer",
    status: "open",
    upvotes: 18,
    downvotes: 2,
    photo: [
  "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=1200&q=80",
],
    postedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    replies: [
      {
        id: 101,
        text:
          "This may be due to nitrogen deficiency or early fungal infection. First check soil nutrients, avoid overwatering, and remove badly affected leaves. If spots are visible, consult a local agronomist for a safe fungicide dose.",
        author: "Dr. Neha Sharma",
        role: "agronomist",
        upvotes: 12,
        downvotes: 0,
        replies: [],
        repliedAt: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
      },
    ],
  },
  {
    id: "static-tomato-whiteflies",
    postType: "problem",
    title: "Small white insects under tomato leaves",
    description:
      "Small white insects are visible under tomato leaves. Leaves are curling and plant growth is reducing. I need a safe solution because the crop is near flowering stage.",
    cropName: "Tomato",
    category: "pest",
    urgency: "high",
    location: "Indore, Madhya Pradesh",
    farmerName: "Sunita Verma",
    farmerRole: "farmer",
    status: "open",
    upvotes: 25,
    downvotes: 1,
    photo: [
  "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=1200&q=80",
],
    postedAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    replies: [
      {
        id: 102,
        text:
          "These are likely whiteflies. Use yellow sticky traps, remove heavily infected leaves, and spray neem oil solution in the evening. Do not spray during strong sunlight.",
        author: "Amit Kushwaha",
        role: "agronomist",
        upvotes: 15,
        downvotes: 1,
        replies: [],
        repliedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      },
    ],
  },
  {
    id: "static-soybean-market-price",
    postType: "advice",
    title: "Best mandi price for soybean this week?",
    description:
      "I want to sell soybean crop. Which mandi near Madhya Pradesh is giving better price this week? Should I sell now or wait for a better rate?",
    cropName: "Soybean",
    category: "market",
    urgency: "low",
    location: "Ujjain, Madhya Pradesh",
    farmerName: "Mahesh Choudhary",
    farmerRole: "farmer",
    status: "resolved",
    upvotes: 10,
    downvotes: 0,
     photo: [
    "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=1200&q=80",
  ],
    postedAt: new Date(Date.now() - 1000 * 60 * 60 * 7).toISOString(),
    replies: [
      {
        id: 103,
        text:
          "Check Agmarknet and e-NAM before selling. Ujjain and Indore mandis usually have active soybean trading. If prices are rising for 2-3 days continuously, compare transport cost before waiting.",
        author: "Kisan Market Advisor",
        role: "vendor",
        upvotes: 8,
        downvotes: 0,
        replies: [],
        repliedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
      },
    ],
  },
];

const postTypes = {
  problem: {
    label: "PROBLEM",
    color: "bg-red-100 text-red-700 border-red-200",
  },
  advertisement: {
    label: "ADVERTISEMENT",
    color: "bg-amber-100 text-amber-700 border-amber-200",
  },
  advice: {
    label: "ADVICE",
    color: "bg-blue-100 text-blue-700 border-blue-200",
  },
  general: {
    label: "GENERAL",
    color: "bg-gray-100 text-gray-700 border-gray-200",
  },
};

const roleBadges = {
  farmer: { label: "FARMER", color: "bg-green-50 text-green-700" },
  buyer: { label: "BUYER", color: "bg-blue-50 text-blue-700" },
  agronomist: { label: "AGRONOMIST", color: "bg-purple-50 text-purple-700" },
  vendor: { label: "VENDOR", color: "bg-orange-50 text-orange-700" },
};

const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const emergingTags = [
  "#YellowLeaves",
  "#PestInfestation",
  "#SoilAcidity",
  "#DroughtStress",
  "#FruitDrop",
];

const commonProblems = ["Potato Blight", "Tomato Wilt", "Rice Blast"];
const cropFilters = ["Potato", "Tomato", "Wheat", "Rice", "Soybean", "Onion"];

const mandiPrices = [
  { crop: "Potato", price: "₹18/kg" },
  { crop: "Tomato", price: "₹22/kg" },
  { crop: "Wheat", price: "₹24/kg" },
];

const recommendedSchemes = [
  {
    name: "PMFBY Insurance",
    status: "ACTIVE",
    desc: "Protection against crop loss due to diseases or unpredictable weather.",
  },
];

const timeAgo = (iso) => {
  if (!iso) return "Just now";

  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "Just now";

  const diff = Math.floor((Date.now() - date.getTime()) / 1000);

  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) {
    const hours = Math.floor(diff / 3600);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  }

  const days = Math.floor(diff / 86400);
  return `${days} day${days > 1 ? "s" : ""} ago`;
};

const getPostId = (post) => post?._id || post?.id || `post-${Math.random()}`;

const getScore = (post) => (post?.upvotes || 0) - (post?.downvotes || 0);

const getPhotos = (post) => {
  if (!post?.photo) return [];
  if (Array.isArray(post.photo)) return post.photo.filter(Boolean);
  if (typeof post.photo === "string") return post.photo ? [post.photo] : [];
  return [];
};

const isStaticPost = (post) => String(getPostId(post)).startsWith("static-");

const mergeStaticWithBackendPosts = (backendPosts) => {
  const safeBackendPosts = Array.isArray(backendPosts) ? backendPosts : [];
  const backendIds = new Set(
    safeBackendPosts.map((post) => post.id || post._id).filter(Boolean)
  );

  const demoPosts = staticPosts.filter((post) => !backendIds.has(post.id));

  return [...demoPosts, ...safeBackendPosts];
};

const updateReplyTree = (replies, targetId, updater) =>
  (replies || []).map((reply) => {
    if (reply.id === targetId) return updater(reply);

    return {
      ...reply,
      replies: reply.replies?.length
        ? updateReplyTree(reply.replies, targetId, updater)
        : [],
    };
  });

const deleteReplyTree = (replies, targetId) =>
  (replies || [])
    .filter((reply) => reply.id !== targetId)
    .map((reply) => ({
      ...reply,
      replies: reply.replies?.length
        ? deleteReplyTree(reply.replies, targetId)
        : [],
    }));

const ReplyItem = ({
  reply,
  postId,
  depth = 0,
  onVote,
  onReply,
  onDelete,
  replyVotes,
  currentUser,
}) => {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [collapsed, setCollapsed] = useState(false);

  const voteKey = `${postId}-${reply.id}`;
  const voteState = replyVotes[voteKey];
  const score = (reply.upvotes || 0) - (reply.downvotes || 0);
  const isExpert = reply.role === "agronomist";

  const handleSendReply = () => {
    if (!replyText.trim()) return;
    onReply(reply.id, replyText.trim());
    setReplyText("");
    setShowReplyBox(false);
  };

  return (
    <div className={depth > 0 ? "ml-4 sm:ml-6 pl-3 sm:pl-4 border-l-2 border-green-100" : ""}>
      <div
        className={`rounded-2xl p-4 mb-2 ${
          isExpert
            ? "bg-emerald-50/70 border border-emerald-100"
            : "bg-gray-50 border border-gray-100"
        }`}
      >
        {isExpert && (
          <div className="inline-flex items-center gap-1 mb-2 px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold">
            <CheckCircle size={10} /> EXPERT VERIFIED RESPONSE
          </div>
        )}

        <div className="flex items-start gap-3">
          <div className="flex flex-col items-center bg-white rounded-full py-1.5 px-1 border border-gray-200 flex-shrink-0">
            <button
              type="button"
              onClick={() => onVote(reply.id, "up")}
              className={`p-1 rounded-full transition ${
                voteState === "up"
                  ? "text-green-600 bg-green-50"
                  : "text-gray-400 hover:text-green-600 hover:bg-green-50"
              }`}
              aria-label="Upvote reply"
            >
              <ChevronUp size={16} strokeWidth={3} />
            </button>

            <span
              className={`text-xs font-bold tabular-nums my-0.5 ${
                score > 0
                  ? "text-green-600"
                  : score < 0
                  ? "text-red-500"
                  : "text-gray-500"
              }`}
            >
              {score}
            </span>

            <button
              type="button"
              onClick={() => onVote(reply.id, "down")}
              className={`p-1 rounded-full transition ${
                voteState === "down"
                  ? "text-red-500 bg-red-50"
                  : "text-gray-400 hover:text-red-500 hover:bg-red-50"
              }`}
              aria-label="Downvote reply"
            >
              <ChevronDown size={16} strokeWidth={3} />
            </button>
          </div>

          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
            {(reply.author || "U").charAt(0).toUpperCase()}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-gray-900 text-sm">
                {reply.author || "User"}
              </span>

              <span
                className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                  roleBadges[reply.role]?.color || roleBadges.farmer.color
                }`}
              >
                {roleBadges[reply.role]?.label || "FARMER"}
              </span>

              <span className="text-xs text-gray-400 ml-auto">
                {timeAgo(reply.repliedAt)}
              </span>
            </div>

            {isExpert && (
              <p className="text-xs text-gray-500 mt-0.5">
                Senior Agricultural Consultant
              </p>
            )}

            <p className="text-sm text-gray-700 leading-relaxed mt-2">
              {reply.text}
            </p>

            <div className="flex items-center gap-3 mt-3 flex-wrap">
              <button
                type="button"
                onClick={() => setShowReplyBox(!showReplyBox)}
                className={`text-xs font-semibold flex items-center gap-1 transition px-2 py-1 rounded-lg ${
                  showReplyBox
                    ? "bg-green-100 text-green-700"
                    : "text-gray-500 hover:bg-gray-100 hover:text-green-600"
                }`}
              >
                <Reply size={11} /> Reply
              </button>

              {reply.replies?.length > 0 && (
                <button
                  type="button"
                  onClick={() => setCollapsed(!collapsed)}
                  className="text-xs font-semibold text-gray-400 hover:text-gray-600 flex items-center gap-1 transition px-2 py-1 rounded-lg hover:bg-gray-100"
                >
                  <MessageCircle size={11} />
                  {collapsed
                    ? `Show ${reply.replies.length} ${
                        reply.replies.length === 1 ? "reply" : "replies"
                      }`
                    : "Hide replies"}
                </button>
              )}

              <span className="text-[10px] text-gray-400 ml-auto">
                {reply.upvotes || 0} upvotes · {reply.downvotes || 0} downvotes
              </span>

              {reply.author === currentUser?.name && (
                <button
                  type="button"
                  onClick={() => onDelete(reply.id)}
                  className="text-xs font-semibold text-red-400 hover:text-red-600 flex items-center gap-1 transition px-2 py-1 rounded-lg hover:bg-red-50"
                  aria-label="Delete reply"
                >
                  <Trash2 size={11} />
                </button>
              )}
            </div>

            {showReplyBox && (
              <div className="mt-3 flex flex-col sm:flex-row gap-2">
                <input
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendReply()}
                  placeholder={`Reply to ${reply.author || "user"}...`}
                  autoFocus
                  className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />

                <button
                  type="button"
                  onClick={handleSendReply}
                  disabled={!replyText.trim()}
                  className="px-4 py-2 rounded-lg bg-gradient-to-br from-green-600 to-emerald-700 hover:shadow-md disabled:opacity-40 text-white text-xs font-semibold flex items-center justify-center gap-1 transition"
                >
                  <Send size={11} /> Send
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowReplyBox(false);
                    setReplyText("");
                  }}
                  className="px-3 py-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 text-xs font-semibold"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {!collapsed && reply.replies?.length > 0 && (
        <div className="mt-1">
          {reply.replies.map((nested) => (
            <ReplyItem
              key={nested.id}
              reply={nested}
              postId={postId}
              depth={depth + 1}
              onVote={onVote}
              onReply={onReply}
              onDelete={onDelete}
              replyVotes={replyVotes}
              currentUser={currentUser}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const CreatePostModal = ({ open, onClose, onCreated, user }) => {
  const [step, setStep] = useState(1);
  const [postType, setPostType] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cropName, setCropName] = useState("");
  const [location, setLocation] = useState("");
  const [urgency, setUrgency] = useState("medium");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [photoPreview, setPhotoPreview] = useState([]);
  const [photoUrls, setPhotoUrls] = useState([]);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);

  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const types = [
    {
      key: "problem",
      label: "Problem",
      desc: "Need help with crop/farm issue",
      icon: AlertTriangle,
      color: "from-red-500 to-orange-500",
    },
    {
      key: "advertisement",
      label: "Advertisement",
      desc: "Sell crops, products, services",
      icon: Megaphone,
      color: "from-amber-500 to-yellow-500",
    },
    {
      key: "advice",
      label: "Advice",
      desc: "Share tips, knowledge, solutions",
      icon: Lightbulb,
      color: "from-blue-500 to-indigo-500",
    },
    {
      key: "general",
      label: "General Post",
      desc: "Discussions, news, updates",
      icon: FileText,
      color: "from-gray-500 to-slate-500",
    },
  ];

  useEffect(() => {
    if (!showCamera && cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
    }
  }, [showCamera, cameraStream]);

  const reset = () => {
    setStep(1);
    setPostType(null);
    setTitle("");
    setDescription("");
    setCropName("");
    setLocation("");
    setUrgency("medium");
    setError("");
    setPhotoPreview([]);
    setPhotoUrls([]);
    setShowCamera(false);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const readFileAsDataUrl = (file) =>
    new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setError("");
    setUploadingPhoto(true);

    try {
      const newPreviews = [];
      const newUrls = [];

      for (const file of files) {
        if (file.size > 5 * 1024 * 1024) {
          setError(`${file.name} too large. Max 5MB allowed.`);
          continue;
        }

        const previewUrl = await readFileAsDataUrl(file);
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
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setUploadingPhoto(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const openCamera = async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setError("Camera is not supported in this browser.");
      return;
    }

    setShowCamera(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      setCameraStream(stream);
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch {
      setError("Camera access denied. Please allow camera permission.");
      setShowCamera(false);
    }
  };

  const capturePhoto = async () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;

    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    canvas.getContext("2d").drawImage(video, 0, 0);

    const dataUrl = canvas.toDataURL("image/jpeg", 0.8);

    setShowCamera(false);
    setUploadingPhoto(true);

    try {
      let finalUrl = dataUrl;

      try {
        finalUrl = await uploadBase64ToS3(dataUrl, "problems");
      } catch {
        finalUrl = dataUrl;
      }

      setPhotoPreview((prev) => [...prev, dataUrl]);
      setPhotoUrls((prev) => [...prev, finalUrl]);
    } catch {
      setError("Failed to capture photo.");
    } finally {
      setUploadingPhoto(false);
    }
  };

  const removePhotoAtIndex = async (index) => {
    const url = photoUrls[index];

    if (url?.includes?.("amazonaws.com")) {
      try {
        await deleteFromS3(url);
      } catch {}
    }

    setPhotoPreview((prev) => prev.filter((_, i) => i !== index));
    setPhotoUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!postType) {
      setError("Please select post type.");
      return;
    }

    if (!title.trim() || !description.trim()) {
      setError("Title and description are required.");
      return;
    }

    if (uploadingPhoto) {
      setError("Please wait for photo upload to finish.");
      return;
    }

    setSubmitting(true);

    const newPost = {
      id: `local-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      cropName: cropName.trim(),
      location: location.trim(),
      urgency,
      postType,
      category: postType === "problem" ? "crop" : postType,
      photo: photoUrls,
      farmerName: user?.name || "Guest User",
      farmerEmail: user?.email || "",
      farmerId: user?.id || user?._id || "",
      farmerRole: user?.role || "farmer",
      status: "open",
      replies: [],
      upvotes: 0,
      downvotes: 0,
      views: 0,
      postedAt: new Date().toISOString(),
    };

    try {
      const { data } = await axios.post(`${API}/problems`, newPost);
      onCreated(data || newPost);
      handleClose();
    } catch {
      onCreated(newPost);
      handleClose();
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gradient-to-br from-green-700 to-emerald-800 px-6 py-5 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h2 className="text-white font-bold text-xl">
              {step === 1
                ? "Create New Post"
                : `Posting: ${types.find((type) => type.key === postType)?.label}`}
            </h2>
            <p className="text-green-100 text-xs mt-0.5">
              {step === 1
                ? "Choose the type of post you want to share"
                : "Fill in the details below"}
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="text-white/80 hover:text-white p-2 rounded-lg hover:bg-white/10 transition"
            aria-label="Close create post modal"
          >
            <X size={22} />
          </button>
        </div>

        {showCamera && (
          <div className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl overflow-hidden w-full max-w-lg shadow-2xl">
              <div className="bg-gradient-to-br from-green-700 to-emerald-800 px-5 py-4 flex items-center justify-between">
                <h3 className="text-white font-bold text-lg flex items-center gap-2">
                  <Camera size={20} /> Take Photo
                </h3>

                <button
                  type="button"
                  onClick={() => setShowCamera(false)}
                  className="text-white/80 hover:text-white p-1.5 rounded-lg hover:bg-white/10"
                  aria-label="Close camera"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-4">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full rounded-2xl bg-black"
                  style={{ maxHeight: "400px", objectFit: "cover" }}
                />
                <canvas ref={canvasRef} className="hidden" />
              </div>

              <div className="px-4 pb-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowCamera(false)}
                  className="flex-1 py-3 border-2 border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={capturePhoto}
                  className="flex-1 py-3 bg-gradient-to-br from-green-600 to-emerald-700 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 hover:shadow-xl transition"
                >
                  <Camera size={18} /> Capture
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="p-6">
          {step === 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {types.map((type) => {
                const Icon = type.icon;

                return (
                  <button
                    key={type.key}
                    type="button"
                    onClick={() => {
                      setPostType(type.key);
                      setStep(2);
                    }}
                    className="group relative overflow-hidden text-left p-5 rounded-2xl border-2 border-gray-200 hover:border-green-400 bg-white hover:shadow-xl hover:-translate-y-0.5 transition-all"
                  >
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${type.color} flex items-center justify-center shadow-md mb-3 group-hover:scale-110 transition`}
                    >
                      <Icon className="text-white" size={22} />
                    </div>

                    <h3 className="font-bold text-gray-900 text-base">
                      {type.label}
                    </h3>

                    <p className="text-xs text-gray-500 mt-1">{type.desc}</p>
                  </button>
                );
              })}
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-sm text-green-700 font-semibold hover:underline flex items-center gap-1"
              >
                ← Change post type
              </button>

              {error && (
                <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-semibold flex items-center gap-2">
                  <AlertCircle size={16} /> {error}
                </div>
              )}

              <div>
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 block">
                  Title <span className="text-red-500">*</span>
                </label>

                <input
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Yellowing leaves on wheat plants"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 block">
                    Crop Name
                  </label>

                  <input
                    value={cropName}
                    onChange={(e) => setCropName(e.target.value)}
                    placeholder="e.g. Wheat"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 block">
                    Location
                  </label>

                  <input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Bhopal, MP"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              {postType === "problem" && (
                <div>
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 block">
                    Urgency
                  </label>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { key: "low", label: "Low", dot: "bg-green-500" },
                      { key: "medium", label: "Medium", dot: "bg-yellow-500" },
                      { key: "high", label: "High", dot: "bg-orange-500" },
                      { key: "critical", label: "Critical", dot: "bg-red-500" },
                    ].map((level) => (
                      <button
                        key={level.key}
                        type="button"
                        onClick={() => setUrgency(level.key)}
                        className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-sm font-bold border-2 transition ${
                          urgency === level.key
                            ? "border-green-500 bg-green-50 text-green-700"
                            : "border-gray-200 text-gray-500 hover:border-gray-300"
                        }`}
                      >
                        <span className={`w-2 h-2 rounded-full ${level.dot}`}></span>
                        {level.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 block">
                  Description <span className="text-red-500">*</span>
                </label>

                <textarea
                  required
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe in detail..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-1">
                  <Camera size={12} /> Add Photos Optional
                </label>

                {photoPreview.length > 0 && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-3">
                    {photoPreview.map((img, idx) => (
                      <div
                        key={idx}
                        className="relative rounded-xl overflow-hidden border-2 border-green-200 group aspect-square"
                      >
                        <img
                          src={img}
                          alt={`Preview ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />

                        <button
                          type="button"
                          onClick={() => removePhotoAtIndex(idx)}
                          className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-red-500 hover:bg-red-600 text-white text-xs font-bold flex items-center justify-center shadow opacity-0 group-hover:opacity-100 transition"
                          aria-label="Remove photo"
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
                        <p className="text-[10px] font-bold text-green-700">
                          Uploading
                        </p>
                      </div>
                    )}
                  </div>
                )}

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
                      <p className="text-sm font-bold text-gray-700 group-hover:text-green-700">
                        Upload Photos
                      </p>
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
                      <p className="text-sm font-bold text-gray-700 group-hover:text-green-700">
                        Take Photo
                      </p>
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

                <div className="mt-2 flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-50 border border-blue-100">
                  <CloudUpload className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                  <p className="text-[11px] text-gray-600">
                    Photos stored on AWS S3 if available. If upload fails, local
                    image preview will still work.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-bold hover:bg-gray-50 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting || uploadingPhoto}
                  className="flex-[2] py-3 rounded-xl bg-gradient-to-br from-green-600 to-emerald-700 text-white font-bold shadow-lg hover:shadow-xl transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Posting...
                    </>
                  ) : uploadingPhoto ? (
                    "Wait for upload..."
                  ) : (
                    "Publish Post"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
const LoginFirstCard = () => {
  return (
    <div className="mt-8 rounded-3xl bg-gradient-to-br from-green-700 via-emerald-700 to-green-900 p-8 md:p-10 text-center text-white shadow-xl border border-green-200">
      <div className="w-20 h-20 mx-auto rounded-3xl bg-white/15 border border-white/20 flex items-center justify-center mb-5">
        <Lock className="w-10 h-10 text-white" />
      </div>

      <p className="text-green-100 text-xs font-black uppercase tracking-[0.25em] mb-3">
        Community Access
      </p>

      <h2 className="text-2xl md:text-4xl font-black mb-3">
        Login first or register to view more posts
      </h2>

      <p className="text-green-100 max-w-2xl mx-auto mb-7">
        You can see only a few community posts. To view more farmer posts,
        expert replies, and discussions, please login or register first.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          to="/login"
          className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-white text-green-700 font-black hover:bg-green-50 transition shadow-lg"
        >
          <LogIn className="w-5 h-5" />
          Login
        </Link>

        <Link
          to="/login"
          className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-green-950/70 border border-white/20 text-white font-black hover:bg-green-950 transition"
        >
          <UserPlus className="w-5 h-5" />
          Register
        </Link>
      </div>
    </div>
  );
};
const Posts = () => {
  const user = safeParseUser();
  const isLoggedIn = Boolean(user?.id || user?._id || user?.email);
  
  const FREE_POST_LIMIT = 2;
  
  const [posts, setPosts] = useState([]);
  const [userVotes, setUserVotes] = useState({});
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [tab, setTab] = useState("trending");
  const [cropFilter, setCropFilter] = useState("");
  const [openReplies, setOpenReplies] = useState({});
  const [replyInputs, setReplyInputs] = useState({});
  const [replyVotes, setReplyVotes] = useState({});
  const [bookmarked, setBookmarked] = useState({});
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    try {
      const savedBookmarks = JSON.parse(
        localStorage.getItem("agriBookmarks") || "{}"
      );
      setBookmarked(savedBookmarks);
    } catch {
      setBookmarked({});
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("agriBookmarks", JSON.stringify(bookmarked));
  }, [bookmarked]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);

    try {
      const { data } = await axios.get(`${API}/problems`);
      const mergedPosts = mergeStaticWithBackendPosts(data);
      setPosts(mergedPosts);
    } catch (err) {
      console.log(err);
      setPosts(staticPosts);
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const q = search.toLowerCase().trim();
      const r = region.toLowerCase().trim();
      const role = roleFilter.toLowerCase().trim();
      const crop = cropFilter.toLowerCase().trim();
      const postRole = (post.farmerRole || post.role || "farmer").toLowerCase();

      const searchableText = [
        post.title,
        post.description,
        post.cropName,
        post.farmerName,
        post.category,
        post.location,
        post.postType,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch = !q || searchableText.includes(q);
      const matchesRegion = !r || post.location?.toLowerCase().includes(r);
      const matchesRole = !role || postRole === role;
      const matchesCrop = !crop || post.cropName?.toLowerCase().includes(crop);

      if (tab === "unanswered") {
        return (
          matchesSearch &&
          matchesRegion &&
          matchesRole &&
          matchesCrop &&
          (!post.replies || post.replies.length === 0)
        );
      }

      if (tab === "solved") {
        return (
          matchesSearch &&
          matchesRegion &&
          matchesRole &&
          matchesCrop &&
          post.status === "resolved"
        );
      }

      return matchesSearch && matchesRegion && matchesRole && matchesCrop;
    });
  }, [posts, search, region, roleFilter, cropFilter, tab]);

  const sortedPosts = useMemo(() => {
    return [...filteredPosts].sort((a, b) => {
      if (tab === "trending") {
        const trendA = getScore(a) + (a.replies?.length || 0) * 2;
        const trendB = getScore(b) + (b.replies?.length || 0) * 2;
        return trendB - trendA;
      }

      const dateA = new Date(a.postedAt || a.createdAt || 0).getTime();
      const dateB = new Date(b.postedAt || b.createdAt || 0).getTime();

      return dateB - dateA;
    });
  }, [filteredPosts, tab]);
  const visiblePosts = isLoggedIn
    ? sortedPosts
    : sortedPosts.slice(0, FREE_POST_LIMIT);

  const hiddenPostsCount = Math.max(sortedPosts.length - visiblePosts.length, 0);
  const updatePostOnBackend = async (post, payload) => {
    if (isStaticPost(post)) return;

    try {
      await axios.patch(`${API}/problems/${getPostId(post)}`, payload);
    } catch {}
  };

  const handleVote = async (post, type) => {
    const postId = getPostId(post);
    const currentVote = userVotes[postId];

    let upvotes = post.upvotes || 0;
    let downvotes = post.downvotes || 0;

    if (currentVote === type) {
      if (type === "up") upvotes = Math.max(upvotes - 1, 0);
      if (type === "down") downvotes = Math.max(downvotes - 1, 0);
      setUserVotes((prev) => ({ ...prev, [postId]: null }));
    } else {
      if (currentVote === "up") upvotes = Math.max(upvotes - 1, 0);
      if (currentVote === "down") downvotes = Math.max(downvotes - 1, 0);
      if (type === "up") upvotes += 1;
      if (type === "down") downvotes += 1;
      setUserVotes((prev) => ({ ...prev, [postId]: type }));
    }

    setPosts((prev) =>
      prev.map((p) =>
        getPostId(p) === postId ? { ...p, upvotes, downvotes } : p
      )
    );

    await updatePostOnBackend(post, { upvotes, downvotes });
  };

  const handleDeletePost = async (post) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    const postId = getPostId(post);

    setPosts((prev) => prev.filter((p) => getPostId(p) !== postId));

    if (isStaticPost(post)) return;

    try {
      await axios.delete(`${API}/problems/${postId}`);
    } catch {
      alert("Failed to delete post. Please try again.");
      fetchPosts();
    }
  };

  const addReply = async (post) => {
    const postId = getPostId(post);
    const text = replyInputs[postId];

    if (!text?.trim()) return;

    const newReply = {
      id: Date.now(),
      text: text.trim(),
      author: user.name || "Guest User",
      role: user.role || "farmer",
      upvotes: 0,
      downvotes: 0,
      replies: [],
      repliedAt: new Date().toISOString(),
    };

    const updatedReplies = [...(post.replies || []), newReply];

    setPosts((prev) =>
      prev.map((p) =>
        getPostId(p) === postId ? { ...p, replies: updatedReplies } : p
      )
    );

    setReplyInputs((prev) => ({ ...prev, [postId]: "" }));

    await updatePostOnBackend(post, { replies: updatedReplies });
  };

  const addNestedReply = async (post, parentId, text) => {
    const postId = getPostId(post);

    const newReply = {
      id: Date.now(),
      text,
      author: user.name || "Guest User",
      role: user.role || "farmer",
      upvotes: 0,
      downvotes: 0,
      replies: [],
      repliedAt: new Date().toISOString(),
    };

    const updatedReplies = updateReplyTree(
      post.replies || [],
      parentId,
      (reply) => ({
        ...reply,
        replies: [...(reply.replies || []), newReply],
      })
    );

    setPosts((prev) =>
      prev.map((p) =>
        getPostId(p) === postId ? { ...p, replies: updatedReplies } : p
      )
    );

    await updatePostOnBackend(post, { replies: updatedReplies });
  };

  const voteReply = async (post, replyId, type) => {
    const postId = getPostId(post);
    const voteKey = `${postId}-${replyId}`;
    const voteState = replyVotes[voteKey];

    const updatedReplies = updateReplyTree(
      post.replies || [],
      replyId,
      (reply) => {
        let upvotes = reply.upvotes || 0;
        let downvotes = reply.downvotes || 0;

        if (voteState === type) {
          if (type === "up") upvotes = Math.max(upvotes - 1, 0);
          if (type === "down") downvotes = Math.max(downvotes - 1, 0);
        } else {
          if (voteState === "up") upvotes = Math.max(upvotes - 1, 0);
          if (voteState === "down") downvotes = Math.max(downvotes - 1, 0);
          if (type === "up") upvotes += 1;
          if (type === "down") downvotes += 1;
        }

        return { ...reply, upvotes, downvotes };
      }
    );

    setReplyVotes((prev) => ({
      ...prev,
      [voteKey]: voteState === type ? null : type,
    }));

    setPosts((prev) =>
      prev.map((p) =>
        getPostId(p) === postId ? { ...p, replies: updatedReplies } : p
      )
    );

    await updatePostOnBackend(post, { replies: updatedReplies });
  };

  const deleteReply = async (post, replyId) => {
    if (!window.confirm("Delete this reply?")) return;

    const postId = getPostId(post);
    const updatedReplies = deleteReplyTree(post.replies || [], replyId);

    setPosts((prev) =>
      prev.map((p) =>
        getPostId(p) === postId ? { ...p, replies: updatedReplies } : p
      )
    );

    await updatePostOnBackend(post, { replies: updatedReplies });
  };

  const markSolved = async (post) => {
    const postId = getPostId(post);

    setPosts((prev) =>
      prev.map((p) =>
        getPostId(p) === postId ? { ...p, status: "resolved" } : p
      )
    );

    await updatePostOnBackend(post, { status: "resolved" });
  };

  const handlePostCreated = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  const handleShare = async (post) => {
    const postId = getPostId(post);
    const shareText = `${post.title}\n\n${post.description || ""}`;
    const shareUrl = `${window.location.origin}/posts#${postId}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: post.title || "AgriConnect Post",
          text: shareText,
          url: shareUrl,
        });
        return;
      }

      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      alert("Post link copied!");
    } catch {
      alert("Could not share this post.");
    }
  };

  const clearFilters = () => {
    setSearch("");
    setRegion("");
    setRoleFilter("");
    setCropFilter("");
    setTab("trending");
  };

  const totalReplies = posts.reduce(
    (sum, post) => sum + (post.replies?.length || 0),
    0
  );

  const openIssues = posts.filter((post) => post.status === "open").length;

  const solvedIssues = posts.filter((post) => post.status === "resolved").length;

  const tabs = [
    { key: "all", label: "All Posts", icon: FileText },
    { key: "trending", label: "Trending", icon: TrendingUp },
    { key: "recent", label: "Recent", icon: Clock },
    { key: "unanswered", label: "Unanswered", icon: AlertCircle },
    { key: "solved", label: "Solved", icon: CheckCircle },
  ];

  return (
    <div className="min-h-screen bg-[#f5f7f6] pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="rounded-3xl bg-gradient-to-br from-green-700 via-emerald-700 to-green-800 p-7 text-white shadow-lg mb-1 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>

          <div className="relative flex items-end justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">Posts</h1>
              <p className="text-green-100 text-sm leading-relaxed max-w-md">
                Connect with farmers, experts, and buyers across India to solve
                problems and grow together.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowCreateModal(true)}
              className="px-5 py-3 rounded-2xl bg-white text-green-700 font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition flex items-center gap-2"
            >
              <Plus size={17} /> Create Post
            </button>
          </div>
        </div>

        <div className="bg-white rounded-b-3xl shadow-sm border border-gray-100 border-t-0 px-7 py-4 mb-5 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { num: posts.length, label: "Total Posts" },
            { num: totalReplies, label: "Helpful Replies" },
            { num: openIssues, label: "Open Issues" },
            { num: solvedIssues, label: "Solved Issues" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="font-bold text-gray-900 text-base">
                {stat.num}
              </div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 mb-5">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_180px_180px_auto] gap-3 items-center">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search crop problem, crop name, farmer..."
                className="w-full pl-11 pr-9 py-2.5 rounded-xl bg-gray-50 border border-transparent text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />

              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white cursor-pointer appearance-none"
              >
                <option value="">All States</option>
                {indianStates.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white cursor-pointer"
            >
              <option value="">All Users</option>
              <option value="farmer">Farmers</option>
              <option value="buyer">Buyers</option>
              <option value="agronomist">Agronomists</option>
              <option value="vendor">Vendors</option>
            </select>

            <button
              type="button"
              onClick={clearFilters}
              className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50"
            >
              Clear
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-1.5 overflow-x-auto">
            {tabs.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                type="button"
                onClick={() => setTab(key)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition whitespace-nowrap ${
                  tab === key
                    ? "bg-green-600 text-white shadow-sm"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                <Icon size={14} /> {label}
              </button>
            ))}
          </div>

          <span className="text-xs text-gray-500 font-semibold px-3 py-1 bg-gray-100 rounded-full">
            {sortedPosts.length} POSTS FOUND
          </span>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[240px_1fr_280px] gap-5 items-start">
          <aside className="space-y-4 xl:sticky xl:top-24">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
              <div className="flex items-start gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                <h3 className="text-xs font-bold text-red-700 uppercase tracking-wide">
                  Urgent Alert
                </h3>
              </div>

              <p className="text-xs text-red-900 leading-relaxed">
                Heavy rain expected in {region || "your area"} — High risk of
                fungal infection for potato crops.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wide">
                  Emerging Problems
                </h3>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {emergingTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setSearch(tag.replace("#", ""))}
                    className="px-2.5 py-1 rounded-md bg-gray-100 hover:bg-green-100 hover:text-green-700 text-[11px] font-semibold text-gray-700 transition"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle className="w-4 h-4 text-orange-500" />
                <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wide">
                  Common Problems
                </h3>
              </div>

              <div className="space-y-1">
                {commonProblems.map((problem) => (
                  <button
                    key={problem}
                    type="button"
                    onClick={() => setSearch(problem)}
                    className="w-full flex items-center justify-between px-2 py-2 rounded-lg hover:bg-gray-50 text-sm text-gray-700 transition"
                  >
                    <span>{problem}</span>
                    <ChevronRight size={14} className="text-gray-300" />
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-3">
                Crop Filter
              </h3>

              <div className="grid grid-cols-2 gap-2">
                {cropFilters.map((crop) => (
                  <button
                    key={crop}
                    type="button"
                    onClick={() =>
                      setCropFilter(cropFilter === crop ? "" : crop)
                    }
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                      cropFilter === crop
                        ? "bg-green-600 text-white shadow-sm"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {crop}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <main className="space-y-5">
            {loading ? (
              <div className="bg-white rounded-2xl shadow-sm p-12 text-center border border-gray-100">
                <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-sm text-gray-400 mt-4">Loading posts...</p>
              </div>
            ) : sortedPosts.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm p-12 text-center border border-gray-100">
                <ImageIcon className="w-14 h-14 text-gray-300 mx-auto mb-3" />

                <p className="font-bold text-gray-800 text-lg">
                  {search ? `No results for "${search}"` : "No posts yet"}
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  Be the first to share!
                </p>

                <button
                  type="button"
                  onClick={() => setShowCreateModal(true)}
                  className="mt-4 px-5 py-2.5 bg-green-600 text-white rounded-xl text-sm font-semibold hover:bg-green-700"
                >
                  + Create First Post
                </button>
              </div>
           ) : (
  <>
    {visiblePosts.map((post) => {
                const postId = getPostId(post);
                const photos = getPhotos(post);
                const photo = photos[0];
                const role = post.farmerRole || post.role || "farmer";
                const ptype = (post.postType || "problem").toLowerCase();
                const ptypeInfo = postTypes[ptype] || postTypes.problem;
                const isOwner =
                  user?.id === post.farmerId ||
                  user?._id === post.farmerId ||
                  user?.email === post.farmerEmail;

                return (
                  <article
                    key={postId}
                    id={postId}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition"
                  >
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                              {(post.farmerName || "U").charAt(0).toUpperCase()}
                            </div>

                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                          </div>

                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-bold text-gray-900 text-sm">
                                {post.farmerName || "User"}
                              </span>

                              <span
                                className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                                  roleBadges[role]?.color ||
                                  roleBadges.farmer.color
                                }`}
                              >
                                {roleBadges[role]?.label || "FARMER"}
                              </span>

                              <span
                                className={`px-1.5 py-0.5 rounded text-[9px] font-bold border ${ptypeInfo.color}`}
                              >
                                {ptypeInfo.label}
                              </span>
                            </div>

                            <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                              <MapPin size={10} />
                              <span>{post.location || "India"}</span>
                              <span>·</span>
                              <span>{timeAgo(post.postedAt || post.createdAt)}</span>
                            </div>
                          </div>
                        </div>

                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 ${
                            post.status === "open"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              post.status === "open"
                                ? "bg-green-500"
                                : "bg-gray-500"
                            }`}
                          ></span>
                          {post.status === "open" ? "OPEN" : "RESOLVED"}
                        </span>
                      </div>

                      <h2 className="text-xl font-bold text-gray-900 leading-snug mb-3">
                        {post.title || "Untitled"}
                      </h2>

                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {post.urgency && (
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                              post.urgency === "critical"
                                ? "bg-red-100 text-red-700 border-red-200"
                                : post.urgency === "high"
                                ? "bg-orange-100 text-orange-700 border-orange-200"
                                : post.urgency === "medium"
                                ? "bg-yellow-100 text-yellow-700 border-yellow-200"
                                : "bg-green-100 text-green-700 border-green-200"
                            }`}
                          >
                            {post.urgency.toUpperCase()}
                          </span>
                        )}

                        {post.cropName && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-orange-50 text-orange-700 border border-orange-200">
                            {post.cropName.toUpperCase()}
                          </span>
                        )}

                        {post.category && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
                            {post.category.toUpperCase()}
                          </span>
                        )}
                      </div>

                      <p className="text-sm text-gray-700 leading-relaxed mb-3">
                        {post.description}
                      </p>

                      {photo && (
                        <div
                          className="relative rounded-2xl overflow-hidden mb-3 cursor-pointer"
                          onClick={() => window.open(photo, "_blank")}
                        >
                          <img
                            src={photo}
                            alt={post.title || "Post image"}
                            className="w-full h-72 object-cover hover:scale-105 transition duration-700"
                          />

                          {photos.length > 1 && (
                            <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur text-white text-xs font-semibold flex items-center gap-1">
                              <ImageIcon size={12} /> {photos.length} Photos
                            </div>
                          )}
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2 mb-3 text-xs">
                        {post.cropName && (
                          <button
                            type="button"
                            onClick={() => setCropFilter(post.cropName)}
                            className="text-green-600 font-semibold cursor-pointer hover:underline"
                          >
                            #{post.cropName.toLowerCase()}
                          </button>
                        )}

                        <span className="text-green-600 font-semibold">
                          #cropcare
                        </span>

                        <span className="text-green-600 font-semibold">
                          #agriconnect
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-gray-100 gap-2 flex-wrap">
                        <div className="flex items-center gap-1 flex-wrap">
                          <button
                            type="button"
                            onClick={() => handleVote(post, "up")}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition ${
                              userVotes[postId] === "up"
                                ? "bg-green-50 text-green-700"
                                : "text-gray-600 hover:bg-gray-100"
                            }`}
                          >
                            👍 {post.upvotes || 0}
                          </button>

                          <button
                            type="button"
                            onClick={() => handleVote(post, "down")}
                            className={`p-1.5 rounded-lg transition ${
                              userVotes[postId] === "down"
                                ? "bg-red-50 text-red-500"
                                : "text-gray-500 hover:bg-gray-100"
                            }`}
                            aria-label="Downvote post"
                          >
                            👎
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              setOpenReplies((prev) => ({
                                ...prev,
                                [postId]: !prev[postId],
                              }))
                            }
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-gray-600 hover:bg-gray-100 text-sm font-semibold transition"
                          >
                            <MessageCircle size={14} />
                            {post.replies?.length || 0}{" "}
                            {post.replies?.length === 1 ? "Reply" : "Replies"}
                          </button>

                          {post.status === "open" && (
                            <button
                              type="button"
                              onClick={() => markSolved(post)}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-green-600 hover:bg-green-50 text-sm font-semibold transition"
                            >
                              <CheckCircle size={14} /> Mark Solved
                            </button>
                          )}
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleShare(post)}
                            className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100"
                            aria-label="Share post"
                          >
                            <Share2 size={15} />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              setBookmarked((prev) => ({
                                ...prev,
                                [postId]: !prev[postId],
                              }))
                            }
                            className={`p-1.5 rounded-lg transition ${
                              bookmarked[postId]
                                ? "text-yellow-500 bg-yellow-50"
                                : "text-gray-400 hover:bg-gray-100"
                            }`}
                            aria-label="Bookmark post"
                          >
                            <Bookmark
                              size={15}
                              fill={bookmarked[postId] ? "currentColor" : "none"}
                            />
                          </button>

                          {isOwner && (
                            <button
                              type="button"
                              onClick={() => handleDeletePost(post)}
                              className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600"
                              aria-label="Delete post"
                            >
                              <Trash2 size={15} />
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="mt-4 flex gap-2">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                          {(user.name || "G").charAt(0).toUpperCase()}
                        </div>

                        <input
                          value={replyInputs[postId] || ""}
                          onChange={(e) =>
                            setReplyInputs((prev) => ({
                              ...prev,
                              [postId]: e.target.value,
                            }))
                          }
                          onKeyDown={(e) => e.key === "Enter" && addReply(post)}
                          placeholder="Add your advice or ask a question..."
                          className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>

                      <div className="flex justify-end mt-2">
                        <button
                          type="button"
                          onClick={() => addReply(post)}
                          disabled={!replyInputs[postId]?.trim()}
                          className="px-5 py-2 rounded-xl bg-gradient-to-br from-green-700 to-emerald-800 text-white text-sm font-semibold disabled:opacity-40 hover:shadow-lg transition flex items-center gap-1.5"
                        >
                          <Send size={14} /> Post Reply
                        </button>
                      </div>

                      {openReplies[postId] && post.replies?.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                          {[...post.replies]
                            .sort(
                              (a, b) =>
                                (b.upvotes || 0) -
                                (b.downvotes || 0) -
                                ((a.upvotes || 0) - (a.downvotes || 0))
                            )
                            .map((reply) => (
                              <ReplyItem
                                key={reply.id}
                                reply={reply}
                                postId={postId}
                                depth={0}
                                onVote={(replyId, type) =>
                                  voteReply(post, replyId, type)
                                }
                                onReply={(parentId, text) =>
                                  addNestedReply(post, parentId, text)
                                }
                                onDelete={(replyId) => deleteReply(post, replyId)}
                                replyVotes={replyVotes}
                                currentUser={user}
                              />
                            ))}
                        </div>
                      )}

                      {!openReplies[postId] &&
                        post.replies?.find((reply) => reply.role === "agronomist") && (
                          <div className="mt-4 pt-4 border-t border-gray-100">
                            <ReplyItem
                              reply={post.replies.find(
                                (reply) => reply.role === "agronomist"
                              )}
                              postId={postId}
                              depth={0}
                              onVote={(replyId, type) =>
                                voteReply(post, replyId, type)
                              }
                              onReply={(parentId, text) =>
                                addNestedReply(post, parentId, text)
                              }
                              onDelete={(replyId) => deleteReply(post, replyId)}
                              replyVotes={replyVotes}
                              currentUser={user}
                            />
                          </div>
                        )}
                    </div>
                  </article>
                );
                            })}

    {!isLoggedIn && hiddenPostsCount > 0 && <LoginFirstCard />}
  </>
)}
          </main>

          <aside className="space-y-4 xl:sticky xl:top-24">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-3">
                Live Mandi Prices
              </h3>

              <div className="space-y-2">
                {mandiPrices.map((item) => (
                  <div
                    key={item.crop}
                    className="flex items-center justify-between px-3 py-2 rounded-xl bg-green-50 border border-green-100"
                  >
                    <span className="text-sm font-bold text-gray-800">
                      {item.crop}
                    </span>
                    <span className="text-sm font-black text-green-700">
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-3">
                Recommended Schemes
              </h3>

              {recommendedSchemes.map((scheme) => (
                <div
                  key={scheme.name}
                  className="rounded-xl border border-amber-100 bg-amber-50 p-3"
                >
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-bold text-gray-900">
                      {scheme.name}
                    </p>
                    <span className="text-[10px] font-black text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                      {scheme.status}
                    </span>
                  </div>

                  <p className="text-xs text-gray-600 leading-relaxed">
                    {scheme.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-green-700 to-emerald-800 rounded-2xl shadow-sm p-5 text-white">
              <h3 className="font-bold mb-2">Need expert help?</h3>
              <p className="text-green-100 text-sm leading-relaxed mb-4">
                Post your crop problem with photos and get replies from the
                community.
              </p>

              <button
                type="button"
                onClick={() => setShowCreateModal(true)}
                className="w-full py-2.5 rounded-xl bg-white text-green-700 font-bold hover:bg-green-50 transition"
              >
                Create Post
              </button>
            </div>
          </aside>
        </div>
      </div>

      <CreatePostModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreated={handlePostCreated}
        user={user}
      />
    </div>
  );
};

export default Posts;