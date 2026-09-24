import React from 'react'
import { Navigate } from 'react-router-dom'
import CloudMascot from './Mascots/CloudMascot'

function ProtectedRoute({ user, loading, children }) {
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#CBB5FE] text-black select-none">
        <div className="neo-card-lime p-8 rounded-3xl flex flex-col items-center shadow-[6px_6px_0px_#000]">
          <CloudMascot className="w-24 h-24 animate-subtle-bounce" />
          <div className="mt-4 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-black animate-bounce" />
            <span className="w-3 h-3 rounded-full bg-black animate-bounce [animation-delay:0.2s]" />
            <span className="w-3 h-3 rounded-full bg-black animate-bounce [animation-delay:0.4s]" />
          </div>
          <p className="font-display font-black text-sm uppercase mt-3 tracking-wider">
            Loading ZyraAI...
          </p>
        </div>
      </div>
    )
  }

  if (!user) return <Navigate to="/login" replace />

  return children
}

export default ProtectedRoute
