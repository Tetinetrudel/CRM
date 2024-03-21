import { useState } from 'react'

import { BiSearch, BiSort, BiSortAZ, BiSortZA } from 'react-icons/bi'
import { GoFilter } from 'react-icons/go'
import {TbCash, TbCashOff, TbFilterDollar } from 'react-icons/tb'
import { MdOutlineNumbers } from "react-icons/md"

export default function ClientsFilter({ setFilteredClients, clients }) {
    const [showFilter, setShowFilter] = useState(false)
    const [showSort, setShowSort] = useState(false)

    const handleShowFilter = () => { 
        setShowFilter(!showFilter) 
        setShowSort(false)
    }

    const handleShowSort = () => {
        setShowFilter(false) 
        setShowSort(!showSort)
    }
    
    const handleSearch = () => {}

    const handleAtoZ = () => {
        const filter = [].concat(clients).sort((a,b) => a.name > b.name ? 1 : -1)
        setFilteredClients(filter)
        setShowSort(!showSort)
    }

    const handleZtoA = () => {
        const filter = [].concat(clients).sort((a,b) => a.name > b.name ? -1 : 1)
        setFilteredClients(filter)
        setShowSort(!showSort)
    }
    
    const handleWithBill = () => {
        const filter = clients.filter((client) => client.status === true)
        setFilteredClients(filter)
        setShowFilter(!showFilter)
    }

    const handleWithNoBill = () => {
        const filter = clients.filter((client) => client.status === false)
        setFilteredClients(filter)
        setShowFilter(!showFilter)
    }

    return (
        <div className='py-6 px-10 flex items-center space-x-3'>
            <form>
                <div className='flex items-center w-96'>
                    <BiSearch className='text-gray-800'/>
                    <input 
                        type="search"  
                        id="search" 
                        onChange={handleSearch}
                        placeholder='Chercher un client ...'
                        className='px-2 bg-transparent text-sm outline-none border-none text-gray-800 placeholder:text-gray-400 w-full'
                    />
                </div>
            </form>
            <div className='relative'>
                <div onClick={handleShowFilter} className='flex items-center justify-center size-6 rounded-md border border-gray-400 text-gray-500 hover:shadow-md cursor-pointer p-1'>
                    <GoFilter />
                </div>
                {showFilter && (
                    <div className='absolute flex flex-col items-start gap-2 right-0 top-8 w-max bg-white rounded-md border border-gray-400 py-4'>
                        <button 
                            className='text-sm flex items-center gap-1 py-1 px-6 bg-transparent hover:bg-gray-100'
                            onClick={handleWithBill}    
                        >
                            <TbCash />
                            <span>Avec montant dû</span>
                        </button>
                        <button 
                            className='text-sm flex items-center gap-1 py-1 px-6 bg-transparent hover:bg-gray-100'
                            onClick={handleWithNoBill}    
                        >
                            <TbCashOff />
                            <span>Sans montant dû</span>
                        </button>
                    </div>
                )}
            </div>
            <div className='relative'>
                <div onClick={handleShowSort} className='flex items-center justify-center size-6 rounded-md border border-gray-400 text-gray-500 hover:shadow-md cursor-pointer p-1'>
                    <BiSort />
                </div>
                {showSort && (
                    <div className='absolute flex flex-col items-start gap-2 right-0 top-8 w-max bg-white rounded-md border border-gray-400 py-4'>
                        <button 
                            className='text-sm w-full flex items-center gap-1 py-1 px-6 bg-transparent hover:bg-gray-100'
                            onClick={handleAtoZ}
                        >
                            <BiSortAZ />
                            <span>A à Z</span>
                        </button>
                        <button 
                            className='text-sm w-full flex items-center gap-1 py-1 px-6 bg-transparent hover:bg-gray-100'
                            onClick={handleZtoA}    
                        >
                            <BiSortZA />
                            <span>Z à A</span>
                        </button>
                        <button className='text-sm w-full flex items-center gap-1 py-1 px-6 bg-transparent hover:bg-gray-100'>
                            <TbFilterDollar />
                            <span>Montant dû</span>
                        </button>
                        <button className='text-sm w-full flex items-center gap-1 py-1 px-6 bg-transparent hover:bg-gray-100'>
                            <MdOutlineNumbers />
                            <span># de carte</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}