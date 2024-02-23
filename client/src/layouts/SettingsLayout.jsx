import { Outlet } from 'react-router-dom'

export default function SettingsLayout() {
  return (
    <div className='flex flex-col'>
        <h1>Navbar</h1>
        <Outlet />
    </div>
  )
}
