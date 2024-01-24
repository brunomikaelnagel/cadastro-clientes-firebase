import { ButtonHTMLAttributes, ReactNode } from "react";

export default function Button( { children, className , ...restProps }: ButtonHTMLAttributes<HTMLButtonElement> ){
    return <button className={"rounded-md px-3 py-2 text-white " + className} {...restProps} >{children}</button>
}