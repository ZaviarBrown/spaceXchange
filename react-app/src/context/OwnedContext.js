import React, { createContext, useState, useContext } from 'react'

export const OwnedContext = createContext()

export const OwnedProvider = (props) => {

    const [ownedCtxt, setOwnedCtxt] = useState('')

    return (
        <OwnedContext.Provider value={{ ownedCtxt, setOwnedCtxt }}>
            {props.children}
        </OwnedContext.Provider>
    )
}

export const useOwned = () => {
    return useContext(OwnedContext)
}