import React, { useState, useEffect } from 'react';
import styles from './Chart.module.css'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Container, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';


const Chart = () => {
    const [name, setName] = useState('');
    const [dk, setDk] = useState('');
    const [graphData, setGraphData] = useState([]);
    const [timeInterval, setTimeInterval] = useState("day");
    const [md, setMd] = useState([])
    let hour1 = 3600
    let hours24 = 86399
    let week = 604799
    let year = 31536600
    let today = Date.now() / 1000
    let yesterday = today - hours24
    let lastWeek = today - week
    let lastYear = today - year
    let mockData = [];
    let coin = "litecoin"
    let months = ["July", "Aug", "Sept", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "June"]
    let arr = [];
    let arrTime = [];
    let counter = 0;
    let weekdays = new Date((lastWeek + (hours24 * 1)) * 1000);
    const apiUrl = (x, y, z) => {
        return `https://api.coingecko.com/api/v3/coins/${x}/market_chart/range?vs_currency=usd&from=${y}&to=${z}`
    }
    const apitest = (coin, start, stop, timeInterval) => fetch(apiUrl(coin, start, stop, timeInterval))
        .then(data => data.json())
        .then(data => data.prices)
        .then(data => {
            if (timeInterval === "year") {
                for (let num in data) {
                    num % 31 === 0 && mockData.push({ name: months[counter], price: data[num][1] }) && counter++;
                }
            }
            else if (timeInterval === "6months") {
                counter = 6;
                for (let num in data) {
                    if (num > 182) {
                        num % 15 === 0 && mockData.push({ name: months[counter], price: data[num][1] });
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
                    num % 12 === 0 && mockData.push({ name: arr[counter], price: data[num][1] })
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
                    num % 25 === 0 && mockData.push({ name: arrTime[counter], price: data[num][1] }) && counter++
                }
            }
        })
        .then(() => {
            console.log(mockData)
            setMd(mockData)
        })


    const draw = (
        <ResponsiveContainer width="100%" aspect={3} >
            <LineChart
                width={500}
                height={400}
                data={md}
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
            >
                <Line type="monotone" dataKey={"price"} stroke="#8884d8" activeDot={{ r: 2 }} />
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={"name"} />
                <YAxis />
                <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
                <Legend />
                {/* <Area type="monotone" dataKey="price" stroke="#8884d8" fill="#8884d8" /> */}
            </LineChart>
        </ResponsiveContainer >
    )

    useEffect(() => {
        setMd('')
        apitest(coin, lastYear, today, "year")
    }, [])

    if (!md) return null
    return (
        <>
            {draw}
        </>
    );
}

export default Chart