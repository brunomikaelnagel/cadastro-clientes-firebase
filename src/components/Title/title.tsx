// React
import { ReactNode } from "react";

export default function Title( { children }: { children: ReactNode } ){
    return(
        <header className="border-b-4 border-purple-600 text-start">
            <h1 className="px-6 py-2 text-2xl text-black font-medium" >{children}</h1>
        </header>
    )
}