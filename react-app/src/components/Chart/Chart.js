import React, { useState, useEffect } from 'react';
import styles from './Chart.module.css'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Container, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';
import { useChart } from '../../context/ChartContext'
import F, { F2, F3 } from '../../utils/formatter'

const Chart = () => {
    const hour1 = 3600
    const hours24 = 86399
    const week = 604799
    const year = 31536600
    let today = Date.now() / 1000
    let yesterday = today - hours24
    let lastWeek = today - week
    let lastYear = today - year
    const [md, setMd] = useState([])
    const [graphName, setGraphName] = useState([]) //weekdays, months, hour
    const [graphData, setGraphData] = useState([]) // from returned mockdata
    const [graphInterval, setGraphInterval] = useState("day") //day, week, 6month, year
    const [start, setStart] = useState(yesterday)
    const [stop, setStop] = useState(today)
    const [type, setType] = useState('litecoin')
    const [time, setTime] = useState('day')
    let mockData = [];
    let coin = "litecoin"
    let months = ["July", "Aug", "Sept", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "June"]
    let arr = [];
    let arrTime = [];
    let counter = 0;
    let weekdays = new Date((lastWeek + (hours24 * 1)) * 1000);
    const multi = {
        "dodgecoin": 1,
        "theta-fuel": 1,
        "leo-token": 1,
        "0x": 1,
        "cardano": 1,
        "algorand": 1,
        "klay-token": 1,
        "kusama": 565,
        "wrapped-bitcoin": 13,
        "huobi-btc": 16,
        "yearn-finance": 81,
        "maker": 9,
        "ethereum": 7,
        "staked-ether": 317,
        "bitcoin-cash": 37,
        "binancecoin": 10,
        "compound-coin": 14,
        "monero": 994,
        "aave": 207,
        "bitcoin": 2674
    }

    const apiUrl = (x, y, z) => {
        return `https://api.coingecko.com/api/v3/coins/${x}/market_chart/range?vs_currency=usd&from=${y}&to=${z}`
    }
    const apiCall = (coin, start, stop, timeInterval) => fetch(apiUrl(coin, start, stop, timeInterval))
        .then(data => data.json())
        .then(data => data.prices)
        .then(data => {
            if (timeInterval === "year") {
                for (let num in data) {
                    num % 31 === 0 && mockData.push({ name: months[counter], price: Math.floor(data[num][1] * multi.coin) }) && counter++;
                }
            }
            else if (timeInterval === "6months") {
                counter = 6;
                for (let num in data) {
                    if (num > 182) {
                        num % 15 === 0 && mockData.push({ name: months[counter], price: F2(data[num][1] * multi.coin) });
                        if (mockData.length % 2 === 0 && num % 15 === 0) {
                            counter += 1;
                        }
                    }
                }
            }
            else if (timeInterval === "week") {
                let x = 1
                while (arr.length < 7) {
                    let weekdays = new Date((lastWeek + (hours24 * x)) * 1000);
                    let dayOfTheWeek = weekdays.toString().split(" ")[0]
                    arr.push(dayOfTheWeek)
                    x++
                }
                for (let num in data) {
                    num % 12 === 0 && mockData.push({ name: arr[counter], price: F2(data[num][1] * multi.coin) })
                    if (mockData.length % 2 === 0 && num % 12 === 0) {
                        counter += 1
                    }
                }
            }
            else if (timeInterval === "day") {
                let x = 22
                let currTime;
                while (x > -1) {
                    let time = new Date((today - (hour1 * x)) * 1000);
                    currTime = time.toString().split(" ")[4];
                    currTime = currTime.slice(0, 5);
                    arrTime.push(currTime);
                    x -= 2;
                }
                for (let num in data) {
                    num % 25 === 0 && mockData.push({ name: arrTime[counter], price: F3(data[num][1] * multi.coin) }) && counter++
                }
            }
        })
        .then(() => {
            setGraphData(mockData)
        })


    const draw = (
        <ResponsiveContainer width="100%" aspect={3} >
            <LineChart
                width={500}
                height={400}
                data={graphData}
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
            >
                <Line type="monotone" dataKey={"price"} stroke="#8884d8" dot={false} />
                {/* <CartesianGrid strokeDasharray="2 2" /> */}
                <XAxis tick={{ fill: 'lightblue', fontSize: 12 }} dataKey={"name"} />
                <YAxis tick={{ fill: 'lightblue', fontSize: 12 }} domain={["dataMin", 'dataMax']} tickCount={5} />
                <Tooltip wrapperStyle={{ maxWidth: 130, backgroundColor: '#ccc', color: "black" }} />
                {/* <Legend /> */}
                {/* <Area type="monotone" dataKey={"price"} stroke="#8884d8" fill="#8884d8" /> */}
            </LineChart>
        </ResponsiveContainer >

    )

    useEffect(() => {
        setGraphData('')
        // defaults will be passed in.. probably need to build caller function,
        // that will be invoked off click listener
        // other wise every rerender will default it back after change
        apiCall(type, start, stop, time)

    }, [start])

    if (!graphData) return null // we need to make sure graph has DATA key before we try to render
    return (
        <>
            <div className={styles.chartControlWrapper}>
                <div className={styles.chartWrapper}>
                    {draw}
                </div>
                <div className={styles.chart__controller}>
                    <button onClick={() => {
                        setGraphData('')
                        setType("litecoin")
                        setStart(lastYear)
                        setStop(today)
                        setTime("year")
                        apiCall(type, start, stop, time)
                    }}>year </button>

                    <button onClick={() => {
                        setGraphData('')
                        setType("litecoin")
                        setStart(lastYear)
                        setStop(today)
                        setTime("6months")
                        apiCall(type, start, stop, time)
                    }} >6 months </button>

                    <button onClick={() => {
                        setGraphData('')
                        setType("litecoin")
                        setStart(lastWeek)
                        setStop(today)
                        setTime("week")
                        apiCall(type, start, stop, time)
                    }} >1 week </button>

                    <button onClick={() => {
                        setGraphData('')
                        setType("litecoin")
                        setStart(yesterday)
                        setStop(today)
                        setTime("day")
                        apiCall(type, start, stop, time)
                    }}>24hr </button>
                </div>
            </div>
        </>
    );
}

export default Chart
