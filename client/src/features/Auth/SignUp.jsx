import { useState } from 'react'
import { Link } from 'react-router-dom'

import { BiExclude } from 'react-icons/bi'

import OAuth from './OAuth'

export default function SignUp() {
    const [formData, setFormaData] = useState({})

    const handleChange = (e) => {
        setFormaData({ ...formData, [e.target.id]: e.target.value})
    }

    console.log(formData)

    return (
    <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <div className='w-full flex items-center justify-center gap-1 text-blue-600'>
                    <BiExclude className='text-2xl' />
                    <h1 className='text-3xl font-bold'>Barbill</h1>
                </div>
                <h2 className="mt-8 text-center text-xl font-semibold leading-9 tracking-tight text-gray-900">
                    Créer votre compte gratuitement
                </h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-3" action="#" method="POST">
                    <div>
                        <label htmlFor="company" className="block text-sm font-medium leading-6 text-gray-900">
                            Non de la compagnie
                        </label>
                        <div className="mt-2">
                            <input
                                id="company"
                                name="company"
                                type="text"
                                autoComplete="off"
                                required
                                onChange={handleChange}
                                className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 outline-none"
                            />
                        </div>
                    </div>
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
                                Mot de passe
                            </label>
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
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Confirmation mot de passe
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
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
                            className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            S'inscrire
                        </button>
                    </div>
                </form>
                <div className='mt-4'>
                    <OAuth />
                </div>
                <p className="mt-10 text-center text-sm text-gray-500">
                    Vous avez déjà un compte?{' '}
                    <Link to="/login" className="font-semibold leading-6 text-blue-600 hover:text-blue-500">
                        Se connecter
                    </Link>
                </p>
            </div>
        </div>
    </>
    )
  }
  