import React, { useState } from 'react'
import { CiMicrophoneOn } from "react-icons/ci";
import { HiSparkles } from "react-icons/hi2";

const themes = {
  dark: {
    bg: "bg-[#0B0F19]",
    deviceBorder: "border-black",
    overlay: "bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.2),transparent_50%)]",
    orb: "from-purple-500 via-indigo-500 to-cyan-400",
    orbGlow: "shadow-[0_0_60px_rgba(168,85,247,0.5)]",
    cardBorder: "border-2 border-white/20",
    text: "text-white",
    sub: "text-gray-300",
    listening: "text-[#DBFF43]",
    waveBg: "bg-[#DBFF43]",
    button: "bg-[#DBFF43] text-black hover:bg-[#cff52a]",
    micGlow: "shadow-[0_0_30px_rgba(219,255,67,0.4)]",
    badge: "bg-white/10 text-white border-white/30",
  },
  light: {
    bg: "bg-gradient-to-br from-white via-[#FAF7FF] to-[#EFF4FF]",
    deviceBorder: "border-black",
    overlay: "bg-[radial-gradient(circle_at_top,rgba(219,255,67,0.3),transparent_50%)]",
    orb: "from-[#844FFA] via-[#5C24FF] to-[#DBFF43]",
    orbGlow: "shadow-[0_0_50px_rgba(132,79,250,0.3)]",
    cardBorder: "border-2 border-black",
    text: "text-black",
    sub: "text-gray-700",
    listening: "text-[#844FFA]",
    waveBg: "bg-[#844FFA]",
    button: "bg-[#844FFA] text-white hover:bg-[#7236fa]",
    micGlow: "shadow-[0_0_30px_rgba(132,79,250,0.35)]",
    badge: "bg-purple-100 text-purple-900 border-purple-300",
  },
  glass: {
    bg: "bg-slate-900/90 backdrop-blur-xl",
    deviceBorder: "border-black",
    overlay: "bg-[radial-gradient(circle_at_top,rgba(124,230,253,0.25),transparent_50%)]",
    orb: "from-cyan-400 via-teal-300 to-indigo-400",
    orbGlow: "shadow-[0_0_60px_rgba(124,230,253,0.45)]",
    cardBorder: "border-2 border-cyan-400/40",
    text: "text-white",
    sub: "text-cyan-100/80",
    listening: "text-cyan-300",
    waveBg: "bg-cyan-300",
    button: "bg-cyan-400 text-black hover:bg-cyan-300",
    micGlow: "shadow-[0_0_30px_rgba(34,211,238,0.4)]",
    badge: "bg-cyan-950/60 text-cyan-200 border-cyan-500/40",
  },
  neon: {
    bg: "bg-[#061A12]",
    deviceBorder: "border-black",
    overlay: "bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.25),transparent_50%)]",
    orb: "from-emerald-400 via-green-400 to-[#DBFF43]",
    orbGlow: "shadow-[0_0_60px_rgba(16,185,129,0.5)]",
    cardBorder: "border-2 border-emerald-400/40",
    text: "text-emerald-50",
    sub: "text-emerald-200/80",
    listening: "text-[#DBFF43]",
    waveBg: "bg-[#DBFF43]",
    button: "bg-[#DBFF43] text-black hover:bg-[#cff52a]",
    micGlow: "shadow-[0_0_35px_rgba(219,255,67,0.5)]",
    badge: "bg-emerald-950/60 text-emerald-300 border-emerald-500/40",
  },
}

function AssistantPreview() {
  const [theme, setTheme] = useState("light")
  const [isListening, setIsListening] = useState(true)
  const current = themes[theme]

  return (
    <div className="relative flex flex-col items-center justify-center px-4 py-8 select-none">
      
      {/* Playful Floating Badge Above Frame */}
      <div className="mb-4 flex items-center gap-2">
        <span className="neo-badge bg-[#DBFF43] text-black shadow-[2px_2px_0px_#000]">
          <HiSparkles className="text-black" />
          Interactive Assistant Sandbox
        </span>
      </div>

      {/* Theme Switcher Pill Bar */}
      <div className="flex items-center gap-2 p-1.5 bg-white border-2 border-black rounded-full shadow-[3px_3px_0px_#000] mb-6">
        <span className="text-xs font-black uppercase text-gray-500 pl-2 hidden sm:inline">
          Theme:
        </span>
        {(["light", "dark", "glass", "neon"]).map((t) => (
          <button
            key={t}
            onClick={() => setTheme(t)}
            className={`px-3 py-1 rounded-full text-xs font-black capitalize transition-all cursor-pointer border-2 ${
              theme === t
                ? "bg-[#DBFF43] border-black text-black shadow-[2px_2px_0px_#000]"
                : "border-transparent text-gray-600 hover:text-black hover:bg-gray-100"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Neo-Brutalist Device Frame */}
      <div className="relative group">
        {/* Decorative corner tag */}
        <div className="absolute -top-3 -right-3 z-30 bg-[#DBFF43] border-2 border-black rounded-full px-2.5 py-0.5 text-[11px] font-black uppercase shadow-[2px_2px_0px_#000] flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          Live
        </div>

        <div
          className={`relative w-[300px] sm:w-[340px] md:w-[380px] h-[520px] sm:h-[550px] rounded-[36px] overflow-hidden transition-all duration-300 ${current.bg} border-[3.5px] border-black shadow-[8px_8px_0px_#000000]`}
        >
          {/* Top Speaker / Camera Notch */}
          <div className="absolute top-3 inset-x-0 flex justify-center z-30">
            <div className="w-24 h-4 bg-black rounded-full flex items-center justify-center gap-2 px-2">
              <div className="w-2 h-2 rounded-full bg-white/30" />
              <div className="w-8 h-1.5 rounded-full bg-white/20" />
            </div>
          </div>

          <div className={`absolute inset-0 ${current.overlay}`} />

          {/* Device Content */}
          <div className="relative z-20 flex flex-col items-center justify-between h-full px-6 py-8 pt-10">
            
            {/* Header / Assistant Info */}
            <div className="text-center w-full">
              <span className={`inline-block text-[11px] font-extrabold uppercase px-3 py-1 rounded-full border ${current.badge}`}>
                AI Website Agent
              </span>
              <h2 className={`text-2xl sm:text-3xl font-display font-black tracking-tight mt-2 ${current.text}`}>
                Hello! I'm Zyra
              </h2>
              <p className={`mt-1 text-xs sm:text-sm font-medium leading-relaxed max-w-[240px] mx-auto ${current.sub}`}>
                Your smart voice assistant. Ask anything about this website!
              </p>
            </div>

            {/* Glowing Orb Visualizer */}
            <div className="relative my-auto flex flex-col items-center justify-center">
              <div className={`absolute inset-0 scale-150 rounded-full blur-2xl bg-gradient-to-r ${current.orb} opacity-40 animate-pulse`} />
              
              <div
                className={`relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-tr ${current.orb} ${current.orbGlow} border-2 border-black/20 flex items-center justify-center animate-subtle-bounce`}
              >
                <div className="w-16 h-16 rounded-full bg-white/20 blur-md" />
                <div className="absolute font-black text-xs text-white/90 uppercase tracking-widest pointer-events-none">
                  AI Active
                </div>
              </div>

              {/* Status & Equalizer Waves */}
              <div className="mt-5 text-center">
                <p className={`text-xs sm:text-sm font-extrabold tracking-wide uppercase ${current.listening}`}>
                  {isListening ? "● Listening to visitor..." : "● Voice Standby"}
                </p>

                {/* Animated Voice Equalizer Bars */}
                <div className="flex items-end justify-center gap-1.5 h-7 mt-2">
                  <span className={`w-1.5 rounded-full ${current.waveBg} ${isListening ? "wave-bar-1" : "h-1.5"}`} />
                  <span className={`w-1.5 rounded-full ${current.waveBg} ${isListening ? "wave-bar-2" : "h-1.5"}`} />
                  <span className={`w-1.5 rounded-full ${current.waveBg} ${isListening ? "wave-bar-3" : "h-1.5"}`} />
                  <span className={`w-1.5 rounded-full ${current.waveBg} ${isListening ? "wave-bar-4" : "h-1.5"}`} />
                  <span className={`w-1.5 rounded-full ${current.waveBg} ${isListening ? "wave-bar-5" : "h-1.5"}`} />
                  <span className={`w-1.5 rounded-full ${current.waveBg} ${isListening ? "wave-bar-6" : "h-1.5"}`} />
                </div>
              </div>
            </div>

            {/* Bottom Controls / Microphone Trigger */}
            <div className="relative flex flex-col items-center">
              <button
                onClick={() => setIsListening(!isListening)}
                title="Tap to toggle voice simulation"
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-black flex items-center justify-center transition-all cursor-pointer shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 ${current.button}`}
              >
                <CiMicrophoneOn size={30} className="stroke-[1.5]" />
              </button>

              <span className={`text-[11px] font-bold mt-2 ${current.sub}`}>
                {isListening ? "Tap to pause voice" : "Tap to speak"}
              </span>
            </div>

          </div>
        </div>
      </div>

    </div>
  )
}

export default AssistantPreview
