import { useRef, useState } from "react"
import { useSelector, useDispatch } from "react-redux"

import { updateUserStart, updateUserSuccess, updateUserFailure } from '../../redux/users/userSlice'

import Alert from '../../components/Alert'

export default function Profile() {
    const { currentUser, loading, error: errorMessage } = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const fileRef = useRef(null)
    const [success, setSuccess] = useState(null)
    const [formData, setFormData] = useState({
        company: currentUser.company,
        email: currentUser.email,
        profilePicture: currentUser.profilePicture
    })

    const [passwordFormData, setPasswordFormData] = useState({
        password: "",
        newPassword: "",
        confirmNewPassword: ""
    })

    const handleChangeUser = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value})
    }

    const handleChangePassword = (e) => {
        setPasswordFormData({...passwordFormData, [e.target.id]: e.target.value})
    }

    const handleSaveUser = async (e) => {
        e.preventDefault()
        try {
            dispatch(updateUserStart())
            const res = await fetch(`/api/user/update-user`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            const data = await res.json()
            if(data.success === false) {
                dispatch(updateUserFailure(data.message))
                return
            }
            if(res.ok) {
                dispatch(updateUserSuccess(data))
                setSuccess("Mise à jour du profil réussi avec succès")
                setTimeout(() => {
                    setSuccess(null)
                }, 3000)
            }
        } catch (error) {
            dispatch(updateUserFailure(error))
        }
    }

  return (
    <div className="flex flex-col space-y-2 divide-y h-full my-6">
        <div className="flex items-start px-10 mb-10">
            <div className="w-64 flex flex-col space-y-2">
                <h1 className="text-lg text-blue-600 font-medium">Information du compte</h1>
                <p className="text-sm text-gray-600">Image, nom et courriel de l'entreprise</p>
            </div>
            <div className="ml-8 flex-1">
                <div>
                    <div className="flex items-center gap-10 mb-8">
                        <div className="size-20 rounded-md">
                            <img src={currentUser.profilePicture} className="w-full h-full rounded-md"/>
                        </div>
                        <div className="flex flex-col items-start">
                            <button 
                                onClick={() => fileRef.current.click()}
                                className="bg-blue-600 hover:bg-blue-500 text-white rounded-md py-1 px-6 mb-2"
                            >
                                Changer d'image
                            </button>
                            <p className="text-xs text-gray-600">JPG, Gif ou PNG. max 2mb</p>
                            <input type="file" name="profilePicture" id="profilePicture" hidden ref={fileRef} accept='image/*'/>
                        </div>
                    </div>
                </div>
                <div>
                    <form className="flex flex-col space-y-6 max-w-[90%]" onSubmit={handleSaveUser}>
                        <div>
                            <label htmlFor="company" className="block text-sm font-medium leading-6 text-gray-900">
                                Nom de l'entrprise
                            </label>
                            <div className="mt-2">
                                <input
                                    id="company"
                                    name="company"
                                    type="text"
                                    autoComplete="off"
                                    required
                                    value={formData.company}
                                    onChange={handleChangeUser}
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
                                    value={formData.email}
                                    onChange={handleChangeUser}
                                    className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 outline-none"
                                />
                            </div>
                        </div>
                        <button className="max-w-56 bg-blue-600 hover:bg-blue-500 text-white rounded-md py-1 px-6 font-semibold transition-all delay-100 ease-linear"> Sauvegarder</button>
                    </form>
                    {success && ( <Alert type="success" message={success} /> )}
                    {errorMessage && ( <Alert type="failure" message={errorMessage} /> )}
                </div>
            </div>
        </div>
        <div className="p-10 flex items-start">
            <div className="w-64 flex flex-col space-y-2">
                <h1 className="text-lg text-blue-600 font-medium">Changer le mot de passe</h1>
                <p className="text-sm text-gray-600">Mettez à jour votre mot de passe associé à votre compte.</p>
            </div>
            <div className="ml-8 flex-1">
                <form className="flex flex-col space-y-6 max-w-[90%]">
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                            Mot de passe actuel
                        </label>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="off"
                                required
                                value={passwordFormData.password}
                                onChange={handleChangePassword}
                                className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 outline-none"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium leading-6 text-gray-900">
                            Nouveau mot de passe
                        </label>
                        <div className="mt-2">
                            <input
                                id="newPassword"
                                name="newPassword"
                                type="password"
                                autoComplete="off"
                                required
                                value={passwordFormData.newPassword}
                                onChange={handleChangePassword}
                                className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 outline-none"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="confirmNewPassword" className="block text-sm font-medium leading-6 text-gray-900">
                            Confirmez nouveau mot de passe
                        </label>
                        <div className="mt-2">
                            <input
                                id="confirmNewPassword"
                                name="confirmNewPassword"
                                type="password"
                                autoComplete="off"
                                required
                                value={passwordFormData.confirmNewPassword}
                                onChange={handleChangePassword}
                                className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 outline-none"
                            />
                        </div>
                    </div>
                    <button className="max-w-56 bg-blue-600 hover:bg-blue-500 text-white rounded-md py-1 px-6 font-semibold transition-all delay-100 ease-linear"> Sauvegarder</button>
                </form>
            </div>
        </div>
        <div className="flex items-start p-10 mb-10">
            <div className="w-64 flex flex-col space-y-2">
                <h1 className="text-lg text-blue-600 font-medium">Supprimer le compte</h1>
                <p className="text-sm text-gray-600">Vous ne souhaitez plus utiliser nos services ? Vous pouvez supprimer votre compte ici. Cette action n'est pas réversible. Toutes les informations relatives à ce compte seront définitivement supprimées.</p>
            </div>
            <button className="ml-8 bg-red-600 text-white hover:bg-red-500 rounded-md py-1 px-6">Supprimer le compte</button>
        </div>
    </div>
  )
}
