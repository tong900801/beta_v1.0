// TimeSeriesScatter.js
import echarts from 'echarts';
import d3 from 'd3';
import PropTypes from 'prop-types';
import EchartTheme from '../EchartTheme';

const propTypes = {
    data: PropTypes.array,
    width: PropTypes.number,
    height: PropTypes.number,
}; //检查类型，其中data包含viz.py中返回的数据，width和height为图表宽高


function EchartBarChart(element, props) {
    const {
        width,
        height,
        data,
        metric,
        metric2,
        sliceId
    } = props;
    //console.log(data) //可以检查一下data内容

    //bar
    const y1 = metric.values.map(d => d.y)
    const max_y1 = Math.max(...y1)

    //line
    const y2 = metric2.values.map(d => d.y)
    const max_y2 = Math.max(...y2)

    //x
    const x = metric.values.map(d => d.x)
    //坐标轴转换方程
    function maxplus(a) {
        if (a > 1) {
            var a_str = a.toString()
            var weishu = a.toString().length
            var first = parseInt(a_str[0]) + 1
            var first_str = first.toString()
            var result = parseInt(first_str + Array(weishu).join("0"))
            return result
        } else {
            return Math.ceil(a)
        }

    }

    const div = d3.select(element, props);
    //每个chart id都是变量

    var sliceID = 'echartbarchart_slice_' + sliceId;
    var html = '<div id=' + sliceID + ' style="height:' + height + 'px; width:' + width + 'px;"></div>';
    echarts.registerTheme('essos', EchartTheme)
    div.html(html); //给echarts添加div
    var myChart = echarts.init(document.getElementById(sliceID), 'essos'); //初始化echarts，接下来的就是echarts内容了

    var option = {
        tooltip: {
            trigger: 'axis'
        },

        legend: {
            data: [metric.key, metric2.key]
        },

        calculable: true,
        xAxis: [
            {
                type: 'category',
                data: x,
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: metric.key,
                type: 'bar',
                data: y1,
                markPoint: {
                    data: [
                        { type: 'max', name: '最大值' },
                        { type: 'min', name: '最小值' }
                    ]
                },
                markLine: {
                    data: [
                        { type: 'average', name: '平均值' }
                    ]
                }
            },
            {
                name: metric2.key,
                type: 'bar',
                data: y2,
                markPoint: {
                    data: [
                        { name: '年最高', value: 182.2, xAxis: 7, yAxis: 183 },
                        { name: '年最低', value: 2.3, xAxis: 11, yAxis: 3 }
                    ]
                },
                markLine: {
                    data: [
                        { type: 'average', name: '平均值' }
                    ]
                }
            }
        ]
    };
    myChart.setOption(option);
}

EchartBarChart.displayName = 'Echart Bar Chart';
EchartBarChart.propTypes = propTypes;

export default EchartBarChart;

