import React, { useState, useEffect } from 'react';
import styles from './Chart.module.css'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


const Chart = () => {
    const [graphData, setGraphData] = useState([]);
    const [timeInterval, setTimeInterval] = useState("day")
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
    // console.log(todaysDate)
    let counter = 0;
    let counter2 = 0;
    let weekdays = new Date((lastWeek + (hours24 * 1)) * 1000);
    console.log(weekdays.toString().split(" ")[0])
    const apiUrl = (x, y, z) => {
        return `https://api.coingecko.com/api/v3/coins/${x}/market_chart/range?vs_currency=usd&from=${y}&to=${z}`
    } 

    const apitest = (coin, start, stop, timeInterval) => fetch(apiUrl(coin, start, stop, timeInterval))
        .then( data => data.json())
        .then( data => data.prices)
        .then( data => {
            if (timeInterval === "year") {
                for (let num in data) {
                    num % 31 === 0 && mockData.push({name: months[counter] ,price: data[num][1]}) && counter++;
                } 
            }
            else if (timeInterval === "6months") {
                counter = 6;
                for (let num in data) {
                    num % 16 === 0 && mockData.push({name: months[counter] ,price: data[num][1]}) && counter++;
                }
            }
            else if (timeInterval === "week") {
                let x = 1
                while (arr.length < 7){
                    let weekdays = new Date((lastWeek + (hours24 * x)) * 1000);
                    let dayOfTheWeek = weekdays.toString().split(" ")[0]
                    arr.push(dayOfTheWeek)
                    x++
                }
                for (let num in data) {
                    num % 12 === 0 && mockData.push({name: arr[counter] , price: data[num][1]}) 
                    if (mockData.length % 2 === 0 && num % 12 === 0) {
                        counter+= 1
                    }
                }
            }
        })
        .then( () => console.log(mockData))
    useEffect(() => {
        apitest(coin, lastWeek, today, "week")
    }, [])

    return ( 
        <ResponsiveContainer width="100%" aspect={3}>
        <AreaChart
            width={500}
            height={400}
            data={mockData}
            margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="price" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
        </ResponsiveContainer>
    );
}

export default Chart;