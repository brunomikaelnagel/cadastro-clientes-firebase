import db from "../firestore"
import { Client } from "@/core/client"
import { QueryDocumentSnapshot, SnapshotOptions, doc, addDoc, collection, deleteDoc, getDocs, getDoc, query, setDoc} from "firebase/firestore"

export default class CollectionClients{

    #coversor = {
        toFirestore(client: Client){
            return {
                name: client.name,
                age: client.age
            }
        },
        fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions){
            const data = snapshot.data(options)
            return new Client(data.name, data.age, snapshot.id)
        }
    }
 
    async saveOrUpdate(client: Client){
        const id = client?.id

        if(id){
            setDoc(doc(this.#collection(), id), client)
            return client
        }else{
            const docRef = await addDoc(this.#collection(), client)
            return new Client(client.name, client.age, docRef.id)
        }
    }

    async delete(id: string): Promise<void>{
        deleteDoc(doc(this.#collection(), id))
    }

    async getAll(): Promise<Client[]>{
        const q = query(this.#collection())
        const querySnapshot = await getDocs(q)
        return querySnapshot.docs.map(doc => doc.data())??[]
    }

    async getClient(id: string): Promise<Client | undefined> {
        const docSnap = await getDoc(doc(this.#collection(), id))
        console.log(docSnap.data())
        return docSnap.data()
    }

    #collection(){
        return collection(db, "clients").withConverter(this.#coversor)
    }
}