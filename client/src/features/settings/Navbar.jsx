import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div className='flex items-center space-x-8 border-b border-b-gray-200 py-10 px-10 h-10'>
        <Link to="/settings/profile" className='text-md font-medium text-gray-600 hover:text-blue-600 transition-all delay-100 ease-linear'>
            Profile
        </Link>
        <Link to="/settings/teams" className='text-md font-medium text-gray-600 hover:text-blue-600 transition-all delay-100 ease-linear'>
            Employés
        </Link>
        <Link to="/settings/category" className='text-md font-medium text-gray-600 hover:text-blue-600 transition-all delay-100 ease-linear'>
            Catégories
        </Link>
    </div>
  )
}
