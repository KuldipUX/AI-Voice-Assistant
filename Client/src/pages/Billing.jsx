import axios from 'axios';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ServerUrl } from '../App';
import { RetroStar } from '../Components/Mascots/MarqueeTicker';
import { FiCheck, FiStar, FiShield, FiZap, FiArrowUpRight } from 'react-icons/fi';

function Billing({ user, setUser }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !user.isSetupComplete) {
      toast.error("Please configure your assistant first");
      navigate("/builder");
    }
  }, [user, navigate]);

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

  const handlePay = async () => {
    try {
      const res = await axios.post(
        ServerUrl + "/api/billing/order",
        { plan: "pro" },
        { withCredentials: true }
      );

      const order = res.data.order;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "ZyraAI",
        description: "Pro Plan (3 Months Access)",
        order_id: order.id,
        handler: async (response) => {
          try {
            const verifyRes = await axios.post(
              ServerUrl + "/api/billing/verify",
              response,
              { withCredentials: true }
            );

            if (verifyRes.data.success) {
              toast.success("Payment successful! Pro Plan activated ✦");
              setUser(verifyRes.data.user);
            }
          } catch (err) {
            toast.error("Payment verification failed");
            console.log(err);
          }
        },
        theme: {
          color: "#000000",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      toast.error("Payment initiation failed");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#CBB5FE] px-4 py-8 sm:py-12 text-black font-sans pb-24">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <span className="neo-badge bg-[#DBFF43] text-black mb-3">
            <RetroStar size={12} />
            TRANSPARENT PRICING
          </span>
          <h1 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-black">
            Choose Your Power Plan
          </h1>
          <p className="text-sm sm:text-base font-bold text-gray-800 mt-2">
            Scale your website's conversational voice capabilities without hidden fees or complex contracts.
          </p>
        </div>

        {/* Current Usage Bento Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          
          {/* Active Plan */}
          <div className="neo-card-lime p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-black">Current Tier</span>
              <span className="text-xs font-black bg-white border border-black px-2 py-0.5 rounded-full">
                Active
              </span>
            </div>
            <h3 className="font-display font-black text-3xl text-black mt-3 uppercase">
              {user?.plan || "Free"}
            </h3>
            <p className="text-xs font-bold text-gray-700 mt-1">
              {user?.plan === "pro" ? "All features unlocked" : "Standard features"}
            </p>
          </div>

          {/* Gemini AI Engine */}
          <div className="neo-card p-5 bg-white flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-gray-500">Gemini AI Model</span>
              <span className="w-3 h-3 rounded-full bg-emerald-400 border border-black animate-ping" />
            </div>
            <h3 className="font-display font-black text-3xl text-black mt-3 capitalize">
              {user?.geminiStatus || "Active"}
            </h3>
            <p className="text-xs font-bold text-gray-600 mt-1">
              Ultra-fast voice response generation
            </p>
          </div>

          {/* Usage / Remaining Days */}
          <div className="neo-card p-5 bg-white flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-gray-500">
                {user?.plan === "free" ? "Messages Left" : "Pro Plan Expiry"}
              </span>
              <span className="text-sm">⚡</span>
            </div>
            <h3 className="font-display font-black text-3xl text-black mt-3">
              {user?.plan === "free" ? remainingMessages : `${remainingDays} Days`}
            </h3>
            <p className="text-xs font-bold text-gray-600 mt-1">
              {user?.plan === "free" ? "200 calls included free" : "Full access until renewal"}
            </p>
          </div>

        </div>

        {/* 2-Column Pricing Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* FREE PLAN */}
          <div className="neo-card p-8 bg-white flex flex-col justify-between relative hover:-translate-y-1 transition-all">
            <div>
              <div className="flex items-center justify-between">
                <span className="neo-badge bg-gray-100 text-black">
                  STARTER
                </span>
                <span className="text-xs font-black text-gray-500 uppercase">Forever Free</span>
              </div>

              <h3 className="font-display font-black text-3xl uppercase text-black mt-4">
                Free Plan
              </h3>
              <p className="text-xs font-bold text-gray-600 mt-1">
                Perfect for hobbyists, testing, and portfolio showcases.
              </p>

              <div className="mt-6 pb-6 border-b-2 border-black flex items-baseline gap-2">
                <span className="font-display font-black text-6xl text-black tracking-tight">₹0</span>
                <span className="text-xs font-black uppercase text-gray-500">/ forever</span>
              </div>

              {/* Feature list */}
              <ul className="mt-6 space-y-3.5">
                {[
                  "200 AI voice interactions",
                  "Real-time voice synthesis",
                  "Smart navigation page routing",
                  "Custom theme & tone settings",
                  "1-line script embed code",
                  "Standard response latency",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-xs font-bold text-gray-800">
                    <span className="w-5 h-5 rounded-md bg-gray-100 border border-black flex items-center justify-center font-black text-[11px] text-black shrink-0">
                      ★
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <button
                disabled
                className="w-full py-4 rounded-2xl border-2 border-black bg-gray-100 text-gray-500 font-display font-black text-sm uppercase cursor-default"
              >
                {user?.plan === "free" ? "Currently Active" : "Basic Tier"}
              </button>
            </div>
          </div>

          {/* PRO PLAN */}
          <div className="neo-card-lime p-8 sm:p-9 flex flex-col justify-between relative shadow-[8px_8px_0px_#000] hover:-translate-y-1.5 transition-all">
            
            {/* "Most Popular" Floating Sticker Badge */}
            <div className="absolute -top-3.5 right-6 bg-black text-[#DBFF43] border-2 border-black rounded-full px-3.5 py-1 text-xs font-display font-black uppercase shadow-[2px_2px_0px_#000] flex items-center gap-1.5">
              <span>✦</span> MOST POPULAR
            </div>

            <div>
              <div className="flex items-center justify-between">
                <span className="neo-badge bg-white text-black">
                  PRO TIER
                </span>
                <span className="text-xs font-black uppercase text-black bg-[#DBFF43] px-2 py-0.5 rounded border border-black">
                  3 Months Access
                </span>
              </div>

              <h3 className="font-display font-black text-3xl sm:text-4xl uppercase text-black mt-4">
                Pro Unlimited
              </h3>
              <p className="text-xs font-bold text-gray-800 mt-1">
                For businesses and creators who demand unlimited voice engagement.
              </p>

              <div className="mt-6 pb-6 border-b-2 border-black flex items-baseline gap-2">
                <span className="font-display font-black text-6xl sm:text-7xl text-black tracking-tight">₹699</span>
                <span className="text-xs font-black uppercase text-black">/ 3 months</span>
              </div>

              {/* Feature list */}
              <ul className="mt-6 space-y-3.5">
                {[
                  "Unlimited AI voice conversations",
                  "Priority Gemini model throughput",
                  "Instant sub-second response times",
                  "Unlimited voice navigation pages",
                  "Remove Zyra branding on embed",
                  "24/7 dedicated developer support",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-xs sm:text-sm font-extrabold text-black">
                    <span className="w-5 h-5 rounded-md bg-white border-2 border-black flex items-center justify-center font-black text-xs text-black shrink-0 shadow-[1px_1px_0px_#000]">
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <button
                onClick={handlePay}
                disabled={user?.plan === "pro"}
                className={`w-full py-4 rounded-2xl border-[2.5px] border-black font-display font-black text-base uppercase flex items-center justify-center gap-2 transition-all ${
                  user?.plan === "pro"
                    ? "bg-white text-black cursor-default shadow-[2px_2px_0px_#000]"
                    : "neo-btn neo-btn-black shadow-[4px_4px_0px_#000] cursor-pointer"
                }`}
              >
                {user?.plan === "pro" ? (
                  "Active Plan ✓"
                ) : (
                  <>
                    Upgrade Now
                    <FiArrowUpRight size={20} className="stroke-[3]" />
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

        {/* Security & Guarantee Trust Banner */}
        <div className="mt-12 neo-card p-6 bg-white flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#DBFF43] border-2 border-black flex items-center justify-center font-black shrink-0">
              <FiShield size={24} />
            </div>
            <div>
              <h4 className="font-display font-black text-base uppercase text-black">
                Safe & Instant Activation
              </h4>
              <p className="text-xs font-bold text-gray-600 mt-0.5">
                Processed securely via Razorpay. Your assistant automatically upgrades the instant payment confirms.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase bg-[#DBFF43] border border-black px-3 py-1 rounded-full">
              SSL Encrypted
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Billing;
