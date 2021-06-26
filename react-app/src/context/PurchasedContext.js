import { useContext, createContext, useState } from "react"


export const PurchasedProvider = (props) => {
    // array to hold the purchased names to make sure we dont double purchase
    // maybe we can use this
    const [purchased, setPurchased] = useState([])

    return (
        <PurchasedContext.Provider value={{ e }}>
            {props.children}
        </PurchasedContext.Provider>
    )
}

export const usePurchased = () => {
    return useContext(PurchasedContext)
}
