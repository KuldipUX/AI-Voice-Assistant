import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import axios from 'axios'
import ProtectedRoute from './Components/ProtectedRoute'
import Navbar from './Components/Navbar'
import Builder from './pages/Builder'
import Billing from './pages/Billing'
import { Toaster } from "react-hot-toast"

export const ServerUrl = import.meta.env.VITE_SERVER_URL || "https://ai-voice-assistant-pu5k.onrender.com"
export const CLIENT_URL = import.meta.env.VITE_CLIENT_URL || (typeof window !== "undefined" ? window.location.origin : "https://ai-voice-assistant-weld.vercel.app")

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await axios.get(ServerUrl + "/api/user/current-user", { withCredentials: true })
        console.log("Current User:", res.data);
        setUser(res.data)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
    fetchMe()
  }, [])

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            border: '2.5px solid #000000',
            borderRadius: '16px',
            boxShadow: '4px 4px 0px #000000',
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: '700',
            fontSize: '13px',
            color: '#000000',
            background: '#FFFFFF',
            padding: '12px 18px',
          },
          success: {
            iconTheme: {
              primary: '#000000',
              secondary: '#DBFF43',
            },
          },
          error: {
            iconTheme: {
              primary: '#000000',
              secondary: '#FFAFE3',
            },
          },
        }}
      />

      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />

        <Route
          path="/*"
          element={
            <ProtectedRoute user={user} loading={loading}>
              <Navbar setUser={setUser} user={user} />
              <Routes>
                <Route path="/" element={<Home user={user} />} />
                <Route path="/builder" element={<Builder user={user} setUser={setUser} />} />
                <Route path="/billing" element={<Billing user={user} setUser={setUser} />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
