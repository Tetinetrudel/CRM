import { useState } from 'react'
import { Link } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { signoutSuccess } from '../redux/users/userSlice'

import { BiSearch } from 'react-icons/bi'
import { GoBell, GoSun, GoMoon, GoCommentDiscussion } from 'react-icons/go'

export default function Navbar() {
    const dispatch = useDispatch()
    const { currentUser } = useSelector((state) => state.user)
    const [userMenuToggle, setUserMenuToggle] = useState(false)
    const handleChange = () => {} 

    const handleSignout = async () => {
        try {
          const res = await fetch('http://localhost:3000/api/auth/sign-out', {
            method: 'POST',
          })
          const data = await res.json()
          if (!res.ok) {
            console.log(data.message)
          } else {
            dispatch(signoutSuccess())
          }
        } catch (error) {
          console.log(error.message)
        }
    }

  return (
    <div className='w-full border-b border-gray-200'>
        <nav className='flex items-center justify-between py-4 px-10'> 
            <form>
                <div className='flex items-center w-96'>
                    <BiSearch className='text-gray-800'/>
                    <input 
                        type="search" 
                        id="search" 
                        onChange={handleChange}
                        placeholder='Rechercher ...'
                        className='px-2 bg-transparent text-sm outline-none border-none text-gray-800 placeholder:text-gray-400 w-full'
                    />
                </div>
            </form>
            <div className='flex items-center gap-6'>
                <div className='text-lg bg-transparent hover:bg-gray-200 rounded-md p-2 cursor-pointer transition-all delay-200 ease-linear'>
                    <GoBell />
                </div>
                <div className='text-lg bg-transparent hover:bg-gray-200 rounded-md p-2 cursor-pointer transition-all delay-200 ease-linear'>
                    <GoCommentDiscussion />
                </div>
                <div className='relative rounded-full size-9 cursor-pointer border-2 border-transparent hover:border-gray-600 transition-all delay-100 ease-linear'>
                    <img 
                        src={currentUser.profilePicture} alt={`Image de l'entreprise`} 
                        className='w-full h-full rounded-full object-cover'
                        onClick={() => setUserMenuToggle(!userMenuToggle)}
                    />
                    {userMenuToggle && (
                        <div className="absolute divide-y right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className='py-2 text-center'>
                                <h1 className='font-medium text-md'>{currentUser.company}</h1>
                            </div>
                            <div className='py-2'>
                                <Link to="/settings/profile" className="hover:bg-gray-50 block px-4 py-2 text-sm text-gray-700">
                                    Profile
                                </Link>
                                <Link to="/settings" className="hover:bg-gray-50 block px-4 py-2 text-sm text-gray-700">
                                    Paramêtres
                                </Link>
                            </div>
                            <div className='py-2'>
                                <button 
                                    onClick={handleSignout}
                                    className="hover:bg-gray-50 w-full text-left block px-4 py-2 text-sm text-gray-700" 
                                >
                                    Se déconnecter
                                </button>
                            </div>
                      </div>
                    )}
                </div>
            </div>
        </nav>
    </div>
  )
}
