// TimeSeriesScatter.js
import echarts from 'echarts';
import d3 from 'd3';
import PropTypes from 'prop-types';
import EchartTheme from '../echarts/EchartTheme';

const propTypes = {
    data: PropTypes.array,
    width: PropTypes.number,
    height: PropTypes.number,
}; //检查类型，其中data包含viz.py中返回的数据，width和height为图表宽高

function TimeSeriesScatter(element, props) {
    const {
        width,
        height,
        data,
        sliceId,
        metrics,
        metrics2
    } = props;
    // console.log(data) 可以检查一下data内容

    const m1 = metrics.values.map(d => d.y)
    const m2 = metrics2.values.map(d => d.y)

    const m = m1.map((key, value) => [key, m2[value]])

    const max_m1 = Math.max(...m1)
    const max_m2 = Math.max(...m2)
    const min_m1 = Math.max(...m1)
    const min_m2 = Math.max(...m2)


    const div = d3.select(element, props);
    var sliceID = 'timeseriesscatter_slice_' + sliceId;
    var html = '<div id=' + sliceID + ' style="height:' + height + 'px; width:' + width + 'px;"></div>';
    div.html(html); //给echarts添加div
    echarts.registerTheme('essos', EchartTheme)
    var myChart = echarts.init(document.getElementById(sliceID), 'essos'); //初始化echarts，接下来的就是echarts内容了

    var option = {
        xAxis: {
            name: metrics.key,
            scale: true,
            axisLabel: {
                formatter: function (value) {
                    if (value <= 1 && value > 0) {
                        return (value * 100) + '%';
                    } else if (value >= 1000) {
                        return (value / 1000) + 'K';
                    } else {
                        return value;
                    }
                },
                textStyle: {
                    color: 'black',
                    fontStyle: 'normal',
                    fontFamily: '微软雅黑',
                    fontSize: 12,
                },
                rotate: 50,
            }
        },
        yAxis: {
            name: metrics2.key,
            scale: true,
            axisLabel: {
                formatter: function (value) {
                    if (value <= 1 && value > 0) {
                        return (value * 100) + '%';
                    } else if (value >= 1000) {
                        return (value / 1000) + 'K';
                    } else {
                        return value;
                    }
                },
                textStyle: {
                    color: 'black',
                    fontStyle: 'normal',
                    fontFamily: '微软雅黑',
                    fontSize: 12,
                },
                rotate: 50,
            }
        },
        series: [{
            type: 'effectScatter',
            symbolSize: 20,
            data: [m[0]],
        }, {
            type: 'scatter',
            data: m,
            itemStyle: {
                normal: {
                    show: true,
                    //color: '#FFCC00',
                    borderWidth: 0,
                }
            },
        }]
    };

    myChart.setOption(option);
}

TimeSeriesScatter.displayName = 'Time Series Scatter';
TimeSeriesScatter.propTypes = propTypes;

export default TimeSeriesScatter;

