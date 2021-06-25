import React from 'react'
import styles from './Chart.module.css'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export default function Chart() {
    const data = [
        { name: 'Jan', lo: 400, hi: 2400 },
        { name: 'Feb', lo: 600, hi: 2100 },
        { name: 'Mar', lo: 1900, hi: 2900 },
        { name: 'Apr', lo: 5600, hi: 7400 },
        { name: 'May', lo: 4300, hi: 5900 },
    ];
    const renderLineChart = (
        <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <Line type="monotone" dataKey="hi" stroke="#8424d8" activeDot={{ r: 2 }} />
            <Line type="monotone" dataKey="lo" stroke="#8884d8" activeDot={{ r: 2 }} />
            <CartesianGrid stroke="#ccc" strokeDasharray="1 1" />
            <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
            <Legend wrapperStyle={{ top: 289, left: 31 }} />
            <XAxis dataKey="name" />
            <YAxis />
        </LineChart>
    );


    return (
        <div className={styles.chart__container} >
            {renderLineChart}
        </div >
    )
}


