import React from 'react'
import { BiExclude } from 'react-icons/bi'
import { Link } from 'react-router-dom'

import { GoChecklist, GoPeople, GoTable, GoSignOut } from "react-icons/go"
import { AiOutlineLineChart, AiOutlineShoppingCart } from "react-icons/ai"

export default function Sidebar() {

    const links = [
        { title: "Ventes", link: '/sales', icon: <AiOutlineShoppingCart /> }, { title: "Clients", link: '/clients', icon: <GoPeople />},
        { title: "Produits", link: '/products', icon: <GoTable /> }, { title: "Inventaire", link: '/inventory', icon: <GoChecklist />},
        { title: "Rapports", link: '/reports', icon: <AiOutlineLineChart />}
    ]

  return (
    <div className='w-[250px] border-r border-r-gray-300 py-4 px-6'>
        <div>
            <Link to="/" className='flex items-center gap-1 text-blue-600 text-2xl'>
                <BiExclude />
                <h1 className='font-bold'>Barbill</h1>
            </Link>
        </div>
        <div className='h-full flex flex-col justify-between'>
            <ul className='mt-12 flex flex-col space-y-3'>
                {links.map((el) => (
                    <li key={el.title} className='bg-transparent text-sm text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-600 rounded-md py-2 px-4 flex transition-all delay-150 ease-linear'>
                        <Link to={el.link} className='flex-1 flex items-center gap-2'>
                            <span className='text-lg'>{el.icon}</span>
                            {el.title}
                        </Link>
                    </li>
                ))}
            </ul>
            <button className='flex items-center gap-2 mb-12 bg-transparent text-sm text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-600 rounded-md py-2 px-4 transition-all delay-150 ease-linear'>
                    <GoSignOut className='text-lg'/>
                    <span>Se déconnecter</span>
            </button>
        </div>
    </div>
  )
}
