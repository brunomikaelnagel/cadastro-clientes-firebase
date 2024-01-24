// React
import { useState, useEffect } from "react"

// Class
import { Client } from "@/core/client"

// Firebase
import CollectionClients from "@/firebase/collections/clients"

export default function useClients(){
    
    const clientsRepository = new CollectionClients()

    const [isVisible, setIsVisible] = useState<"list" | "form">("list")
    const [client, setClient] = useState<Client>(Client.vazio())
    const [clients, setClients] = useState<Client[]>([])

    function fetchClients(){
        clientsRepository.getAll().then(clients => setClients(clients))
        setIsVisible("list")
      }
    
      async function fetchEditClient(id: string){
        const client = await clientsRepository.getClient(id)
        if(client){
          setClient(client)
          setIsVisible("form")
        }
      }
    
      async function fetchSaveOrUpdateClient(client: Client){
        await clientsRepository.saveOrUpdate(client)
        fetchClients()
      }
    
      async function fetchDeleteClient(id: string){
        await clientsRepository.delete(id)
        fetchClients()
      }
    
      async function fetchClientById(id: string){
        const client = await clientsRepository.getClient(id)
        if(client){
          setClient(client)
          setIsVisible("form")
        }
      }
      
      function newClient(){
        setClient(Client.vazio())
        setIsVisible("form")
      }

      useEffect(fetchClients, [])

    return {
        isVisible,
        setIsVisible,
        client,
        clients,
        fetchClients,
        fetchEditClient,
        fetchSaveOrUpdateClient,
        fetchDeleteClient,
        fetchClientById,
        newClient
    }
}