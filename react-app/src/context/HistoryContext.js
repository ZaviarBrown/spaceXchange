import React, { createContext, useState, useContext } from 'react'

export const HistoryContext = createContext()

export const HistoryProvider = (props) => {

    const [historyCtxt, setHistoryCtxt] = useState([])

    return (
        <HistoryContext.Provider value={{ historyCtxt, setHistoryCtxt }}>
            {props.children}
        </HistoryContext.Provider>
    )
}

export const useHistory = () => {
    return useContext(HistoryContext)
}