import axios from 'axios';
import React, { useState } from 'react'
import { FiCopy, FiPlus, FiTrash2, FiCheck, FiSettings, FiCode, FiLayers, FiArrowUpRight, FiExternalLink } from 'react-icons/fi';
import { CLIENT_URL, ServerUrl } from '../App';
import toast from 'react-hot-toast';
import { RetroStar } from '../Components/Mascots/MarqueeTicker';

const THEMES = [
  { id: "light", label: "Light Clean", color: "bg-white" },
  { id: "dark", label: "Dark Cyber", color: "bg-[#0B0F19] text-white" },
  { id: "glass", label: "Glassmorphism", color: "bg-cyan-900 text-cyan-200" },
  { id: "neon", label: "Electric Neon", color: "bg-[#061A12] text-[#DBFF43]" },
];

const TONES = [
  { id: "friendly", label: "Friendly & Casual", desc: "Warm, empathetic and conversational" },
  { id: "professional", label: "Professional & Direct", desc: "Crisp, business-oriented and concise" },
  { id: "sales", label: "Sales & Conversion", desc: "Persuasive, upbeat and action-focused" },
];

function Builder({ user, setUser }) {
  const [editAssistant, setEditAssistant] = useState(!user?.isSetupComplete)
  const [assistantName, setAssistantName] = useState(user?.assistantName || "");
  const [businessName, setBusinessName] = useState(user?.businessName || "");
  const [businessType, setBusinessType] = useState(user?.businessType || "");
  const [businessDescription, setBusinessDescription] = useState(user?.businessDescription || "");
  const [theme, setTheme] = useState(user?.theme || "dark");
  const [tone, setTone] = useState(user?.tone || "friendly");
  const [geminiApiKey, setGeminiApiKey] = useState(user?.geminiApiKey || "");
  const [pages, setPages] = useState(user?.pages || []);
  const [pageName, setPageName] = useState("");
  const [pagePath, setPagePath] = useState("");
  const [pageKeywords, setPageKeywords] = useState("");
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const addPage = () => {
    if (!pageName || !pagePath) {
      toast.error("Please provide page name and path");
      return;
    }

    const newPage = {
      name: pageName,
      path: pagePath,
      keywords: pageKeywords ? pageKeywords.split(",").map((k) => k.trim()) : [],
    }

    setPages([...pages, newPage])
    setPageName("")
    setPagePath("")
    setPageKeywords("")
    toast.success("Page added to voice navigation");
  }

  const removePage = (index) => {
    const updatePages = pages.filter((_, i) => i !== index)
    setPages(updatePages)
  }

  const saveAssistant = async () => {
    setLoading(true)
    try {
      const data = {
        assistantName,
        businessName,
        businessType,
        businessDescription,
        tone,
        theme,
        geminiApiKey,
        pages,
      }

      const res = await axios.post(ServerUrl + "/api/user/save-assistant", data, { withCredentials: true })
      setUser(res.data.user)
      setEditAssistant(false)
      toast.success("Assistant Saved Successfully! ✦")
      setLoading(false)
    } catch (error) {
      toast.error("Failed to save assistant")
      console.log(error)
      setLoading(false)
    }
  }

  const remainingMessages = Math.max(
    0,
    (user?.requestLimit || 0) - (user?.totalMessages || 0)
  );

  const remainingDays = user?.proExpiresAt
    ? Math.max(
        0,
        Math.ceil((new Date(user.proExpiresAt) - new Date()) / (1000 * 60 * 60 * 24))
      )
    : 0;

  const embedCode = `<script src="${CLIENT_URL}/assistant.js" data-user-id="${user?._id}" data-server-url="${ServerUrl}"></script>`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    toast.success("Embed script copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="min-h-screen bg-[#CBB5FE] px-4 py-8 text-black font-sans pb-20">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Title */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="neo-badge bg-[#DBFF43] text-black mb-2">
              <RetroStar size={12} />
              WORKSPACE CONTROLS
            </span>
            <h1 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-black">
              Assistant Builder
            </h1>
            <p className="text-sm sm:text-base font-bold text-gray-800 mt-1">
              Configure knowledge, appearance, and voice behavior for your website.
            </p>
          </div>

          {user?.isSetupComplete && !editAssistant && (
            <button
              onClick={() => setEditAssistant(true)}
              className="neo-btn neo-btn-white px-5 py-2.5 rounded-xl font-display font-black text-xs uppercase flex items-center gap-2 self-start"
            >
              <FiSettings size={15} />
              Edit Settings
            </button>
          )}
        </div>

        {/* --- VIEW MODE: SETUP IS COMPLETE & NOT EDITING --- */}
        {user?.isSetupComplete && !editAssistant && (
          <div className="space-y-6">
            
            {/* Assistant Overview Bento Card */}
            <div className="neo-card-lime p-6 sm:p-8 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="neo-badge bg-white text-black">
                  STATUS: DEPLOYED & ACTIVE
                </span>
                <span className="text-xl">✱</span>
              </div>

              <div className="mt-4">
                <p className="text-xs font-black uppercase text-gray-800 tracking-wider">Assistant Name</p>
                <h2 className="font-display font-black text-3xl sm:text-5xl uppercase text-black mt-1">
                  {user.assistantName}
                </h2>
                <p className="text-sm font-bold text-gray-800 mt-2 max-w-xl">
                  {user.businessDescription || "Your smart AI voice agent is active and ready to guide visitors."}
                </p>
              </div>

              {/* Bento Stats Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                
                {/* Plan Card */}
                <div className="bg-white border-2 border-black rounded-2xl p-4 shadow-[3px_3px_0px_#000]">
                  <p className="text-xs font-black text-gray-500 uppercase">Current Tier</p>
                  <h3 className="font-display font-black text-2xl text-black mt-1 uppercase">
                    {user?.plan}
                  </h3>
                  <span className="inline-block mt-2 text-[11px] font-extrabold uppercase px-2 py-0.5 rounded bg-[#DBFF43] border border-black">
                    {user?.plan === "pro" ? "Unlimited Power" : "200 Free Calls"}
                  </span>
                </div>

                {/* Gemini AI Status Card */}
                <div className="bg-white border-2 border-black rounded-2xl p-4 shadow-[3px_3px_0px_#000]">
                  <p className="text-xs font-black text-gray-500 uppercase">Gemini AI Model</p>
                  <h3 className={`font-display font-black text-2xl mt-1 uppercase ${
                    user?.geminiStatus === "active"
                      ? "text-emerald-700"
                      : user?.geminiStatus === "invalid"
                      ? "text-red-600"
                      : "text-amber-700"
                  }`}>
                    {user?.geminiStatus || "Active"}
                  </h3>
                  <p className="text-[11px] font-bold text-gray-600 mt-2">
                    {user?.geminiStatus === "active" ? "Connected & Healthy" : "Check API Key"}
                  </p>
                </div>

                {/* Usage Remaining */}
                <div className="bg-white border-2 border-black rounded-2xl p-4 shadow-[3px_3px_0px_#000]">
                  <p className="text-xs font-black text-gray-500 uppercase">
                    {user?.plan === "free" ? "Messages Left" : "Plan Expiry"}
                  </p>
                  <h3 className="font-display font-black text-2xl text-black mt-1">
                    {user?.plan === "free" ? remainingMessages : `${remainingDays} Days`}
                  </h3>
                  <p className="text-[11px] font-bold text-gray-600 mt-2">
                    {user?.plan === "free" ? "Refills on upgrade" : "Auto-renews"}
                  </p>
                </div>

              </div>
            </div>

            {/* Embed Instructions & Code Box */}
            <div className="neo-card p-6 sm:p-8 bg-white">
              
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-xl bg-[#DBFF43] border-2 border-black flex items-center justify-center font-black">
                  <FiCode size={16} />
                </div>
                <div>
                  <h3 className="font-display font-black text-xl uppercase text-black">
                    1-Line Website Embed
                  </h3>
                  <p className="text-xs font-bold text-gray-600">
                    Drop this tag before the closing <code className="font-mono bg-gray-100 px-1 py-0.5 rounded border border-black/20 font-bold">&lt;/body&gt;</code> tag on any webpage.
                  </p>
                </div>
              </div>

              {/* Code Box */}
              <div className="relative mt-4 border-2 border-black rounded-2xl overflow-hidden shadow-[4px_4px_0px_#000] bg-[#0d1117]">
                
                {/* Code Editor Header */}
                <div className="flex items-center justify-between px-4 py-2.5 bg-[#161b22] border-b-2 border-black text-xs font-mono text-gray-400 select-none">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-400 border border-black" />
                    <span className="w-3 h-3 rounded-full bg-amber-400 border border-black" />
                    <span className="w-3 h-3 rounded-full bg-emerald-400 border border-black" />
                    <span className="ml-2 font-bold text-gray-300">index.html</span>
                  </div>
                  <span className="text-[11px] text-[#DBFF43] font-bold">HTML SCRIPT</span>
                </div>

                {/* Code Content */}
                <div className="p-4 overflow-x-auto text-xs sm:text-sm font-mono text-emerald-300 leading-relaxed">
                  <pre>{embedCode}</pre>
                </div>

                {/* Copy Button */}
                <button
                  onClick={copyToClipboard}
                  className="absolute top-11 right-3 neo-btn neo-btn-lime px-3 py-1.5 rounded-xl font-display font-black text-xs uppercase flex items-center gap-1.5 cursor-pointer"
                >
                  {copied ? <FiCheck size={14} /> : <FiCopy size={14} />}
                  {copied ? "COPIED" : "COPY CODE"}
                </button>
              </div>

              {/* Visual HTML Snippet Helper */}
              <div className="mt-6 bg-[#FAF7FF] border-2 border-black rounded-2xl p-4 shadow-[2px_2px_0px_#000]">
                <p className="font-display font-black text-xs uppercase text-black">
                  Example Placement:
                </p>
                <pre className="mt-2 text-xs font-mono text-gray-800 overflow-x-auto bg-white p-3 rounded-xl border border-black/20">
{`<body>
  <!-- Your Website Content -->
  <h1>Welcome to my website</h1>

  <!-- Drop ZyraAI Assistant Tag Here -->
  ${embedCode}
</body>`}
                </pre>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setEditAssistant(true)}
                  className="neo-btn neo-btn-lime px-6 py-3 rounded-2xl font-display font-black text-sm uppercase flex items-center gap-2"
                >
                  Configure Assistant Settings
                  <FiArrowUpRight size={18} />
                </button>
              </div>

            </div>

          </div>
        )}

        {/* --- EDIT MODE: CONFIGURATION FORM --- */}
        {editAssistant && (
          <div className="space-y-6">
            
            {/* Section 1: Basic Information */}
            <div className="neo-card p-6 sm:p-8 bg-white">
              <div className="flex items-center justify-between pb-4 border-b-2 border-black mb-6">
                <div>
                  <span className="neo-badge bg-[#DBFF43] text-black mb-1">STEP 1</span>
                  <h2 className="font-display font-black text-2xl uppercase text-black">
                    Basic Identity
                  </h2>
                </div>
                <RetroStar size={20} className="text-black" />
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-black uppercase text-black mb-1.5">
                    Assistant Name *
                  </label>
                  <input
                    type="text"
                    value={assistantName}
                    onChange={(e) => setAssistantName(e.target.value)}
                    placeholder="e.g. Zyra, Nova, Alex"
                    className="w-full neo-input"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black uppercase text-black mb-1.5">
                      Business Name *
                    </label>
                    <input
                      type="text"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="e.g. Acme Studio, Nova Fashion"
                      className="w-full neo-input"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase text-black mb-1.5">
                      Business Type / Industry *
                    </label>
                    <input
                      type="text"
                      value={businessType}
                      onChange={(e) => setBusinessType(e.target.value)}
                      placeholder="e.g. SaaS, E-commerce, Design Agency"
                      className="w-full neo-input"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-black mb-1.5">
                    Business Description & Context *
                  </label>
                  <textarea
                    rows={4}
                    value={businessDescription}
                    onChange={(e) => setBusinessDescription(e.target.value)}
                    placeholder="Describe what your business does, your key services, pricing details, or special FAQ instructions so your assistant answers accurately."
                    className="w-full neo-input resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Appearance & Theme */}
            <div className="neo-card p-6 sm:p-8 bg-white">
              <div className="flex items-center justify-between pb-4 border-b-2 border-black mb-6">
                <div>
                  <span className="neo-badge bg-[#DBFF43] text-black mb-1">STEP 2</span>
                  <h2 className="font-display font-black text-2xl uppercase text-black">
                    Theme & Appearance
                  </h2>
                </div>
                <RetroStar size={20} className="text-black" />
              </div>

              <div>
                <p className="text-xs font-black uppercase text-black mb-3">
                  Widget Display Theme:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {THEMES.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setTheme(item.id)}
                      className={`p-4 rounded-2xl border-2 border-black text-left flex flex-col justify-between transition-all cursor-pointer ${
                        theme === item.id
                          ? "bg-[#DBFF43] shadow-[4px_4px_0px_#000] -translate-y-1"
                          : "bg-white hover:bg-gray-50 shadow-[2px_2px_0px_#000]"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-xl border border-black mb-3 flex items-center justify-center font-bold text-xs ${item.color}`}>
                        ✦
                      </div>
                      <div>
                        <p className="font-display font-black text-sm uppercase text-black">
                          {item.id}
                        </p>
                        <p className="text-[11px] font-bold text-gray-700">{item.label}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tone Selection */}
              <div className="mt-8">
                <p className="text-xs font-black uppercase text-black mb-3">
                  Assistant Personality & Tone:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {TONES.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setTone(item.id)}
                      className={`p-4 rounded-2xl border-2 border-black text-left transition-all cursor-pointer ${
                        tone === item.id
                          ? "bg-[#DBFF43] shadow-[4px_4px_0px_#000] -translate-y-1"
                          : "bg-white hover:bg-gray-50 shadow-[2px_2px_0px_#000]"
                      }`}
                    >
                      <p className="font-display font-black text-sm uppercase text-black">
                        {item.label}
                      </p>
                      <p className="text-xs font-bold text-gray-700 mt-1">
                        {item.desc}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Section 3: Gemini API Key */}
            <div className="neo-card p-6 sm:p-8 bg-white">
              <div className="flex items-center justify-between pb-4 border-b-2 border-black mb-6">
                <div>
                  <span className="neo-badge bg-[#DBFF43] text-black mb-1">STEP 3</span>
                  <h2 className="font-display font-black text-2xl uppercase text-black">
                    Gemini AI Engine
                  </h2>
                </div>

                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neo-btn neo-btn-lime px-3.5 py-1.5 rounded-xl font-display font-black text-xs uppercase flex items-center gap-1.5"
                >
                  Get API Key
                  <FiExternalLink size={13} />
                </a>
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-black mb-1.5">
                  Google Gemini API Key *
                </label>
                <input
                  type="password"
                  value={geminiApiKey}
                  onChange={(e) => setGeminiApiKey(e.target.value)}
                  placeholder="AIzaSy..."
                  className="w-full neo-input font-mono"
                />
                <p className="text-xs font-bold text-gray-600 mt-2">
                  🔒 Encrypted and stored safely. We use Google Gemini to generate high-speed, intelligent voice responses.
                </p>
              </div>
            </div>

            {/* Section 4: Navigation Pages */}
            <div className="neo-card p-6 sm:p-8 bg-white">
              <div className="flex items-center justify-between pb-4 border-b-2 border-black mb-6">
                <div>
                  <span className="neo-badge bg-[#DBFF43] text-black mb-1">STEP 4</span>
                  <h2 className="font-display font-black text-2xl uppercase text-black">
                    Voice Navigation Pages
                  </h2>
                </div>
                <span className="text-xs font-black bg-[#DBFF43] border border-black px-2 py-0.5 rounded-md">
                  {pages.length} Pages Configured
                </span>
              </div>

              <p className="text-xs font-bold text-gray-700 mb-4">
                Teach your assistant where to redirect visitors when they say things like "take me to pricing" or "show me contact details".
              </p>

              {/* Add New Page Inputs */}
              <div className="p-4 bg-[#FAF7FF] border-2 border-black rounded-2xl mb-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-black uppercase text-black mb-1">Page Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Pricing Page"
                      value={pageName}
                      onChange={(e) => setPageName(e.target.value)}
                      className="w-full neo-input text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-black uppercase text-black mb-1">Route Path</label>
                    <input
                      type="text"
                      placeholder="e.g. /pricing or #plans"
                      value={pagePath}
                      onChange={(e) => setPagePath(e.target.value)}
                      className="w-full neo-input text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-black uppercase text-black mb-1">Keywords (comma-separated)</label>
                    <input
                      type="text"
                      placeholder="e.g. cost, plans, price"
                      value={pageKeywords}
                      onChange={(e) => setPageKeywords(e.target.value)}
                      className="w-full neo-input text-xs"
                    />
                  </div>
                </div>

                <div className="mt-3 flex justify-end">
                  <button
                    type="button"
                    onClick={addPage}
                    className="neo-btn neo-btn-lime px-4 py-2 rounded-xl font-display font-black text-xs uppercase flex items-center gap-1.5 cursor-pointer"
                  >
                    <FiPlus size={15} /> Add Page
                  </button>
                </div>
              </div>

              {/* Configured Pages List */}
              {pages.length > 0 ? (
                <div className="space-y-2 mt-4">
                  {pages.map((p, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3.5 bg-white border-2 border-black rounded-xl shadow-[2px_2px_0px_#000]"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-md bg-[#DBFF43] border border-black flex items-center justify-center font-black text-xs">
                          {index + 1}
                        </span>
                        <div>
                          <p className="font-display font-black text-sm text-black">{p.name}</p>
                          <p className="text-xs font-mono font-bold text-purple-700">{p.path}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {p.keywords && p.keywords.length > 0 && (
                          <div className="hidden sm:flex items-center gap-1">
                            {p.keywords.map((k, ki) => (
                              <span key={ki} className="text-[10px] font-bold bg-gray-100 border border-black/20 px-1.5 py-0.5 rounded">
                                {k}
                              </span>
                            ))}
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => removePage(index)}
                          className="w-8 h-8 rounded-lg border border-black bg-red-100 text-red-600 hover:bg-red-200 flex items-center justify-center cursor-pointer transition-all"
                        >
                          <FiTrash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs font-bold text-gray-500 italic text-center py-2">
                  No custom pages added yet.
                </p>
              )}
            </div>

            {/* Save Button */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <button
                onClick={saveAssistant}
                disabled={
                  loading ||
                  !assistantName ||
                  !businessName ||
                  !businessType ||
                  !businessDescription ||
                  !geminiApiKey
                }
                className="w-full neo-btn neo-btn-lime py-4 rounded-2xl font-display font-black text-base sm:text-lg uppercase shadow-[4px_4px_0px_#000] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? "SAVING..." : user.isSetupComplete ? "UPDATE ASSISTANT ✦" : "DEPLOY ASSISTANT ✦"}
              </button>

              {user?.isSetupComplete && (
                <button
                  type="button"
                  onClick={() => setEditAssistant(false)}
                  className="w-full sm:w-auto neo-btn neo-btn-white px-6 py-4 rounded-2xl font-display font-black text-base uppercase cursor-pointer"
                >
                  Cancel
                </button>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  )
}

export default Builder
