import React from 'react'
import { useNavigate } from 'react-router-dom'
import AssistantPreview from '../Components/AssistantPreview'
import logo from "../assets/logo.png"
import CloudMascot from '../Components/Mascots/CloudMascot'
import StarburstMascot from '../Components/Mascots/StarburstMascot'
import MarqueeTicker, { RetroStar } from '../Components/Mascots/MarqueeTicker'
import { FiArrowUpRight, FiArrowRight, FiCheckCircle, FiStar } from "react-icons/fi"

const STEPS = [
  {
    step: "01",
    title: "Sign up free",
    desc: "Continue with Google and create your personal assistant workspace instantly.",
    color: "bg-[#DBFF43]",
  },
  {
    step: "02",
    title: "Customize assistant",
    desc: "Set your business name, personality tone, voice theme, and greeting style.",
    color: "bg-white",
  },
  {
    step: "03",
    title: "Add your knowledge",
    desc: "Connect Gemini AI and define website page routes for instant voice navigation.",
    color: "bg-[#DBFF43]",
  },
  {
    step: "04",
    title: "Embed anywhere",
    desc: "Copy one clean script tag and drop it into any website HTML in 30 seconds.",
    color: "bg-white",
  },
]

const TESTIMONIALS = [
  {
    name: "Jamie Chen",
    role: "Product Lead",
    avatarBg: "bg-[#DBFF43]",
    rating: 5,
    title: "Great experience",
    comment: "This voice agent is a game-changer for our customer onboarding. Visitors simply speak and get guided instantly.",
  },
  {
    name: "Eva Miller",
    role: "E-commerce Founder",
    avatarBg: "bg-[#FFAFE3]",
    rating: 5,
    title: "Incredible conversion!",
    comment: "Bounce rates dropped by 34% in the first week. Users love asking voice questions instead of digging through menus.",
  },
  {
    name: "Michael Ross",
    role: "Full-stack Dev",
    avatarBg: "bg-[#7CE6FD]",
    rating: 5,
    title: "Truly remarkable",
    comment: "The embed script takes literally 30 seconds to paste. Clean architecture, ultra-fast Gemini responses, zero headache.",
  },
  {
    name: "Eileen Vance",
    role: "Agency Director",
    avatarBg: "bg-[#FFB356]",
    rating: 5,
    title: "Brilliant innovation",
    comment: "We deploy ZyraAI across all client websites now. Clients are blown away by the conversational voice quality.",
  },
]

const FEATURE_PILLS = [
  {
    title: "Authentic connection",
    desc: "Natural two-way voice conversations with real-time feedback and human-like cadence.",
  },
  {
    title: "Live engagement",
    desc: "Instantly answer visitor questions before they leave your webpage.",
  },
  {
    title: "Voice navigation",
    desc: "Users speak commands like 'take me to pricing' and the website navigates automatically.",
  },
  {
    title: "Global interaction",
    desc: "Multilingual AI support powered by Google's fastest Gemini models.",
  },
]

function Home({ user }) {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#CBB5FE] text-black overflow-x-hidden font-sans">
      
      {/* Top Ticker Ribbon */}
      <MarqueeTicker
        items={[
          "CONNECT PEOPLE",
          "BUILD COMMUNITY",
          "POWER YOUR WEBSITE",
          "VOICE AI ASSISTANT",
          "1-LINE SCRIPT EMBED",
          "REAL-TIME NAVIGATION",
        ]}
      />

      {/* Main Hero Container */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 pb-14">
        
        {/* Top Hero Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Left Column: Big Typography & Mascot */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="neo-badge bg-[#DBFF43] text-black">
                <RetroStar size={14} />
                START CREATING TODAY
              </span>
            </div>

            <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl leading-[0.95] tracking-tight uppercase text-black">
              YOUR <span className="text-[#844FFA]">✱</span>
              <br />
              VOICE AI
              <br />
              <span className="relative inline-block mt-1">
                TODAY
                <span className="absolute left-0 bottom-1 w-full h-3.5 bg-[#DBFF43] -z-10 border-b-2 border-black" />
              </span>
            </h1>

            <p className="mt-6 text-base sm:text-lg font-bold text-gray-900 max-w-xl leading-relaxed">
              Equip your website with a hyper-smart, real-time voice assistant.
              Answer visitors, guide navigation, and turn casual clicks into loyal customers.
            </p>

            {/* CTAs & Mascot Row */}
            <div className="flex flex-wrap items-center gap-4 mt-8">
              <button
                onClick={() => navigate(user ? "/builder" : "/login")}
                className="neo-btn neo-btn-lime px-8 py-4 rounded-2xl font-display font-black text-base sm:text-lg uppercase flex items-center gap-2"
              >
                Get Started
                <FiArrowUpRight size={22} className="stroke-[3]" />
              </button>

              <button
                onClick={() => navigate("/billing")}
                className="neo-btn neo-btn-white px-6 py-4 rounded-2xl font-display font-black text-base uppercase flex items-center gap-2"
              >
                View Plans
              </button>
            </div>

            <p className="mt-4 text-xs sm:text-sm font-extrabold text-black/70 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#DBFF43] border border-black" />
              Free plan includes 200 AI voice interactions • No credit card required
            </p>
          </div>

          {/* Right Column: Hero Bento Card with Mascot */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              
              {/* Main Mascot Card */}
              <div className="neo-card-lime p-7 relative overflow-hidden flex flex-col justify-between min-h-[340px]">
                <div className="flex items-center justify-between">
                  <span className="neo-badge bg-white text-black">
                    MEET ZYRA
                  </span>
                  <RetroStar size={24} className="text-black" />
                </div>

                <div className="my-6 text-center">
                  <CloudMascot className="w-44 h-44 mx-auto animate-subtle-bounce" />
                </div>

                <div className="bg-white border-2 border-black rounded-xl p-3 shadow-[2.5px_2.5px_0px_#000] flex items-center justify-between">
                  <div>
                    <p className="font-display font-black text-sm uppercase">Voice Agent Companion</p>
                    <p className="text-xs font-bold text-gray-600">Speaks • Listens • Guides</p>
                  </div>
                  <span className="w-7 h-7 rounded-full bg-[#DBFF43] border border-black flex items-center justify-center font-black text-xs">
                    ✦
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </section>

      {/* Middle Marquee Ribbon */}
      <MarqueeTicker
        bg="bg-white"
        items={[
          "INTELLIGENT GEMINI AI",
          "REAL-TIME VOICE SYNTHESIS",
          "ZERO COMPLEX CONFIG",
          "RESPONSIVE ON MOBILE & DESKTOP",
          "WORKS ON WORDPRESS, REACT, NEXT, SHOPIFY",
        ]}
      />

      {/* Interactive Assistant Showcase Section */}
      <section className="py-16 px-4 sm:px-6 bg-[#E8DAFF] border-b-[2.5px] border-black">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="neo-badge bg-[#DBFF43] text-black mb-3">
              LIVE PREVIEW EXPERIENCE
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-black">
              TEST DRIVE YOUR ✱ ASSISTANT
            </h2>
            <p className="mt-3 text-sm sm:text-base font-bold text-gray-800">
              Try switching themes, simulating voice commands, and watching the animated visualizer in real time.
            </p>
          </div>

          <AssistantPreview />

        </div>
      </section>

      {/* Bento Grid Features Section (Matching Reference Exactly) */}
      <section className="py-16 px-4 sm:px-6 bg-[#CBB5FE]">
        <div className="max-w-6xl mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Bento Card 1: Starburst Mascot & Callout */}
            <div className="md:col-span-7 neo-card-lime p-8 flex flex-col justify-between relative overflow-hidden">
              <div>
                <span className="neo-badge bg-white text-black mb-4">
                  INSTANT COMMUNITY
                </span>
                <h3 className="font-display font-black text-4xl sm:text-5xl uppercase leading-tight tracking-tight text-black mt-2">
                  CREATE AND
                  <br />
                  JOIN NEW
                  <br />
                  COMMUNITY
                </h3>
              </div>

              <div className="my-6 flex justify-center sm:justify-end">
                <StarburstMascot className="w-40 h-40 animate-subtle-bounce" />
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate("/builder")}
                  className="neo-btn neo-btn-white px-5 py-2.5 rounded-xl font-display font-black text-sm uppercase flex items-center gap-2"
                >
                  Create assistant
                  <FiArrowUpRight size={18} />
                </button>
              </div>
            </div>

            {/* Bento Card 2 & 3: Reviews & Ratings */}
            <div className="md:col-span-5 flex flex-col gap-6">
              
              {/* 100+ Reviews Card */}
              <div className="neo-card-lime p-6 flex flex-col justify-between flex-1">
                <div>
                  <h4 className="font-display font-black text-3xl sm:text-4xl text-black leading-tight">
                    100+
                    <br />
                    Reviews
                    <br />
                    & Rating
                  </h4>
                  <div className="flex items-center gap-1 mt-2 text-black">
                    {[...Array(5)].map((_, i) => (
                      <FiStar key={i} size={18} className="fill-black stroke-black" />
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    onClick={() => navigate("/builder")}
                    className="neo-btn neo-btn-white px-4 py-2 rounded-xl font-display font-black text-xs uppercase flex items-center gap-1.5"
                  >
                    Read more
                    <FiArrowUpRight size={14} />
                  </button>
                </div>
              </div>

              {/* Shared Interests Card */}
              <div className="neo-card-lime p-6 flex flex-col justify-between flex-1 relative">
                <div className="absolute top-4 right-4">
                  <RetroStar size={24} className="text-black" />
                </div>
                <div>
                  <p className="font-display font-black text-lg sm:text-xl text-black leading-snug pr-8">
                    Meet new people with shared interests and similar values.
                  </p>
                </div>

                <div className="mt-6">
                  <button
                    onClick={() => navigate("/builder")}
                    className="neo-btn neo-btn-white px-4 py-2 rounded-xl font-display font-black text-xs uppercase flex items-center gap-1.5"
                  >
                    Create an assistant
                    <FiArrowUpRight size={14} />
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* Customer Reviews Row (Direct Reference "What our customer says") */}
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-black">
                What our customer says
              </h3>

              <div className="hidden sm:flex items-center gap-2">
                <button className="w-10 h-10 rounded-full border-2 border-black bg-white shadow-[2px_2px_0px_#000] flex items-center justify-center font-black cursor-pointer hover:bg-gray-100">
                  ←
                </button>
                <button className="w-10 h-10 rounded-full border-2 border-black bg-[#DBFF43] shadow-[2px_2px_0px_#000] flex items-center justify-center font-black cursor-pointer hover:bg-[#e2ff5e]">
                  →
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {TESTIMONIALS.map((t, idx) => (
                <div
                  key={idx}
                  className="neo-card-lime p-5 flex flex-col justify-between hover:-translate-y-1 transition-all"
                >
                  <div>
                    {/* User info */}
                    <div className="flex items-center gap-3 pb-3 border-b-2 border-black">
                      <div className={`w-9 h-9 rounded-full ${t.avatarBg} border-2 border-black flex items-center justify-center font-black text-sm`}>
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-black leading-tight">{t.name}</h4>
                        <p className="text-[11px] font-bold text-gray-700">{t.role}</p>
                      </div>
                    </div>

                    {/* Stars */}
                    <div className="flex items-center gap-0.5 mt-3 text-black">
                      {[...Array(t.rating)].map((_, i) => (
                        <FiStar key={i} size={13} className="fill-black stroke-black" />
                      ))}
                    </div>

                    {/* Review Title & Content */}
                    <h5 className="font-display font-black text-sm mt-2 text-black">
                      {t.title}
                    </h5>
                    <p className="text-xs font-bold text-gray-800 leading-relaxed mt-2">
                      {t.comment}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4 Feature Pills Row (Bottom of reference) */}
          <div className="mt-14">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {FEATURE_PILLS.map((pill, idx) => (
                <div
                  key={idx}
                  className="neo-card-lime p-4 flex flex-col justify-between"
                >
                  <h4 className="font-display font-black text-sm uppercase text-black">
                    {pill.title}
                  </h4>
                  <p className="text-xs font-bold text-gray-800 mt-2 leading-relaxed">
                    {pill.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 neo-card p-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#DBFF43] border border-black" />
                <p className="font-display font-black text-sm uppercase text-black">
                  All the tools you could need to build community voice experiences in one place.
                </p>
              </div>

              <button
                onClick={() => navigate("/builder")}
                className="neo-btn neo-btn-lime px-4 py-2 rounded-xl font-display font-black text-xs uppercase flex items-center gap-1 whitespace-nowrap"
              >
                Launch Builder
                <FiArrowUpRight size={15} />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* "Get Started in Minutes" 4 Steps Section */}
      <section className="py-20 px-4 sm:px-6 bg-white border-t-[2.5px] border-black">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="neo-badge bg-[#DBFF43] text-black mb-3">
              ZERO EFFORT WORKFLOW
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-black">
              Get started in minutes
            </h2>
            <p className="mt-3 text-sm sm:text-base font-bold text-gray-700">
              Simple setup. No complicated SDK or backend setup required.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((s, i) => (
              <div
                key={i}
                className={`neo-card ${s.color} p-6 flex flex-col justify-between relative group hover:-translate-y-1.5 transition-all`}
              >
                <div>
                  <span className="inline-block font-display font-black text-4xl text-black border-2 border-black bg-white rounded-xl px-3 py-1 shadow-[2.5px_2.5px_0px_#000]">
                    {s.step}
                  </span>

                  <h3 className="font-display font-black text-xl text-black mt-5 uppercase">
                    {s.title}
                  </h3>

                  <p className="mt-3 text-xs sm:text-sm font-bold text-gray-700 leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t-2 border-black/10 flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-black">Step {s.step}</span>
                  <FiCheckCircle className="text-black" size={18} />
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Banner Callout */}
          <div className="mt-14 neo-card-lime p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <span className="neo-badge bg-white text-black mb-2">
                READY TO ELEVATE YOUR SITE?
              </span>
              <h3 className="font-display font-black text-2xl sm:text-4xl uppercase text-black leading-tight mt-1">
                Start Building Your AI Assistant Free
              </h3>
              <p className="text-sm font-bold text-gray-800 mt-2">
                Takes 2 minutes to configure and embed on any web platform.
              </p>
            </div>

            <button
              onClick={() => navigate(user ? "/builder" : "/login")}
              className="neo-btn neo-btn-black px-8 py-4 rounded-2xl font-display font-black text-base uppercase whitespace-nowrap flex items-center gap-2"
            >
              Start Free Setup
              <FiArrowRight size={18} />
            </button>
          </div>

        </div>
      </section>

      {/* Pre-Footer Marquee Ticker */}
      <MarqueeTicker
        bg="bg-[#DBFF43]"
        items={[
          "CONNECT PEOPLE",
          "BUILD COMMUNITY",
          "POWER YOUR BUSINESS",
          "CONNECT PEOPLE",
          "BUILD COMMUNITY",
        ]}
      />

      {/* Neo-Brutalist Footer */}
      <footer className="bg-white border-t-[2.5px] border-black px-6 py-12">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div
              onClick={() => navigate("/")}
              className="flex items-center gap-2.5 cursor-pointer"
            >
              <div className="w-10 h-10 flex items-center justify-center shrink-0">
                <img src={logo} alt="ZyraAI logo" className="h-full w-full object-contain" />
              </div>
              <h2 className="font-display font-black text-2xl text-black leading-none">
                Zyra<span className="text-[#844FFA]">AI</span>
              </h2>
            </div>
            <span className="hidden sm:inline text-gray-400">|</span>
            <p className="text-xs font-bold text-gray-600">
              Modern Voice AI assistant platform for the web
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/builder")}
              className="text-xs font-black uppercase text-black hover:underline cursor-pointer"
            >
              Builder
            </button>
            <button
              onClick={() => navigate("/billing")}
              className="text-xs font-black uppercase text-black hover:underline cursor-pointer"
            >
              Pricing
            </button>
            <span className="text-xs font-bold text-gray-500">
              © {new Date().getFullYear()} ZyraAI. All rights reserved.
            </span>
          </div>

        </div>
      </footer>

    </div>
  )
}

export default Home
