import React from 'react'
import LineChart from 'react-chartjs'

export default (props) => {
    let trend = props.cycletime.metaDashboard.meta;

    let cycletime_labels = [];
    let cycletime_data = [];

    if(trend.dashboard.cycletime_trend){
        for(let i=0;i<trend.dashboard.cycletime_trend.length;i++){
            cycletime_labels.push(trend.dashboard.cycletime_trend[i].label);
            cycletime_data.push(trend.dashboard.cycletime_trend[i].data);
        }
    }

    const dataset = {
        labels: cycletime_labels,
        datasets: [
            {
                label: "Cycletime Dataset",
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: cycletime_data
            }
        ]
    }

    const options = {
        bezierCurve: false,
        responsive: true, 
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks:{
                    callback: function(value, index, values){
                        return value + ' day' 
                    }
                },
                labelString: '(day)'
            }]
        }
    }

    return (
        <div style={{
            marginBottom: "0px",
            gridTemplateColumns: "1fr 1fr",
            display: "grid",
            gap: "40px 40px",
        }}>
            <div style={{

            }}>
                <div>
                    <h4 style={{
                        marginTop: "0px",
                        fontWeight: "500",
                        textTransform: "capitalize",
                        paddingBottom: "6px",
                        letterSpacing: "0.5px",
                        borderBottom: "1px solid rgb(208, 210, 211)",
                        fontSize: "14px",
                        color: "rgb(33, 33, 33)",
                        lineHeight: "1.3",
                        margin: "1em 0px",
                    }}>
                        Cycletime Trend
                    </h4>
                    <ul style={{
                        marginBottom: "0px",
                        marginTop: "20px",
                        listStyle: "none"
                    }}>
                        <p style={{
                            lineHeight: "1.6",
                            color: "rgb(33, 33, 33)",
                            fontSize: "14px",
                            fontWeight: "400",
                            margin: "1em 0px",
                            display: "block",
                            marginBlockStart: "1em",
                            marginBlockEnd: "1em",
                            marginInlineStart: "0px",
                            marginInlineEnd: "0px"
                        }}>
                            
                        <div style={{width: "100%"}}>
                            <LineChart.Line data={dataset} options={options} width="500" height="250" />
                        </div>

                        </p>
                    </ul>
                </div>
            </div>

            <div style={{

            }}>
                <div>
                    <h4 style={{
                        marginTop: "0px",
                        fontWeight: "500",
                        textTransform: "capitalize",
                        paddingBottom: "6px",
                        letterSpacing: "0.5px",
                        borderBottom: "1px solid rgb(208, 210, 211)",
                        fontSize: "14px",
                        color: "rgb(33, 33, 33)",
                        lineHeight: "1.3",
                        margin: "1em 0px",
                    }}>
                        What's happening?
                    </h4>
                    <ul style={{
                        marginBottom: "0px",
                        marginTop: "20px",
                        listStyle: "none"
                    }}>
                        <p style={{
                            lineHeight: "1.6",
                            color: "rgb(33, 33, 33)",
                            fontSize: "14px",
                            fontWeight: "400",
                            margin: "1em 0px",
                            display: "block",
                            marginBlockStart: "1em",
                            marginBlockEnd: "1em",
                            marginInlineStart: "0px",
                            marginInlineEnd: "0px"
                        }}>
                            There's no comment on cycletime yet
                        </p>
                    </ul>
                </div>
            </div>
        </div>
    )

}