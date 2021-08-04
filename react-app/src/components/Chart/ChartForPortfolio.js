import React, { useState, useEffect } from "react";
import styles from "./Chart.module.css";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Container,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";
import { useChart } from "../../context/ChartContext";
import { F2, F3 } from "../../utils/formatter";
import getter from "../../utils/localStorage";
import { useHistory } from "../../context/HistoryContext";

const ChartForPortfolio = ({ history }) => {
  const { historyCtxt } = useHistory();
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const draw = (
    <ResponsiveContainer width="100%" aspect={3}>
      <LineChart
        width={300}
        height={200}
        data={history}
        margin={{
          top: 10,
          right: 30,
          left: 27,
          bottom: 1,
        }}
      >
        <Line type="monotone" dataKey="value" stroke="#8884d8" dot={false} />
        <XAxis tick={{ fill: "lightblue", fontSize: 12 }} dataKey={"name"} />
        <YAxis
          tick={{ fill: "lightblue", fontSize: 12 }}
          domain={["dataMin - 100000", "dataMax + 100000"]}
          tickCount={5}
          allowDataOverflow={false}
        />
        <Tooltip
          wrapperStyle={{
            maxWidth: 250,
            backgroundColor: "#ccc",
            color: "black",
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
  let asyncGetter = () => {
    let holder = getter();
    return holder;
  };
  useEffect(() => {
    setData(historyCtxt) && setLoaded(true);
  }, []);

  return (
    <>
      <div className={styles.chartWrapper}>{draw}</div>
    </>
  );
};

export default ChartForPortfolio;
