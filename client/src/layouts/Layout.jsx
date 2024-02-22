import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
  <main className="flex flex-col h-screen">
    <h1>Navbar</h1>
    <div className="grid grid-cols-12 h-full">
      <nav className="col-span-2">
        <h1>Sidebar</h1>
      </nav>
      <main className='col-span-10'>
        <Outlet />
      </main>
    </div>
  </main>
  )
}