import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

export default function Layout() {
  return (
  <main className="flex h-screen overflow-hidden bg-gray-50">
    <Sidebar />
    <div className="flex flex-col flex-1">
      <Navbar />
      <main className='mt-6 h-screen bg-white rounded-tl-2xl' >
        <Outlet />
      </main>
    </div>
  </main>
  )
}