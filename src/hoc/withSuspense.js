import React from "react"
import Preloader from "../ui/Preloader"

export const withSuspense = (Element) => {
    
    return (
       <React.Suspense fallback={<Preloader/>}>
           <Element/>
       </React.Suspense>
    )
}