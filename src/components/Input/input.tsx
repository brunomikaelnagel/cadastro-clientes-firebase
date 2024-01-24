// React
import { ReactNode, InputHTMLAttributes } from "react"

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string
}

export default function Input( { className, label, ...restProps }: IInputProps ){
    return(
        <label className="flex flex-col gap-4">
            {label}
            <input className={"outline-none rounded-md px-4 py-3 border border-purple-300"} {...restProps} />
        </label>
    ) 
    
}