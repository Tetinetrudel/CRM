import React from 'react'
import { BiExclude } from 'react-icons/bi'
import { Link } from 'react-router-dom'

export default function Sidebar() {

    const links = [
        { title: "Ventes", link: '/sales' }, { title: "Clients", link: '/clients'},
        { title: "Produits", link: '/products' }, { title: "Inventaire", link: '/inventory' },
        { title: "Rapports", link: '/reports'}
    ]

  return (
    <div className='w-[250px] border-r border-r-gray-300 py-4 px-6'>
        <div>
            <Link to="/" className='flex items-center gap-1 text-blue-600 text-2xl'>
                <BiExclude />
                <h1 className='font-bold'>Barbill</h1>
            </Link>
        </div>
        <ul className='mt-12 flex flex-col space-y-3'>
            {links.map((el) => (
                <li key={el.title} className='bg-transparent text-sm text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-600 rounded-md py-2 px-4 flex transition-all delay-150 ease-linear'>
                    <Link to={el.link} className='flex-1'>
                        {el.title}
                    </Link>
                </li>
            ))}
        </ul>
    </div>
  )
}
