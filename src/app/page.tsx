"use client"

// Icons
import { iconEdit, iconDelete } from "@/icons/icons";

// Hooks
import useClients from "@/hooks/useClients";


// Components
import Table from "@/components/Table";
import Button from "@/components/Button";
import Form from "@/components/Form";



export default function Home() {

  const { 
    isVisible, 
    setIsVisible, 
    client, 
    clients, 
    newClient, 
    fetchEditClient, 
    fetchDeleteClient, 
    fetchSaveOrUpdateClient 
  } = useClients()

  return (
    <div className="px-5 py-5">
      {
        isVisible === "list" && (
          <div className="flex flex-col items-end">
            <Button onClick={newClient} className="my-3 bg-gradient-to-r from-green-500 to-green-800">Novo Cliente</Button>
            <Table 
              data={clients}
              headers={["Código", "Nome", "Idade"]}
              columns={["id", "name", "age"]}
              actions={[{fn: fetchEditClient, icon: iconEdit}, {fn: fetchDeleteClient, icon: iconDelete}]}
            />
          </div>
        )
      }
      {
        isVisible !== "list" && (
          <div className="rounded-md w-full h-full flex flex-col bg-gray-200 px-3 py-4">
            <Form client={client} cancelFn={() => setIsVisible("list")} saveOrUpdateFn={fetchSaveOrUpdateClient} />
          </div>
        )
      }
    </div>
  );
}
