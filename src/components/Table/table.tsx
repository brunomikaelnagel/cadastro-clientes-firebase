// Class
import { Client } from "@/core/client"

// Component
import IconButton from "../IconButton"

interface IAction {
    fn: (id: string) => void
    icon: JSX.Element
}

interface ITableProps {
    headers: string[]
    columns: string[]
    actions: IAction[]
    data: Client[]
}

function useTable( { headers, columns, data, actions }: ITableProps ){

    function renderTableHeader(){
        return (
            <tr>
                {
                    headers.map(header => {
                        return <th className="px-4 py-3 text-start" key={header}>{header}</th>
                    })
                }
                {
                   actions.length > 0 && <th className="px-4 py-3 text-center" key={'Ações'}>{"Ações"}</th>
                }
            </tr>
        ) 
    }

    function renderTableBody(){

        return data.map((record, index) => {

            const key = record.id

            return (
                <tr key={key}>
                    {renderTableRow(record, index)}
                    {renderTableAction(record, index)}
                </tr>
            )
        })
    }

    function renderTableRow(client: Client, index: number){
        return columns.map(column => {
            const key = column as keyof Client
            const data = client[key]
            if(data){
                return tableData(data, index, key)
            }
        })
    }

    function tableData(data: string | number, index: number, key: string){
        return <td className={`p-4 text-left ${tableRowColor(index)}`} >{data}</td>
    }

    function renderTableAction(client: Client, index: number){
        const id = client.id
        if(id){
            const data = actions?.map(action => {
                return <IconButton onClick={() => action.fn(id)}  >{action.icon}</IconButton>
            })
            return actionData(data, index, id + "_actions")
        }
    }

    function actionData(data: JSX.Element[], index: number, key: string){
        return(
            <td className={`p-1 ${tableRowColor(index)} `} key={key} >
                <div className="flex flex-row justify-around">{data}</div>
            </td>
        )
    }

    function tableRowColor(index: number){
        return index % 2 !== 0 ? "bg-purple-200" : "bg-purple-100"
    }

    return {
        renderTableHeader,
        renderTableBody
    }

}

export default function Table( props: ITableProps ){
    
    const { renderTableHeader, renderTableBody } = useTable(props)
    
    return(
        <table className="w-full rounded-md overflow-hidden">
            <thead className="bg-gradient-to-r from-purple-500 to-purple-800 text-white">
                {renderTableHeader()}
            </thead>
            <tbody>
                {renderTableBody()}
            </tbody>
        </table>
    )
}