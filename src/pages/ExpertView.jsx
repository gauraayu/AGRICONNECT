import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API = "http://localhost:5000";

const categoryColors = {
  crop:       "bg-green-100 text-green-700",
  soil:       "bg-yellow-100 text-yellow-700",
  pest:       "bg-red-100 text-red-700",
  irrigation: "bg-blue-100 text-blue-700",
  weather:    "bg-sky-100 text-sky-700",
  equipment:  "bg-purple-100 text-purple-700",
  other:      "bg-gray-100 text-gray-700",
};

const urgencyColors = {
  low:      "bg-green-50 text-green-600 border-green-200",
  medium:   "bg-yellow-50 text-yellow-600 border-yellow-200",
  high:     "bg-orange-50 text-orange-600 border-orange-200",
  critical: "bg-red-50 text-red-600 border-red-200",
};

const ExpertView = ({ darkMode }) => {
  const stored = localStorage.getItem("agriUser");
  const user   = stored ? JSON.parse(stored) : null;

  const [problems,   setProblems]   = useState([]);
  const [fetching,   setFetching]   = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [replyText,  setReplyText]  = useState({});
  const [filter,     setFilter]     = useState("all");
  const [search,     setSearch]     = useState("");
  const [fullPhoto,  setFullPhoto]  = useState(null);
  const [replySuccess, setReplySuccess] = useState({});

  useEffect(() => {
    fetchProblems();
    const interval = setInterval(fetchProblems, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchProblems = async () => {
    setFetching(true);
    try {
      const { data } = await axios.get(`${API}/problems`);
      setProblems(data.reverse());
    } catch {
      setProblems([]);
    }
    setFetching(false);
  };

  const handleReply = async (problem) => {
    const text = replyText[problem.id];
    if (!text?.trim()) return;
    const newReply = {
      id:        Date.now(),
      text,
      author:    user?.name || "Expert",
      role:      user?.role || "agronomist",
      repliedAt: new Date().toISOString(),
    };
    try {
      await axios.patch(`${API}/problems/${problem.id}`, {
        replies: [...(problem.replies || []), newReply],
        status:  "resolved",
      });
      setReplyText({ ...replyText, [problem.id]: "" });
      setReplySuccess({ ...replySuccess, [problem.id]: true });
      setTimeout(() => {
        setReplySuccess((prev) => ({ ...prev, [problem.id]: false }));
      }, 3000);
      fetchProblems();
    } catch {}
  };

  const timeAgo = (iso) => {
    const diff = Math.floor((Date.now() - new Date(iso)) / 1000);
    if (diff < 60)    return `${diff}s ago`;
    if (diff < 3600)  return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  const filtered = problems.filter((p) => {
    const matchFilter =
      filter === "all"      ? true :
      filter === "open"     ? p.status === "open" :
      filter === "resolved" ? p.status === "resolved" :
      p.urgency === filter;
    const matchSearch =
      p.title?.toLowerCase().includes(search.toLowerCase()) ||
      p.farmerName?.toLowerCase().includes(search.toLowerCase()) ||
      p.description?.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const bg    = darkMode ? "bg-gray-950"  : "bg-earth-50";
  const card  = darkMode ? "bg-gray-900"  : "bg-white";
  const text  = darkMode ? "text-gray-100": "text-earth-900";
  const subtext = darkMode ? "text-gray-400" : "text-earth-500";
  const border  = darkMode ? "border-gray-700" : "border-earth-100";
  const input   = darkMode
    ? "bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500 focus:border-leaf-500"
    : "bg-white border-earth-200 text-earth-800 placeholder-gray-400 focus:border-leaf-500";

  return (
    <div className={`min-h-screen ${bg} pt-28 pb-12`}>

      {/* ── Full Photo Modal ── */}
      {fullPhoto && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setFullPhoto(null)}
        >
          <div className="relative max-w-3xl w-full">
            <img src={fullPhoto} alt="Full" className="w-full rounded-2xl shadow-2xl" />
            <button
              onClick={() => setFullPhoto(null)}
              className="absolute top-3 right-3 w-10 h-10 bg-white/20 hover:bg-white/40 text-white rounded-full flex items-center justify-center font-bold text-xl"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4">

        {/* ── Welcome Banner ── */}
        <div className={`${card} rounded-3xl shadow-xl border ${border} p-6 mb-6`}
          style={{ background: darkMode ? undefined : "linear-gradient(135deg, #0e5a20, #3f3018)" }}
        >
          <div className="flex items-center gap-4 flex-wrap">
            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-4xl flex-shrink-0">
              🔬
            </div>
            <div className="flex-1">
              <h1 className="font-display font-bold text-2xl text-white">
                Welcome, {user?.name}! 👋
              </h1>
              <p className="text-white/70 text-sm mt-1">
                You are logged in as <span className="font-bold text-green-300 capitalize">{user?.role}</span> — Review farmer problems and provide expert guidance
              </p>
            </div>
            <div className="flex gap-3">
              {[
                { label: "Total",    value: problems.length,                                     color: "bg-white/20 text-white" },
                { label: "Open",     value: problems.filter(p => p.status === "open").length,     color: "bg-orange-500/80 text-white" },
                { label: "Resolved", value: problems.filter(p => p.status === "resolved").length, color: "bg-green-500/80 text-white" },
              ].map(({ label, value, color }) => (
                <div key={label} className={`text-center px-4 py-2 rounded-xl ${color}`}>
                  <div className="text-xl font-black">{value}</div>
                  <div className="text-xs font-semibold opacity-80">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5 pt-5 border-t border-white/20">
            {[
              { icon: "🚨", label: "Critical",  value: problems.filter(p => p.urgency === "critical").length, color: "text-red-300" },
              { icon: "🟠", label: "High",      value: problems.filter(p => p.urgency === "high").length,     color: "text-orange-300" },
              { icon: "📷", label: "With Photo",value: problems.filter(p => p.photo).length,                  color: "text-blue-300" },
              { icon: "💬", label: "Replies",   value: problems.reduce((a, p) => a + (p.replies?.length || 0), 0), color: "text-green-300" },
            ].map(({ icon, label, value, color }) => (
              <div key={label} className="text-center p-2 bg-white/10 rounded-xl">
                <div className="text-lg">{icon}</div>
                <div className={`text-lg font-black ${color}`}>{value}</div>
                <div className="text-white/60 text-xs">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Search + Filter ── */}
        <div className={`${card} rounded-2xl shadow-sm border ${border} p-4 mb-5 space-y-3`}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="🔍 Search by title, farmer name, or description..."
            className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-leaf-500/20 transition-all ${input}`}
          />
          <div className="flex flex-wrap gap-2">
            {[
              { key: "all",      label: "All",      count: problems.length },
              { key: "open",     label: "Open",     count: problems.filter(p => p.status === "open").length },
              { key: "resolved", label: "Resolved", count: problems.filter(p => p.status === "resolved").length },
              { key: "critical", label: "🔴 Critical", count: problems.filter(p => p.urgency === "critical").length },
              { key: "high",     label: "🟠 High",  count: problems.filter(p => p.urgency === "high").length },
              { key: "medium",   label: "🟡 Medium",count: problems.filter(p => p.urgency === "medium").length },
              { key: "low",      label: "🟢 Low",   count: problems.filter(p => p.urgency === "low").length },
            ].map(({ key, label, count }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                  filter === key
                    ? "bg-leaf-500 text-white shadow-md"
                    : darkMode
                      ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      : "bg-earth-100 text-earth-500 hover:bg-earth-200"
                }`}
              >
                {label} ({count})
              </button>
            ))}
          </div>
        </div>

        {/* ── Refresh Button ── */}
        <button
          onClick={fetchProblems}
          className="w-full mb-5 py-2.5 border border-leaf-500/30 rounded-xl text-leaf-600 text-sm font-semibold hover:bg-leaf-50 transition-all flex items-center justify-center gap-2"
        >
          🔄 Refresh Problems
        </button>

        {/* ── Problems Feed ── */}
        {fetching ? (
          <div className={`text-center py-20 ${card} rounded-3xl border ${border}`}>
            <div className="text-4xl mb-3 animate-bounce">🔬</div>
            <p className={`${subtext} font-semibold`}>Loading farmer problems...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className={`text-center py-20 ${card} rounded-3xl border ${border}`}>
            <div className="text-5xl mb-4">🌾</div>
            <p className={`${subtext} font-semibold`}>
              {search ? `No results for "${search}"` : "No problems found."}
            </p>
            {search && (
              <button
                onClick={() => setSearch("")}
                className="mt-3 text-leaf-600 text-sm font-bold hover:text-leaf-500"
              >
                Clear search ✕
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-5">
            {filtered.map((problem) => (
              <div
                key={problem.id}
                className={`${card} rounded-3xl border shadow-sm hover:shadow-lg transition-all ${
                  problem.urgency === "critical" && problem.status === "open"
                    ? "border-red-400 ring-1 ring-red-300"
                    : problem.status === "resolved"
                    ? darkMode ? "border-green-800" : "border-green-200"
                    : border
                }`}
              >
                <div className="p-5">

                  {/* ── Top Row ── */}
                  <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full bg-amber-100 flex items-center justify-center text-xl flex-shrink-0">
                        👨‍🌾
                      </div>
                      <div>
                        <div className={`text-sm font-bold ${text}`}>
                          {problem.farmerName}
                        </div>
                        <div className={`text-xs ${subtext}`}>
                          {problem.location && `📍 ${problem.location} • `}
                          🕐 {timeAgo(problem.postedAt)}
                        </div>
                        {problem.farmerEmail && (
                          <div className={`text-xs ${subtext}`}>
                            ✉️ {problem.farmerEmail}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 flex-wrap justify-end">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${categoryColors[problem.category] || "bg-gray-100 text-gray-600"}`}>
                        {problem.category}
                      </span>
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${urgencyColors[problem.urgency] || ""}`}>
                        {problem.urgency}
                      </span>
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                        problem.status === "open"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-green-100 text-green-700"
                      }`}>
                        {problem.status === "open" ? "🟡 Open" : "✅ Resolved"}
                      </span>
                    </div>
                  </div>

                  {/* ── Title ── */}
                  <h3 className={`font-display font-bold text-lg mb-2 leading-snug ${text}`}>
                    {problem.title}
                  </h3>

                  {/* ── Crop Tag ── */}
                  {problem.cropName && (
                    <span className="inline-block text-xs font-semibold bg-amber-100 text-amber-700 px-3 py-1 rounded-full mb-3">
                      🌾 {problem.cropName}
                    </span>
                  )}

                  {/* ── Photo ── */}
                  {problem.photo && (
                    <div
                      className={`mb-3 rounded-2xl overflow-hidden border cursor-pointer ${border}`}
                      onClick={() => setFullPhoto(problem.photo)}
                    >
                      <img
                        src={problem.photo}
                        alt="Problem"
                        className="w-full max-h-64 object-cover hover:opacity-90 transition-opacity"
                      />
                      <div className={`px-3 py-1.5 text-xs font-medium flex items-center gap-1 ${
                        darkMode ? "bg-gray-800 text-gray-400" : "bg-earth-50 text-earth-400"
                      }`}>
                        🔍 Click to view full image
                      </div>
                    </div>
                  )}

                  {/* ── Description ── */}
                  <p className={`text-sm leading-relaxed ${
                    expandedId === problem.id ? "" : "line-clamp-3"
                  } ${subtext}`}>
                    {problem.description}
                  </p>
                  {problem.description?.length > 200 && (
                    <button
                      onClick={() => setExpandedId(expandedId === problem.id ? null : problem.id)}
                      className="text-leaf-600 text-xs font-bold mt-1 hover:text-leaf-500"
                    >
                      {expandedId === problem.id ? "Show less ▲" : "Read more ▼"}
                    </button>
                  )}

                  {/* ── Stats ── */}
                  <div className={`flex items-center gap-4 mt-4 pt-3 border-t text-sm ${border}`}>
                    <span className={subtext}>👍 {problem.likes || 0}</span>
                    <span className={subtext}>💬 {problem.replies?.length || 0} Replies</span>
                    {problem.photo && <span className={subtext}>📷 Photo</span>}
                    <button
                      onClick={() => setExpandedId(expandedId === problem.id ? null : problem.id)}
                      className="ml-auto px-4 py-1.5 bg-leaf-500 hover:bg-leaf-400 text-white font-bold text-xs rounded-full transition-all"
                    >
                      {expandedId === problem.id ? "▲ Hide" : "💬 View & Reply"}
                    </button>
                  </div>

                  {/* ── Expanded Replies + Reply Box ── */}
                  {expandedId === problem.id && (
                    <div className="mt-4 space-y-3">

                      {/* Existing Replies */}
                      {problem.replies?.length > 0 ? (
                        problem.replies.map((reply) => (
                          <div
                            key={reply.id}
                            className={`flex gap-3 rounded-2xl p-3 ${
                              reply.role === "agronomist"
                                ? darkMode
                                  ? "bg-blue-900/30 border border-blue-800"
                                  : "bg-blue-50 border border-blue-100"
                                : darkMode
                                  ? "bg-gray-800"
                                  : "bg-earth-50"
                            }`}
                          >
                            <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-base flex-shrink-0">
                              {reply.role === "agronomist" ? "🔬" : "👨‍🌾"}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className={`text-sm font-bold ${text}`}>{reply.author}</span>
                                {reply.role === "agronomist" && (
                                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">
                                    ✓ Expert
                                  </span>
                                )}
                                <span className={`text-xs ${subtext}`}>{timeAgo(reply.repliedAt)}</span>
                              </div>
                              <p className={`text-sm mt-1 leading-relaxed ${
                                darkMode ? "text-gray-300" : "text-earth-700"
                              }`}>
                                {reply.text}
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className={`text-center py-4 rounded-2xl ${
                          darkMode ? "bg-gray-800" : "bg-earth-50"
                        }`}>
                          <p className={`text-sm ${subtext}`}>
                            No replies yet — be the first expert to help! 🔬
                          </p>
                        </div>
                      )}

                      {/* Success Message */}
                      {replySuccess[problem.id] && (
                        <div className="px-4 py-3 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm font-semibold text-center">
                          ✅ Reply sent successfully! Problem marked as resolved.
                        </div>
                      )}

                      {/* Expert Reply Box */}
                      <div className={`rounded-2xl p-4 border ${
                        darkMode
                          ? "bg-blue-900/20 border-blue-800"
                          : "bg-blue-50 border-blue-100"
                      }`}>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-lg">🔬</span>
                          <p className="text-xs font-bold text-blue-700 uppercase tracking-wide">
                            Your Expert Reply
                          </p>
                          <span className="ml-auto text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-semibold">
                            {user?.name}
                          </span>
                        </div>
                        <textarea
                          value={replyText[problem.id] || ""}
                          onChange={(e) =>
                            setReplyText({ ...replyText, [problem.id]: e.target.value })
                          }
                          placeholder="Write your expert advice... Be specific about the diagnosis and solution."
                          rows={4}
                          className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all resize-none ${
                            darkMode
                              ? "bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500"
                              : "bg-white border-blue-200 text-earth-800 placeholder-gray-400"
                          }`}
                        />
                        <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
                          <p className={`text-xs ${darkMode ? "text-blue-400" : "text-blue-500"}`}>
                            💡 Your reply will mark this problem as resolved
                          </p>
                          <button
                            onClick={() => handleReply(problem)}
                            disabled={!replyText[problem.id]?.trim()}
                            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl transition-all hover:-translate-y-0.5 shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
                          >
                            Send Expert Reply 🔬
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpertView;