import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"

import { updateUserPasswordStart, updateUserPasswordSuccess, updateUserPasswordFailure } from '../../../redux/users/userSlice'

import Alert from '../../../components/Alert'

import ClipLoader from "react-spinners/ClipLoader"

export default function Security() {
    const { errorPassword: passwordErrorMessage } = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const [passwordLoading, setPasswordLoading] = useState(false)
    const [passwordSuccess, setPasswordSuccess] = useState("")

    const [passwordFormData, setPasswordFormData] = useState({
        actualPassword: "",
        newPassword: "",
        confirmNewPassword: ""
    })

    const handleChangePassword = (e) => {
        setPasswordFormData({...passwordFormData, [e.target.id]: e.target.value})
    }

    const handleSavePassword = async (e) => {
        e.preventDefault()
        try {
            setPasswordLoading(true)
            dispatch(updateUserPasswordStart())
            const res = await fetch(`/api/user/update-password`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(passwordFormData)
            })
            const data = await res.json()
            if(data.success === false) {
                dispatch(updateUserPasswordFailure(data.message))
                setPasswordLoading(false)
                return
            }
            if(res.ok) {
                dispatch(updateUserPasswordSuccess(data))
                setPasswordSuccess("Mise à jour du mot de passe réussi avec succès")
                setPasswordLoading(false)
                setTimeout(() => {
                    setPasswordSuccess(null)
                }, 3000)
            }
        } catch (error) {
            dispatch(updateUserPasswordFailure(error))
            setPasswordLoading(false)
        }
    }
    
    return (
        <>
        <div className="w-64 flex flex-col space-y-2">
            <h1 className="text-lg text-blue-600 font-medium">Changer le mot de passe</h1>
            <p className="text-sm text-gray-600">Mettez à jour votre mot de passe associé à votre compte.</p>
        </div>
        <div className="ml-8 flex-1">
            <form className="flex flex-col space-y-6 max-w-[90%]" onSubmit={handleSavePassword}>
                <div>
                    <label htmlFor="actualPassword" className="block text-sm font-medium leading-6 text-gray-900">
                        Mot de passe actuel
                    </label>
                    <div className="mt-2">
                        <input
                            id="actualPassword"
                            name="actualPassword"
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
                <button 
                    disabled={passwordLoading}
                    className="flex items-center justify-center gap-1 max-w-56 bg-blue-600 hover:bg-blue-500 text-white disabled:bg-gray-200 disabled:text-gray-500 rounded-md py-1 px-6 font-semibold transition-all delay-100 ease-linear"
                >
                {passwordLoading ? ( 
                    <>
                        <ClipLoader
                            size={15}
                            color="#6b7280"
                        />
                            Chargement ...
                    </>
                    ) :
                        "Sauvegarder"
                    }
                </button>
            </form>
            {passwordSuccess && ( <Alert type="success" message={passwordSuccess} /> )}
            {passwordErrorMessage && ( <Alert type="failure" message={passwordErrorMessage} /> )}
        </div>
        </>
    )
}
