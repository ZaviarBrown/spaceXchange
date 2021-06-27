import React, { useState, useEffect } from 'react';
import styles from './Chart.module.css'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Container, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';
import { useChart } from '../../context/ChartContext'
import { F2, F3 } from '../../utils/formatter'
import getter from '../../utils/localStorage'

const ChartForPortfolio = () => {
    const [data, setData] = useState([])
    const [loaded, setLoaded] = useState(false)
    // const data = [{ "name": "2021-06-27T08:31:31.481Z", "price": 3222599.8605286097 }, { "name": "2021-06-27T08:31:31.482Z", "price": 3222599.8605286097 }, { "name": "2021-06-27T08:31:33.452Z", "price": 3233058.448684931 }, { "name": "2021-06-27T08:31:33.453Z", "price": 3233058.448684931 }, { "name": "2021-06-27T08:31:35.451Z", "price": 3233058.448684931 }, { "name": "2021-06-27T08:31:35.452Z", "price": 3233058.448684931 }, { "name": "2021-06-27T08:31:37.456Z", "price": 3233058.448684931 }, { "name": "2021-06-27T08:31:37.457Z", "price": 3233058.448684931 }, { "name": "2021-06-27T08:31:39.451Z", "price": 3219032.977678773 }, { "name": "2021-06-27T08:31:39.452Z", "price": 3219032.977678773 }, { "name": "2021-06-27T08:31:41.458Z", "price": 3219032.977678773 }, { "name": "2021-06-27T08:31:41.460Z", "price": 3219032.977678773 }, { "name": "2021-06-27T08:31:43.466Z", "price": 3236656.373782206 }, { "name": "2021-06-27T08:31:43.467Z", "price": 3236656.373782206 }, { "name": "2021-06-27T08:31:45.467Z", "price": 3236656.373782206 }, { "name": "2021-06-27T08:31:45.468Z", "price": 3236656.373782206 }, { "name": "2021-06-27T08:31:47.454Z", "price": 3236656.373782206 }, { "name": "2021-06-27T08:31:47.456Z", "price": 3236656.373782206 }, { "name": "2021-06-27T08:31:49.455Z", "price": 3220963.016799029 }, { "name": "2021-06-27T08:31:49.457Z", "price": 3220963.016799029 }, { "name": "2021-06-27T08:31:51.474Z", "price": 3220963.016799029 }, { "name": "2021-06-27T08:31:51.476Z", "price": 3220963.016799029 }, { "name": "2021-06-27T08:31:53.452Z", "price": 3210967.7723210882 }, { "name": "2021-06-27T08:31:53.454Z", "price": 3210967.7723210882 }, { "name": "2021-06-27T08:31:55.453Z", "price": 3210967.7723210882 }, { "name": "2021-06-27T08:31:55.454Z", "price": 3210967.7723210882 }, { "name": "2021-06-27T08:31:57.530Z", "price": 3210967.7723210882 }, { "name": "2021-06-27T08:31:57.531Z", "price": 3210967.7723210882 }]
    const draw = (
        <ResponsiveContainer width="100%" aspect={7} >
            <LineChart
                width={300}
                height={200}
                data={data}
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
            >
                <Line type="monotone" dataKey="price" stroke="#8884d8" dot={false} />
                {/* <CartesianGrid strokeDasharray="2 2" /> */}
                <XAxis tick={{ fill: 'lightblue', fontSize: 12 }} dataKey={'name'} />
                <YAxis tick={{ fill: 'lightblue', fontSize: 12 }} domain={["dataMin", 'dataMax']} tickCount={9} />
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
        asyncGetter().then((data) => {
            setData(JSON.parse(data))
            setLoaded(true)
        })
        // setData(asyncGetter())
    }, [])

    if (loaded === false) return null // we need to make sure graph has DATA key before we try to render
    return (
        <>
            <div className={styles.chartWrapper}>
                hello
                {data.length > 0 && draw}
                {console.log(data)}
            </div>
        </>
    );
}



export default ChartForPortfolio