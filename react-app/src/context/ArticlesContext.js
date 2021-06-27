import React, { createContext, useState, useContext } from 'react'

export const ArticlesContext = createContext()

export const ArticlesProvider = (props) => {



    const [] = useState()

    return (
        <ArticlesContext.Provider value={{}}>
            {props.children}
        </ArticlesContext.Provider>
    )
}

export const useArticles = () => {
    return useContext(ChartContext)
}