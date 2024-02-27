import { useSelector, useDispatch } from "react-redux"

import { deleteUserStart, deleteUserFailure, deleteUserSuccess } from '../../../redux/users/userSlice'

export default function DeleteUser() {
    const { currentUser } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    
    const handleDeleteUser = async () => {
        try {
            dispatch(deleteUserStart())
            const res = await fetch(`/api/user/delete-user/${currentUser._id}`, {
              method: 'DELETE',
            })
            const data = await res.json();
            if (!res.ok) {
              dispatch(deleteUserFailure(data.message))
            } else {
              dispatch(deleteUserSuccess(data))
            }
          } catch (error) {
            dispatch(deleteUserFailure(error.message))
          }
    }

    return (
        <div className="flex items-start p-10 mb-10">
            <div className="w-64 flex flex-col space-y-2">
                <h1 className="text-lg text-blue-600 font-medium">Supprimer le compte</h1>
                <p className="text-sm text-gray-600">Vous ne souhaitez plus utiliser nos services ? Vous pouvez supprimer votre compte ici. Cette action n'est pas réversible. Toutes les informations relatives à ce compte seront définitivement supprimées.</p>
            </div>
            <button 
                onClick={handleDeleteUser}
                className="ml-8 bg-red-600 text-white hover:bg-red-500 rounded-md py-1 px-6"
            >Supprimer le compte</button>
        </div>
    )
}
