import React, { createContext, useState, useContext } from 'react'

export const ArticlesContext = createContext()

export const ArticlesProvider = (props) => {

    const [articlesCtxt, setArticlesCtxt] = useState('')

    return (
        <ArticlesContext.Provider value={{ articlesCtxt, setArticlesCtxt }}>
            {props.children}
        </ArticlesContext.Provider>
    )
}

export const useArticles = () => {
    return useContext(ArticlesContext)
}