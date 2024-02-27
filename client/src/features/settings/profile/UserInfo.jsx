import { useRef, useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import { updateUserStart, updateUserSuccess, updateUserFailure } from '../../../redux/users/userSlice'

import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../../../firebase'

import Alert from '../../../components/Alert'
import ClipLoader from "react-spinners/ClipLoader"

export default function UserInfo() {
    const { currentUser, loading, error: errorMessage } = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const fileRef = useRef(null)
    const [success, setSuccess] = useState(null)
    const [formData, setFormData] = useState({
        company: currentUser.company,
        email: currentUser.email,
        profilePicture: currentUser.profilePicture
    })
    const [imageFile, setImageFile] = useState(null)
    const [imageFileUrl, setImageFileUrl] = useState(null)
    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null)
    const [imageFileUploadError, setImageFileUploadError] = useState(null)
    const [imageFileUploading, setImageFileUploading] = useState(false)

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
          setImageFile(file)
          setImageFileUrl(URL.createObjectURL(file))
        }
    }

    useEffect(() => {
        if (imageFile) {
          uploadImage()
        }
    }, [imageFile])
    
    const uploadImage = async () => {
        setImageFileUploading(true)
        setImageFileUploadError(null)
        const storage = getStorage(app)
        const fileName = new Date().getTime() + imageFile.name
        const storageRef = ref(storage, fileName)
        const uploadTask = uploadBytesResumable(storageRef, imageFile)
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                setImageFileUploadProgress(progress.toFixed(0))
            },
            (error) => {
                setImageFileUploadError(`Impossible de charger l'image (Le fichier doit avoir 2MB et moins)`)
                setImageFile(null)
                setImageFileUrl(null)
                setImageFileUploading(false)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageFileUrl(downloadURL)
                    setFormData({ ...formData, profilePicture: downloadURL })
                    setImageFileUploading(false)
                })
            }
        )
    }

    const handleChangeUser = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value})
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
        <>
        <div className="w-64 flex flex-col space-y-2">
                <h1 className="text-lg text-blue-600 font-medium">Information du compte</h1>
                <p className="text-sm text-gray-600">Image, nom et courriel de l'entreprise</p>
        </div>
        <div className="ml-8 flex-1">
            <div>
                <div className="flex items-center gap-10 mb-8">
                    <div className="size-20 rounded-md">
                        <img 
                            src={imageFileUrl || currentUser.profilePicture}
                            className="w-full h-full rounded-md"
                        />
                    </div>
                    <div className="flex flex-col items-start">
                        <button 
                            disabled={imageFileUploading}
                            onClick={() => fileRef.current.click()}
                            className="flex items-center justify-center gap-1 bg-blue-600 hover:bg-blue-500 text-white rounded-md py-1 px-6 mb-2 disabled:bg-gray-200 disabled:text-gray-500"
                        >
                        {imageFileUploading ? ( 
                            <>
                                <ClipLoader
                                    size={15}
                                    color="#6b7280"
                                />
                                Chargement ...
                            </>
                            ) :
                                "Changer d'image"}
                        </button>
                        <p className="text-xs text-gray-600">JPG, Gif ou PNG. max 2mb</p>
                        <input 
                            type="file" 
                            name="profilePicture" 
                            id="profilePicture" 
                            hidden ref={fileRef} 
                            accept='image/*'
                            onChange={handleImageChange}
                        />
                    </div>
                </div> 
                {imageFileUploadError && ( 
                    <div className="w-96 mb-6">
                        <Alert type="failure" message={imageFileUploadError} />
                    </div>
                )}
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
                    <button
                        disabled={loading}
                        className="flex items-center justify-center gap-1 max-w-56 bg-blue-600 hover:bg-blue-500 text-white disabled:bg-gray-200 disabled:text-gray-500 rounded-md py-1 px-6 font-semibold transition-all delay-100 ease-linear"
                    >
                    {loading ? ( 
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
                {success && ( <Alert type="success" message={success} /> )}
                {errorMessage && ( <Alert type="failure" message={errorMessage} /> )}
            </div>
        </div>
        </>
    )
}
