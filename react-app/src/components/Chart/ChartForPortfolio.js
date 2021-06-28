import React, { useState, useEffect } from 'react';
import styles from './Chart.module.css'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Container, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';
import { useChart } from '../../context/ChartContext'
import { F2, F3 } from '../../utils/formatter'
import getter from '../../utils/localStorage'
import { useHistory } from '../../context/HistoryContext'

const ChartForPortfolio = ({ history }) => {
    const { historyCtxt } = useHistory()
    const [data, setData] = useState([])
    const [loaded, setLoaded] = useState(false)

    const draw = (
        <ResponsiveContainer width="100%" aspect={3} >
            <LineChart
                width={300}
                height={200}
                data={history}
                margin={{
                    top: 10,
                    right: 30,
                    left: 27,
                    bottom: 0,
                }}
            >
                <Line type="monotone" dataKey="value" stroke="#8884d8" dot={false} />
                {/* <CartesianGrid strokeDasharray="2 2" /> */}
                <XAxis tick={{ fill: 'lightblue', fontSize: 12 }} dataKey={'name'} />
                <YAxis tick={{ fill: 'lightblue', fontSize: 12 }} domain={["dataMin + 10000", 'dataMax+ 10000']} tickCount={5} />
                <Tooltip wrapperStyle={{ maxWidth: 250, backgroundColor: '#ccc', color: "black" }} />
                {/* <Legend /> */}
                {/* <Area type="monotone" dataKey={"price"} stroke="#8884d8" fill="#8884d8" /> */}
            </LineChart>
        </ResponsiveContainer >
    )
    let asyncGetter = () => {
        let holder = getter()
        return holder
    }
    useEffect(() => {
        // setData(history)
        setData(historyCtxt) && setLoaded(true)

        // setData(asyncGetter())
    }, [])

    // if (loaded === false) return null // we need to make sure graph has DATA key before we try to render
    return (
        <>
            <div className={styles.chartWrapper}>
                {draw}
            </div>
        </>
    );
}



export default ChartForPortfolio