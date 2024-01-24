// Firebase
import db from "../../firebase/firestore"
import { collection, updateDoc, addDoc, doc } from "firebase/firestore";

// React
import { Dispatch, FormEvent, SetStateAction } from "react";

// Class
import { Client } from "@/core/client";

// Components
import Input from "../Input";
import Button from "../Button";


interface IFormProps {
    client: Client
    saveOrUpdateFn: ( client: Client ) => void
    cancelFn: () => void
}

function useForm({ client, saveOrUpdateFn, cancelFn }: IFormProps){
    
    function isValidFormFields({ currentTarget }: FormEvent<HTMLFormElement>): boolean{
        
        const name = currentTarget.client_name.value
        const age = currentTarget.client_age.value

        return name != "" && age > 0
    }

    function getFormClient({ currentTarget }: FormEvent<HTMLFormElement>): Client{

        const name = currentTarget.client_name.value as string
        const age = parseInt(currentTarget.client_age.value)
        const id = currentTarget.client_id?.value as string | undefined

        return new Client(name, age, id)
    }

    function submitForm(e: FormEvent<HTMLFormElement>){
        e.preventDefault()

        if(isValidFormFields(e)){
            const newClient = getFormClient(e)
            saveOrUpdateFn(newClient)
        }
    }

    return {
        client,
        submitForm,
        cancelFn
    }

}

export default function Form( props: IFormProps ){

    const { client, submitForm, cancelFn } = useForm(props)

    return (
        <form onSubmit={submitForm} className="w-full h-full flex flex-col gap-3">
            {
                client.id && <Input type="text" name="client_id" label="Código" readOnly defaultValue={client.id}/>
            }
            <Input type="text" label="Nome" name="client_name" defaultValue={client.name} />
            <Input type="number" label="Idade" name="client_age" defaultValue={client.age} />
            <div className="flex flex-row-reverse gap-3">
                <Button type="button" className="bg-gradient-to-r from-gray-500 to-gray-800" onClick={cancelFn}>Cancelar</Button>
                <Button type="submit" className="bg-gradient-to-r from-blue-500 to-blue-800" >
                    {
                        client.id && "Alterar"
                    }
                    {
                        !client.id && "Salvar"
                    }
                </Button>
            </div>
        </form>
    )
}