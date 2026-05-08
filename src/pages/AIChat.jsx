import { useState } from "react";
import { MdSmartToy } from "react-icons/md";

const fallbackReply = (text) => {
  const msg = text.toLowerCase();
  if (msg.includes("price") || msg.includes("market")) {
    return "Ask about local mandi rates, or post a problem to get buyer and pricing guidance.";
  }
  if (msg.includes("weather")) {
    return "Check your local forecast and use our weather tools. Protect crops if rain is expected.";
  }
  if (msg.includes("login") || msg.includes("register") || msg.includes("account")) {
    return "Use the Login page to sign in or register. After login, your dashboard and profile options become available.";
  }
  if (msg.includes("crop") || msg.includes("soil") || msg.includes("pest") || msg.includes("disease")) {
    return "Describe your crop and symptoms in the Post Problem section to receive expert guidance.";
  }
  if (msg.includes("help") || msg.includes("support")) {
    return "I can help with farming tips, weather advice, markets, and app navigation. Ask me a question.";
  }
  return "I can help with farming, weather, marketplace, and login questions. Ask me anything about your crops or the app.";
};

function AIChat() {
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([
    { sender: "bot", text: "Hello! I am your AgriConnect assistant. Ask me about crops, weather, markets, or how to use the app." },
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = message.trim();
    setHistory((prev) => [...prev, { sender: "user", text: userMessage }]);
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!res.ok) throw new Error("AI service unavailable");
      const data = await res.json();
      setHistory((prev) => [...prev, { sender: "bot", text: data.reply || fallbackReply(userMessage) }]);
    } catch (error) {
      setHistory((prev) => [...prev, { sender: "bot", text: fallbackReply(userMessage) }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-earth-50 pt-28 pb-12 px-4 dark:bg-slate-950">
      <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-earth-200 dark:border-slate-700 overflow-hidden">
        <div className="bg-leaf-600 dark:bg-emerald-700 px-6 py-6 text-white">
          <h1 className="text-3xl font-bold flex items-center gap-2"><MdSmartToy />AI Assistant</h1>
          <p className="mt-2 text-sm text-white/90">Ask farming questions, weather tips, marketplace guidance, or app help.</p>
        </div>

        <div className="px-6 py-5">
          <div className="space-y-4 max-h-[420px] overflow-y-auto pb-4">
            {history.map((item, index) => (
              <div key={index} className={`flex ${item.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] rounded-3xl px-4 py-3 text-sm ${item.sender === "user" ? "bg-leaf-500 text-white" : "bg-earth-100 text-earth-900 dark:bg-slate-800 dark:text-slate-100"}`}>
                  {item.text}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <div className="flex gap-3">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your question..."
                className="flex-1 rounded-2xl border border-earth-200 bg-earth-50 px-4 py-3 text-sm outline-none transition focus:border-leaf-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              />
              <button
                type="button"
                onClick={sendMessage}
                disabled={loading}
                className="rounded-2xl bg-leaf-500 px-5 py-3 text-sm font-semibold text-white hover:bg-leaf-600 transition disabled:opacity-60"
              >
                {loading ? "Thinking..." : "Send"}
              </button>
            </div>
            <p className="mt-3 text-xs text-earth-500 dark:text-slate-400">Tip: ask about crops, pests, soil, weather, pricing, or how to use AgriConnect.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AIChat;
