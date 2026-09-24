import React from 'react'

export function CloudMascot({ className = "w-36 h-36", mood = "happy" }) {
  return (
    <div className={`relative inline-block select-none ${className}`}>
      <svg
        viewBox="0 0 160 170"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[4px_4px_0px_#000000]"
      >
        {/* Legs & Shoes */}
        {/* Left Leg */}
        <path
          d="M62 108 L62 138"
          stroke="#000000"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* Left Shoe */}
        <path
          d="M50 148 C50 138 64 136 68 138 C74 140 76 148 76 148 C76 151 52 153 50 148 Z"
          fill="#000000"
          stroke="#000000"
          strokeWidth="3"
        />
        <ellipse cx="62" cy="142" rx="4" ry="2" fill="#DBFF43" />

        {/* Right Leg */}
        <path
          d="M98 108 L104 138"
          stroke="#000000"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* Right Shoe */}
        <path
          d="M94 148 C94 138 108 136 112 138 C118 140 120 148 120 148 C120 151 96 153 94 148 Z"
          fill="#000000"
          stroke="#000000"
          strokeWidth="3"
        />
        <ellipse cx="106" cy="142" rx="4" ry="2" fill="#DBFF43" />

        {/* Cloud Body Outline & Fill */}
        <path
          d="M42 105 
             C24 105 14 90 20 74 
             C12 60 22 42 38 40 
             C44 26 62 20 78 26 
             C88 18 108 18 118 28 
             C132 26 146 38 144 54 
             C152 68 146 88 132 96 
             C136 106 122 112 112 106 
             C100 114 84 114 74 106 
             C64 112 48 112 42 105 Z"
          fill="#FFFFFF"
          stroke="#000000"
          strokeWidth="4"
          strokeLinejoin="round"
        />

        {/* Left Eye (Retro cartoon style) */}
        <ellipse cx="66" cy="62" rx="7" ry="10" fill="#000000" />
        <ellipse cx="64" cy="59" rx="2.5" ry="4" fill="#FFFFFF" />
        <circle cx="68" cy="66" r="1.5" fill="#FFFFFF" />

        {/* Right Eye (Retro cartoon style) */}
        <ellipse cx="94" cy="62" rx="7" ry="10" fill="#000000" />
        <ellipse cx="92" cy="59" rx="2.5" ry="4" fill="#FFFFFF" />
        <circle cx="96" cy="66" r="1.5" fill="#FFFFFF" />

        {/* Smile */}
        <path
          d="M74 76 Q80 82 86 76"
          stroke="#000000"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Cheeks */}
        <ellipse cx="56" cy="74" rx="4" ry="2.5" fill="#FFAFE3" />
        <ellipse cx="104" cy="74" rx="4" ry="2.5" fill="#FFAFE3" />
      </svg>
    </div>
  )
}

export default CloudMascot
