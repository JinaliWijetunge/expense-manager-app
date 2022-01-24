import React, { useEffect, useState } from "react";
import { DatePicker } from "antd";
import ChartContainer from "../../components/charts/ChartContainer";
import moment from "moment";
import HTTPClient from "../../services/HTTPClient";
import Endpoints from "../../services/Endpoints";
import Loader from "../../components/loader/Loader";


function HomeView() {
  var day = moment().format("YYYY")
  var month = moment().format("MM")
  const [dateMonth, setDate] = useState(`${day}-${month}`)
  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState(localStorage.username)
  const [chartData, setChartData] = useState([])
  const [overallAmount, setOverallAmount] = useState()
  function onChange(date, dateString) {
    console.log(date, dateString);
    setDate(dateString)
    loadChart(dateString)
    getOverAllAmount()
  }

  useEffect(() => {
    getOverAllAmount()
    loadChart()

  }, [])

  const loadChart = () => {
    setLoading(true)
    HTTPClient.Get(`${Endpoints.GET_ALL_BUDGET}/barchart/${username}/${dateMonth}`)
      .then(data => {
        console.log(data);
        setChartData(data.data.object)
        setLoading(false)


      }).catch(error => {
        console.log(error.msg)
        setLoading(false)
      })

  }
  
  const getOverAllAmount = () => {
    setLoading(true);

    HTTPClient.Get(`${Endpoints.GET_ALL_BUDGET}/piechart/${username}/${dateMonth}`)
        .then(data => {
            console.log(data);
            let array = [{name:"Total Budget", value: data.data.object.totalBudget}, {name: "Total Expenses", value: data.data.object.totalExpense}]
            setOverallAmount(array)
            setLoading(false)


        }).catch(error => {
            console.log(error.msg)
            setLoading(false)

        })
}
  function disabledDate(current) {
    // Can not select days before today and today
    return current && current > moment().endOf('day');
}

  return (
    <div>
      {loading && <Loader />}
      <div className="nic-parent"  >
        <DatePicker
          picker="month"
          onChange={onChange}
          defaultValue={moment()}
          disabledDate={disabledDate}
        />
      </div>
      <div style={{ marginTop: "10px" }}>
        <ChartContainer chartData={overallAmount} barChartData={chartData}/>
      </div>
    </div>
  );
}

export default HomeView;

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];