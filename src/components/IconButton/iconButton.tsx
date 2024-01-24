import { ButtonHTMLAttributes } from "react"

export default function IconButton( { className, ...restProps }: ButtonHTMLAttributes<HTMLButtonElement> ){
    return(
        <button className="outline-none w-6 h-6" {...restProps} ></button>
    )
}