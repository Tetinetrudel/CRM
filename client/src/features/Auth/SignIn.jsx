import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { BiExclude } from 'react-icons/bi'
import OAuth from './OAuth'
import { signInFailure, signInStart, signInSuccess } from '../../redux/users/userSlice'
import Alert from '../../components/Alert'

export default function SignIn() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { loading, error: errorMessage } = useSelector((state) => state.user)
    const [formData, setFormaData] = useState({})

    const handleChange = (e) => {
        setFormaData({ ...formData, [e.target.id]: e.target.value})
    }

    const handleSubmit = async (e) => {
      e.preventDefault()
      try {
        dispatch(signInStart())
        const res = await fetch(`http://localhost:3000/api/auth/sign-in`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })
        const data = await res.json()
        if (data.success === false) {
          dispatch(signInFailure(data.message))
          return
        }
        if(res.ok) {
          dispatch(signInSuccess(data))
          navigate('/clients')
        }
      } catch (error) {
        dispatch(signInFailure(error.message))
      }
    }

    return (
      <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <div className='w-full flex items-center justify-center gap-1 text-blue-600'>
                <BiExclude className='text-2xl' />
                <h1 className='text-3xl font-bold'>Barbill</h1>
            </div>
            <h2 className="mt-8 text-center text-xl font-semibold leading-9 tracking-tight text-gray-900">
                Connectez-vous à votre compte
            </h2>
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-3" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Courriel
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="off"
                    required
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 outline-none"
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  <div className="text-sm">
                    <Link to="#" className="font-semibold text-blue-600 hover:text-blue-500">
                        Mot de passe oublié ?
                    </Link>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 outline-none"
                  />
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full justify-center rounded-md bg-blue-600 disabled:bg-gray-300 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {loading ? "Chargement ..." : "Se connecter"}
                </button>
              </div>
              
            </form>
            <div className='mt-4'>
              <OAuth />
            </div>
            <p className="mt-10 text-center text-sm text-gray-500">
              Pas de compte?{' '}
              <Link to="/register" className="font-semibold leading-6 text-blue-600 hover:text-blue-500">
                S'inscrire
              </Link>
            </p>
            {errorMessage && <Alert message={errorMessage} type="failure" />}
          </div>
        </div>
      </>
    )
  }
  