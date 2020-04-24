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


function EchartLineChart(element, props) {
    const {
        width,
        height,
        data,
        sliceId,
        groupby,
        metrics,
    } = props;
    //console.log(data) //可以检查一下data内容
    const metrics_len = metrics.length
    //console.log(data[0][groupby], data[1][groupby], data[2][groupby], data[3][groupby])

    // var text = ""
    // var arr = []
    // for (let i = 0; i < data.length; i++) {
    //     //text += '"' + data[i][groupby] + '",';
    //     arr.push(data[i][groupby])
    // };
    // console.log(arr)

    function toarr(met) {
        var text = ""
        var arr = []
        var cate = met
        for (let i = 0; i < data.length; i++) {
            //text += '"' + data[i][groupby] + '",';
            arr.push(data[i][met])
        };
        return arr
    }

    //循环series
    var series = [];
    var m = [];
    for (var j = 0; j < metrics_len; j++) {
        m[j] = metrics[j].label
        series.push({
            name: m[j],
            type: 'line',
            data: toarr(m[j])
        });

    }

    const div = d3.select(element, props);
    //每个chart id都是变量
    echarts.registerTheme('essos', EchartTheme)
    var sliceID = 'echartpiechart_slice_' + sliceId;
    var html = '<div id=' + sliceID + ' style="height:' + height + 'px; width:' + width + 'px;"></div>';
    div.html(html); //给echarts添加div

    var myChart = echarts.init(document.getElementById(sliceID), 'essos'); //初始化echarts，接下来的就是echarts内容了
    var option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: metrics,
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: toarr(groupby),
        },
        yAxis: {
            type: 'value'
        },
        series: series,

    };
    myChart.setOption(option);
}

EchartLineChart.displayName = 'Echart Line Chart';
EchartLineChart.propTypes = propTypes;

export default EchartLineChart;

