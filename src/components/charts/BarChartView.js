import React, { PureComponent } from 'react';
import { BarChart, 
    ResponsiveContainer,
    Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList } from 'recharts';

const renderCustomizedLabel = (props) => {
    const { x, y, width, height, value } = props;
    const radius = 10;

    return (
      <g>
        {/* <circle cx={x + width / 2} cy={y - radius} r={radius} fill="#8884d8" /> */}
        <text x={x + width / 2} y={y - radius} fill="#000" textAnchor="middle" dominantBaseline="middle">
          {value ? value : ''}
        </text>
      </g>
    );
  };

class BarChartView extends React.Component {
    render() {

        return (
            <>
                <div className="main-chart" style={{ minHeight: '200px', marginLeft:"-30px" }}>
                    <ResponsiveContainer width="75%" height={180}> 
                    <BarChart
                        width={280}
                        height={180}
                        data={this.props.barChartData}
                        margin={{
                            top: 25,
                            right: 0,
                            left: 0,
                            bottom: -5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="categoryName" angle={-20} interval={0} minTickGap={-200} dy={15} dx={-5}/>
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar   dataKey="totalBudget" fill="#8884d8" isAnimationActive={false}>
                            {/* <LabelList dataKey="uv"  /> */}
                        </Bar>
                        <Bar name={this.props.name }  dataKey="totalExpense" fill="#0000ff" isAnimationActive={false}>
                            {/* <LabelList dataKey="pv"  /> */}
                        </Bar>
                    </BarChart>
                    </ResponsiveContainer>
                </div>
            </>
        )
    }
}

export default BarChartView
