import React from 'react'
import PieChartView from './PieChartView'
import BarChartView from './BarChartView';
import { Row, Col } from 'antd';
// import { validArray } from '../../_helpers/utilityFunctions';


const ChartContainer = ({ chartData }) => {
    console.log(chartData)

    return (
        <>
            <div className="charts-row">
                <Row gutter={[12, 12]} >

                    <Col span={12} md={12} lg={12} xl={12}>
                        <div className="chart-title">
                            <h4>Heading</h4>
                        </div>
                        <div className="chart-container">
                            <PieChartView pieChartData={pieChartData} />
                        </div>
                    </Col>
                    <Col span={12} md={12} lg={12} xl={12}>
                        <div className="chart-title">
                            <h4>Heading</h4>
                        </div>
                        <div className="chart-container">
                            <BarChartView barChartData={chartData} heading="Count" name="Heading" />
                        </div>
                    </Col>

                </Row>
            </div>
        </>
    )
}

export default ChartContainer

const pieChartData = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
];
