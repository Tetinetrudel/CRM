import { Link, useNavigate } from'react-router-dom'

import { GoEye, GoTrash } from 'react-icons/go'
import { BiEditAlt } from 'react-icons/bi'

export default function ClientList({ filteredClients }) {
    const navigate = useNavigate()
    
    
    const handleDetail = (clientId) => {
        navigate(`/clients/${clientId}`)
    }

    const freeBill = 'bg-green-50 border border-green-600 text-green-600 rounded-md text-sm px-4'
    const warningBill = 'bg-yellow-50 border border-yellow-600 text-yellow-600 rounded-md text-sm px-4'
    const dangerBill = 'bg-red-50 border border-red-600 text-red-600 rounded-md text-sm px-4'
    const today = new Date()

  return (
    <table className='w-[95%] mx-auto'>
        <thead>
            <tr className='bg-gray-50 text-left'>
                <th className='text-xs text-gray-800 font-medium w-[20%] rounded-l-md py-2 pl-6'>Client</th>
                <th className='text-xs text-gray-800 font-medium w-[20%] py-2'>Courriel</th>
                <th className='text-xs text-gray-800 font-medium w-[20%] py-2'>Status</th>
                <th className='text-xs text-gray-800 font-medium w-[20%] py-2'>Montant du</th>
                <th className='text-xs text-gray-800 font-medium w-[20%] rounded-r-md py-2 pr-6'>Actions</th>
            </tr>
        </thead>
        <tbody>
        {!filteredClients.length && (<p className='text-sm pl-6 pt-6'>Aucun clients</p>)}
        {filteredClients.length > 0 && filteredClients.map((client, index) => (
        <tr key={index}>
            <td className='pt-6 pl-6'>
                <h1 className='text-sm text-gray-800 font-medium'>{client.name}</h1>
            </td>
            <td className='pt-6'>
                <p className='text-xs text-gray-500'>{client.email}</p>
            </td>
            <td className='pt-6'> 
                {client.status ?
                    <span className='rounded-xl border border-red-500 bg-red-50 text-red-500 px-6 text-xs'>Avec solde</span>
                :
                    <span className='rounded-xl border border-green-500 bg-green-50 text-green-500 px-6 text-xs'>Sans solde</span>
                }
            </td>
            <td className='pt-6'> 0.00 $</td>
            <td className='flex items-center gap-4 pt-6'>
                <Link to={`/clients/${client._id}`}>
                    <GoEye className='cursor-pointer text-gray-800 hover:text-gray-600'/>
                </Link>
                <BiEditAlt className='cursor-pointer text-blue-800 hover:text-blue-600'/>
                <GoTrash className='cursor-pointer text-red-800 hover:text-red-600'/>
            </td>
        </tr>
        ))}
        </tbody>
    </table>
  )
}
