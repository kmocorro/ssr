import React from 'react'
import BarChart from 'react-chartjs'

export default (props) => {
    let trend = props.binning.metaDashboard.meta;

    let binning_labels = [];
    let binning_data = [];

    if(trend.dashboard.eff_and_bin_trend){
        for(let i=0;i<trend.dashboard.eff_and_bin_trend.length;i++){
            binning_labels.push(trend.dashboard.eff_and_bin_trend[i].label);
            binning_data.push(trend.dashboard.eff_and_bin_trend[i].ne3);
        }
    }

    const dataset = {
        labels: binning_labels,
        datasets: [
            {
                label: "Bin Ne3 Dataset",
                fillColor: "rgba(0, 0, 0, 0.1)",
                strokeColor: "rgba(0, 0, 0, 0.3)",
                pointColor: "rgba(255, 206, 86, 1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(255, 206, 86, 1)",
                borderWidth: 1,
                data: binning_data
            }
        ]
    }

    const options = {
        responsive: true, 
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks:{
                    beginAtZero: true
                },
                labelString: '(Day)'
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
                        Bin Ne3 Trend
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
                            <BarChart.Bar data={dataset} options={options} width="500" height="150" />
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
                        Comments
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
                            There's no comment on Bin Ne3 yet
                        </p>
                    </ul>
                </div>
            </div>
        </div>
    )

}