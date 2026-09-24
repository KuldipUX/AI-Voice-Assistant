import React from 'react'

export function MarqueeTicker({
  items = [
    "VOICE AI FOR MODERN WEBSITES",
    "NO-CODE SETUP IN 2 MINUTES",
    "REAL-TIME CONVERSATIONS",
    "BOOST VISITOR ENGAGEMENT",
    "1-LINE SCRIPT EMBED",
    "INTELLIGENT GEMINI SPEED",
    "INTERACTIVE VOICE NAVIGATION"
  ],
  bg = "bg-[#DBFF43]",
  textColor = "text-black",
  reverse = false
}) {
  const content = (
    <div className="flex items-center gap-8 py-3.5 whitespace-nowrap text-sm sm:text-base font-black tracking-wider uppercase select-none">
      {items.map((item, idx) => (
        <span key={idx} className="flex items-center gap-8">
          <span>{item}</span>
          <span className="text-xl sm:text-2xl select-none">✱</span>
        </span>
      ))}
    </div>
  )

  return (
    <div className={`w-full overflow-hidden ${bg} ${textColor} border-y-[2.5px] border-black select-none relative z-10`}>
      <div className="flex w-max animate-marquee">
        {content}
        {content}
      </div>
    </div>
  )
}

export function RetroStar({ size = 20, className = "text-black" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
    </svg>
  )
}

export default MarqueeTicker
