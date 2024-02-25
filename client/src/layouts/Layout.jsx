import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

export default function Layout() {
  return (
  <main className="flex h-screen overflow-hidden">
    <Sidebar />
    <div className="flex flex-col flex-1">
      <Navbar />
      <main className='mt-6 h-screen' >
        <Outlet />
      </main>
    </div>
  </main>
  )
}