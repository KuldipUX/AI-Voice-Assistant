import React from 'react'

export function StarburstMascot({ className = "w-32 h-32" }) {
  return (
    <div className={`relative inline-block select-none ${className}`}>
      <svg
        viewBox="0 0 160 170"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[4px_4px_0px_#000000]"
      >
        {/* Legs & Shoes */}
        <path
          d="M60 115 L54 140"
          stroke="#000000"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* Left Boot */}
        <path
          d="M40 150 C40 140 54 138 60 140 C66 142 68 150 68 150 C68 153 44 155 40 150 Z"
          fill="#000000"
          stroke="#000000"
          strokeWidth="3"
        />

        <path
          d="M100 115 L108 140"
          stroke="#000000"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* Right Boot */}
        <path
          d="M98 150 C98 140 112 138 118 140 C124 142 126 150 126 150 C126 153 102 155 98 150 Z"
          fill="#000000"
          stroke="#000000"
          strokeWidth="3"
        />

        {/* 14-Point Starburst Body */}
        <polygon
          points="80,18 94,36 116,28 122,50 144,56 138,78 152,94 134,106 136,128 114,126 102,144 80,134 58,144 46,126 24,128 26,106 8,94 22,78 16,56 38,50 44,28 66,36"
          fill="#FFFFFF"
          stroke="#000000"
          strokeWidth="4"
          strokeLinejoin="round"
        />

        {/* Big Retro Cartoon Eyes */}
        <ellipse cx="68" cy="74" rx="8" ry="11" fill="#000000" />
        <ellipse cx="65" cy="71" rx="3" ry="5" fill="#FFFFFF" />
        <circle cx="70" cy="78" r="1.5" fill="#FFFFFF" />

        <ellipse cx="96" cy="74" rx="8" ry="11" fill="#000000" />
        <ellipse cx="93" cy="71" rx="3" ry="5" fill="#FFFFFF" />
        <circle cx="98" cy="78" r="1.5" fill="#FFFFFF" />

        {/* Open O-Mouth or whistle */}
        <ellipse
          cx="82"
          cy="92"
          rx="5"
          ry="6"
          fill="#000000"
        />
        <ellipse
          cx="81"
          cy="90"
          rx="2"
          ry="3"
          fill="#FFFFFF"
        />

        {/* Cute hand/glove waving */}
        <path
          d="M32 78 C24 74 20 80 26 86"
          stroke="#000000"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}

export default StarburstMascot
