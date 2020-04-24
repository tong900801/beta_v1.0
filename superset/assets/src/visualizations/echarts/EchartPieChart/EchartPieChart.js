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


function EchartPieChart(element, props) {
    const {
        width,
        height,
        data,
        sliceId,
        groupby
    } = props;
    console.log(data) //可以检查一下data内容



    const div = d3.select(element, props);
    //每个chart id都是变量
    echarts.registerTheme('essos', EchartTheme)
    var sliceID = 'echartpiechart_slice_' + sliceId;
    var html = '<div id=' + sliceID + ' style="height:' + height + 'px; width:' + width + 'px;"></div>';
    div.html(html); //给echarts添加div

    var myChart = echarts.init(document.getElementById(sliceID), 'essos'); //初始化echarts，接下来的就是echarts内容了
    var option = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: data.map(d => d.name)
        },
        series: [
            {
                name: groupby,
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: data,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    myChart.setOption(option);
}

EchartPieChart.displayName = 'Echart Pie Chart';
EchartPieChart.propTypes = propTypes;

export default EchartPieChart;

