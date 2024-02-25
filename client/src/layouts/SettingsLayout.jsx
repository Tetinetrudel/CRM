import { Outlet } from 'react-router-dom'
import Navbar from '../features/settings/Navbar'

export default function SettingsLayout() {
  return (
    <div className='flex flex-col h-full overflow-y-scroll pb-20'>
        <Navbar />
        <div>
          <Outlet />
        </div>
    </div>
  )
}
