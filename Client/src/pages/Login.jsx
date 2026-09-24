import React from 'react'
import { HiOutlineSparkles, HiOutlineMicrophone } from "react-icons/hi";
import { HiOutlineBolt, HiOutlineCodeBracket } from "react-icons/hi2";
import { FcGoogle } from "react-icons/fc";
import logo from "../assets/logo.png"
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../utils/firebase';
import axios from "axios"
import { ServerUrl } from '../App';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import CloudMascot from '../Components/Mascots/CloudMascot';
import MarqueeTicker, { RetroStar } from '../Components/Mascots/MarqueeTicker';
import { FiArrowUpRight, FiCheck } from 'react-icons/fi';

function Login({ setUser }) {
  const navigate = useNavigate()

  const FEATURES = [
    {
      icon: <HiOutlineMicrophone size={22} />,
      title: "Real-Time Voice AI",
      desc: "Natural human cadence with instant conversational speech feedback.",
      bg: "bg-[#DBFF43]",
    },
    {
      icon: <HiOutlineSparkles size={22} />,
      title: "Autonomous Navigation",
      desc: "Directs visitors to exact pages and links using pure voice commands.",
      bg: "bg-white",
    },
    {
      icon: <HiOutlineCodeBracket size={22} />,
      title: "1-Line HTML Embed",
      desc: "Drop a single script tag into WordPress, Webflow, React or Shopify.",
      bg: "bg-[#DBFF43]",
    },
    {
      icon: <HiOutlineBolt size={22} />,
      title: "Google Gemini Core",
      desc: "Fast responses and contextual intelligence out of the box.",
      bg: "bg-white",
    },
  ];

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const { displayName, email } = result.user;
      const res = await axios.post(
        ServerUrl + "/api/auth/google",
        { name: displayName, email },
        { withCredentials: true }
      );
      setUser(res.data);
      toast.success("Welcome to ZyraAI! ✦");
      navigate("/");
    } catch (error) {
      toast.error("Google sign-in failed. Please try again.");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#CBB5FE] text-black font-sans flex flex-col justify-between overflow-x-hidden">
      
      {/* Top Ticker */}
      <MarqueeTicker
        items={[
          "VOICE AI FOR WEBSITES",
          "SIGN IN FREE",
          "1-LINE SCRIPT TAG",
          "TALK WITH YOUR VISITORS",
          "NO CREDIT CARD REQUIRED",
        ]}
      />

      {/* Main Login Area */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Hero & Auth Button */}
          <div className="lg:col-span-6 flex flex-col">
            
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="neo-badge bg-[#DBFF43] text-black">
                <RetroStar size={12} />
                VOICE AI PLATFORM
              </span>
            </div>

            <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl leading-[0.98] uppercase tracking-tight text-black">
              BUILD AI
              <br />
              ASSISTANTS ✱
              <br />
              <span className="relative inline-block mt-1">
                FOR ANY SITE
                <span className="absolute left-0 bottom-1 w-full h-3 bg-[#DBFF43] -z-10 border-b-2 border-black" />
              </span>
            </h1>

            <p className="mt-6 text-sm sm:text-base font-bold text-gray-800 max-w-lg leading-relaxed">
              Create hyper-intelligent AI voice assistants that converse with visitors,
              guide them to key content, and turn passive traffic into engaged customers.
            </p>

            {/* Google Sign-in Button */}
            <div className="mt-8">
              <button
                onClick={handleLogin}
                className="w-full sm:w-auto neo-btn neo-btn-white px-8 py-4 rounded-2xl flex items-center justify-center gap-4 text-base sm:text-lg font-display font-black uppercase shadow-[5px_5px_0px_#000] cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-white border-2 border-black flex items-center justify-center shrink-0">
                  <FcGoogle size={20} />
                </div>
                <span>Continue with Google</span>
                <FiArrowUpRight size={20} className="stroke-[3]" />
              </button>

              <div className="mt-4 flex items-center gap-2 text-xs font-bold text-gray-800">
                <span className="w-2.5 h-2.5 rounded-full bg-[#DBFF43] border border-black" />
                <span>Free forever tier includes 200 voice AI conversations</span>
              </div>
            </div>

            {/* Micro proof tags */}
            <div className="mt-8 pt-6 border-t-2 border-black/15 flex flex-wrap gap-2">
              {["No code required", "Sub-second response", "WordPress & React ready"].map((tag, i) => (
                <span
                  key={i}
                  className="text-xs font-bold bg-white/70 border border-black px-2.5 py-1 rounded-full flex items-center gap-1 shadow-[1.5px_1.5px_0px_#000]"
                >
                  <FiCheck size={12} className="text-black" />
                  {tag}
                </span>
              ))}
            </div>

          </div>

          {/* Right Bento Feature Showcase */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-lg neo-card p-6 sm:p-8 bg-white relative">
              
              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 border-b-2 border-black">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center shrink-0">
                    <img src={logo} alt="logo" className="h-full w-full object-contain" />
                  </div>
                  <div>
                    <h2 className="font-display font-black text-xl text-black leading-tight">
                      Platform Highlights
                    </h2>
                    <p className="text-xs font-bold text-gray-600">Built for speed & engagement</p>
                  </div>
                </div>

                <span className="neo-badge bg-[#DBFF43] text-black text-[10px]">
                  V2.0
                </span>
              </div>

              {/* Mascot Floating Tag */}
              <div className="my-5 p-4 bg-[#FAF7FF] border-2 border-black rounded-2xl flex items-center gap-4 shadow-[2.5px_2.5px_0px_#000]">
                <CloudMascot className="w-16 h-16 shrink-0" />
                <div>
                  <p className="font-display font-black text-xs uppercase text-black">
                    Talks Just Like A Human
                  </p>
                  <p className="text-[11px] font-bold text-gray-700 mt-0.5">
                    "Say goodbye to static text chatbots. Give your site an interactive voice."
                  </p>
                </div>
              </div>

              {/* 4 Feature Items */}
              <div className="space-y-3">
                {FEATURES.map((item, idx) => (
                  <div
                    key={idx}
                    className={`flex items-start gap-3.5 p-3 rounded-2xl border-2 border-black ${item.bg} shadow-[2px_2px_0px_#000]`}
                  >
                    <div className="w-8 h-8 rounded-xl bg-black text-[#DBFF43] flex items-center justify-center shrink-0 border border-black mt-0.5">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-display font-black text-sm uppercase text-black leading-tight">
                        {item.title}
                      </h4>
                      <p className="text-xs font-bold text-gray-700 mt-0.5 leading-snug">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Bottom Ticker */}
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

    </div>
  )
}

export default Login
