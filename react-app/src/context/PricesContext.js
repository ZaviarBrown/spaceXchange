import React, { createContext, useState, useContext } from 'react'

export const PricesContext = createContext()

export const PricesProvider = (props) => {

    const [pricesCtxt, setPricesCtxt] = useState([])

    return (
        <PricesContext.Provider value={{ pricesCtxt, setPricesCtxt }}>
            {props.children}
        </PricesContext.Provider>
    )
}

export const usePrices = () => {
    return useContext(PricesContext)
}