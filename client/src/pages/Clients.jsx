import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import ClientList from "../features/Clients/ClientList"
import ClientsFilter from "../features/Clients/ClientsFilter"

import Loader from '../components/Loader'

export default function Clients() {
  const dispatch = useDispatch()
  const { clients, error, loading } = useSelector((state) => state.clients)
  const [filteredClients, setFilteredClients] = useState(clients)

  return (
    <div className="mt-6">
        <div className="flex justify-between items-center mb-6">
          <ClientsFilter setFilteredClients={setFilteredClients} clients={clients} />
          <button className="mr-10 bg-blue-600 hover:bg-blue-800 text-white font-medium text-sm rounded-md py-1 px-6">Ajouter un client</button>
        </div>
        {loading ? <Loader /> : <ClientList filteredClients={filteredClients}/> }
    </div>
  )
}
