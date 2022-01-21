import React from 'react'
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { validArray } from '../../_helpers/utilityFunctions';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
class PieChartView extends React.Component {
    
    render() {

        return (
            <>
                <div className="main-chart" style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    <PieChart width={180} height={200} onMouseEnter={this.onPieEnter}>
                        <Pie
                            data={this.props.pieChartData}
                            cx={80}
                            cy={100}
                            innerRadius={50}
                            outerRadius={80}
                            fill="#8884d8"
                            paddingAngle={0}
                            dataKey="value"
                        >
                            {validArray(this.props.pieChartData) && this.props.pieChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip/>
                    </PieChart>
                    <div>
                    {validArray(this.props.pieChartData) && this.props.pieChartData.map((entry, index) => <>
                        <span class="dot" style={{ height: "10px", width: '10px', backgroundColor: COLORS[index % COLORS.length], borderRadius: "50%", display: 'inline-block' }}> </span>
                        <span className="legend-lable">{" " + this.props.pieChartData[index].name} - {this.props.pieChartData[index].value}</span>
                        <br /></>)}
                    </div>
                </div>
            </>
        )
    }
}

export default PieChartView
