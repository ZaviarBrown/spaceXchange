import React, { createContext, useState, useContext } from 'react'

export const ChartContext = createContext()

export const ChartProvider = (props) => {
    let hour1 = 3600
    let hours24 = 86399
    let week = 604799
    let year = 31536600
    let today = Date.now() / 1000
    let yesterday = today - hours24
    let lastWeek = today - week
    let lastYear = today - year

    const [start, setStart] = useState(lastWeek)
    const [stop, setStop] = useState(today)
    const [type, setType] = useState('dogecoin')
    const [time, setTime] = useState('week') //day, week, 6month, year

    return (
        <ChartContext.Provider value={{ start, stop, type, time, setStart, setStop, setType, setTime }}>
            {props.children}
        </ChartContext.Provider>
    )
}

export const useChart = () => {
    return useContext(ChartContext)
}
