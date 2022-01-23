import React from 'react'
import PieChartView from './PieChartView'
import BarChartView from './BarChartView';
import { Row, Col } from 'antd';
// import { validArray } from '../../_helpers/utilityFunctions';


const ChartContainer = ({ chartData, barChartData }) => {
    console.log(chartData)

    return (
        <>
            <div className="charts-row">
                <Row gutter={[12, 12]} >

                    <Col span={12} md={12} lg={12} xl={12}>
                        <div className="chart-title">
                            <h4>Overall
                                spending against overall budget</h4>
                        </div>
                        <div className="chart-container">
                            <PieChartView pieChartData={chartData} />
                        </div>
                    </Col>
                    <Col span={12} md={12} lg={12} xl={12}>
                        <div className="chart-title">
                            <h4>Each category expense against the budget</h4>
                        </div>
                        <div className="chart-container">
                            <BarChartView barChartData={barChartData} heading="Count" name="Heading" />
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
