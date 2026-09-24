import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import logo from "../assets/logo.png"
import { FiLogOut, FiMenu, FiX, FiLayers, FiCreditCard, FiHome } from "react-icons/fi";
import axios from 'axios';
import { ServerUrl } from '../App';
import toast from 'react-hot-toast';

function Navbar({ user, setUser }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await axios.get(ServerUrl + "/api/auth/logout", { withCredentials: true })
      setUser(null)
      toast.success("Logged out successfully")
      navigate("/login")
    } catch (error) {
      toast.error("Logout failed")
      console.log(error)
    }
  }

  const isActive = (path) => location.pathname === path

  return (
    <div className="sticky top-0 z-50 px-3 sm:px-6 pt-3 pb-2 bg-[#CBB5FE]/90 backdrop-blur-md">
      <nav className="max-w-6xl mx-auto border-[2.5px] border-black bg-white rounded-2xl sm:rounded-full px-4 sm:px-6 py-2.5 shadow-[4px_4px_0px_#000000] flex items-center justify-between transition-all">
        
        {/* Brand Logo */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2.5 cursor-pointer select-none group"
        >
          <div className="w-9 h-9 flex items-center justify-center group-hover:rotate-6 transition-transform shrink-0">
            <img src={logo} alt="ZyraAI logo" className="h-full w-full object-contain" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-display font-black text-xl tracking-tight text-black">
              Zyra<span className="text-[#844FFA]">AI</span>
            </span>
            <span className="hidden sm:inline-block text-xs font-extrabold px-2 py-0.5 rounded-md bg-[#DBFF43] border border-black shadow-[1.5px_1.5px_0px_#000]">
              VOICE ✦
            </span>
          </div>
        </div>

        {/* Desktop Nav Actions */}
        {user && (
          <div className="hidden md:flex items-center gap-2.5">
            <button
              onClick={() => navigate("/")}
              className={`px-3.5 py-1.5 rounded-full font-bold text-sm border-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                isActive("/")
                  ? "bg-[#DBFF43] border-black text-black shadow-[2px_2px_0px_#000]"
                  : "border-transparent text-gray-800 hover:border-black hover:bg-gray-100"
              }`}
            >
              <FiHome size={15} />
              Home
            </button>

            <button
              onClick={() => navigate("/builder")}
              className={`px-3.5 py-1.5 rounded-full font-bold text-sm border-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                isActive("/builder")
                  ? "bg-[#DBFF43] border-black text-black shadow-[2px_2px_0px_#000]"
                  : "border-transparent text-gray-800 hover:border-black hover:bg-gray-100"
              }`}
            >
              <FiLayers size={15} />
              Builder
            </button>

            <button
              onClick={() => navigate("/billing")}
              className={`px-3.5 py-1.5 rounded-full font-bold text-sm border-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                isActive("/billing")
                  ? "bg-[#DBFF43] border-black text-black shadow-[2px_2px_0px_#000]"
                  : "border-transparent text-gray-800 hover:border-black hover:bg-gray-100"
              }`}
            >
              <FiCreditCard size={15} />
              Billing
              {user.plan === "free" && (
                <span className="text-[10px] uppercase font-black bg-black text-[#DBFF43] px-1.5 py-0.2 rounded">
                  Upgrade
                </span>
              )}
            </button>

            {/* User Pill */}
            <div className="flex items-center gap-2.5 pl-3 ml-2 border-l-2 border-black/20">
              <div className="flex items-center gap-2 bg-[#F5EEFF] border-2 border-black px-2.5 py-1 rounded-full shadow-[2px_2px_0px_#000]">
                <div className="w-7 h-7 rounded-full bg-[#DBFF43] border-1.5 border-black flex items-center justify-center font-black text-xs text-black">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <div className="max-w-[110px]">
                  <p className="text-xs font-extrabold text-black truncate leading-tight">
                    {user?.name}
                  </p>
                  <p className="text-[10px] font-bold text-purple-700 uppercase tracking-wide">
                    {user?.plan || "Free"} Plan
                  </p>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                title="Log Out"
                className="w-8 h-8 rounded-full border-2 border-black bg-white hover:bg-red-50 hover:text-red-600 flex items-center justify-center transition-all shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer"
              >
                <FiLogOut size={14} />
              </button>
            </div>
          </div>
        )}

        {/* Mobile Menu Button */}
        {user && (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-10 h-10 rounded-xl border-2 border-black bg-white flex items-center justify-center shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
            aria-label="Toggle menu"
          >
            {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        )}
      </nav>

      {/* Mobile Menu Dropdown */}
      {menuOpen && user && (
        <div className="md:hidden mt-2 max-w-6xl mx-auto">
          <div className="bg-white border-[2.5px] border-black rounded-2xl shadow-[4px_4px_0px_#000] p-4 space-y-3">
            <div className="flex items-center gap-3 pb-3 border-b-2 border-black">
              <div className="w-9 h-9 rounded-full bg-[#DBFF43] border-2 border-black flex items-center justify-center font-black text-sm text-black">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-extrabold text-black truncate">{user.name}</p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
              <span className="text-xs font-black uppercase bg-[#DBFF43] border border-black px-2 py-0.5 rounded-md">
                {user.plan}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2 pt-1">
              <button
                className={`w-full py-2.5 px-4 rounded-xl border-2 border-black font-bold text-sm text-left flex items-center gap-2 ${
                  isActive("/") ? "bg-[#DBFF43] shadow-[2px_2px_0px_#000]" : "bg-white hover:bg-gray-50"
                }`}
                onClick={() => {
                  navigate("/")
                  setMenuOpen(false)
                }}
              >
                <FiHome size={16} /> Home
              </button>

              <button
                className={`w-full py-2.5 px-4 rounded-xl border-2 border-black font-bold text-sm text-left flex items-center gap-2 ${
                  isActive("/builder") ? "bg-[#DBFF43] shadow-[2px_2px_0px_#000]" : "bg-white hover:bg-gray-50"
                }`}
                onClick={() => {
                  navigate("/builder")
                  setMenuOpen(false)
                }}
              >
                <FiLayers size={16} /> Assistant Builder
              </button>

              <button
                className={`w-full py-2.5 px-4 rounded-xl border-2 border-black font-bold text-sm text-left flex items-center gap-2 ${
                  isActive("/billing") ? "bg-[#DBFF43] shadow-[2px_2px_0px_#000]" : "bg-white hover:bg-gray-50"
                }`}
                onClick={() => {
                  navigate("/billing")
                  setMenuOpen(false)
                }}
              >
                <FiCreditCard size={16} /> Billing & Plan
              </button>
            </div>

            <button
              onClick={() => {
                setMenuOpen(false)
                handleLogout()
              }}
              className="mt-2 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 border-black bg-red-100 text-red-700 hover:bg-red-200 font-extrabold text-sm shadow-[2px_2px_0px_#000] cursor-pointer"
            >
              <FiLogOut size={16} /> Log Out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar
