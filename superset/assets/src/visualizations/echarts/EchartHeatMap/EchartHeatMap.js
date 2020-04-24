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


function EchartHeatMap(element, props) {
    const {
        width,
        height,
        data,
        sliceId,
        groupby,
        metric,
        extents,
    } = props;
    console.log(data) //可以检查一下data内容

    function unique(arr) {
        var hash = [];
        for (var i = 0; i < arr.length; i++) {
            if (hash.indexOf(arr[i]) == -1) {
                hash.push(arr[i]);
            }
        }
        return hash;
    }

    const x = data.map(d => d.x)
    const y = data.map(d => d.y)
    const ux = unique(data.map(d => d.x)).sort()
    const uy = unique(data.map(d => d.y))
    const v = data.map(d => d.v)

    var result = []
    let z = 0
    for (let i = 0; i < ux.length; i++) {
        for (let j = 0; j < uy.length; j++) {
            result.push([i, j, data[z].v])
            z = z + 1
        }

    }

    console.log(z)
    const div = d3.select(element, props);
    //每个chart id都是变量
    echarts.registerTheme('essos', EchartTheme)
    var sliceID = 'echartpiechart_slice_' + sliceId;
    var html = '<div id=' + sliceID + ' style="height:' + height + 'px; width:' + width + 'px;"></div>';
    div.html(html); //给echarts添加div

    var myChart = echarts.init(document.getElementById(sliceID), 'essos'); //初始化echarts，接下来的就是echarts内容了

    var option = {
        tooltip: {
            position: 'top'
        },
        animation: false,
        grid: {
            height: '50%',
            top: '10%',
            left: '10%',
            right: '5%',
            containLabel: false
        },

        xAxis: {
            type: 'category',
            data: ux,
            splitArea: {
                show: true
            }
        },
        yAxis: {
            type: 'category',
            data: uy,
            splitArea: {
                show: true
            },
            // axisLabel: {
            //     rotate: 50,
            // }
        },
        visualMap: {
            min: extents[0],
            max: extents[1],
            calculable: true,
            orient: 'horizontal',
            left: 'center',
            bottom: '15%'
        },
        series: [{
            name: metric.label,
            type: 'heatmap',
            data: result,
            label: {
                show: true
            },
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]

    };
    myChart.setOption(option);
}

EchartHeatMap.displayName = 'Echart Heat Map';
EchartHeatMap.propTypes = propTypes;

export default EchartHeatMap;

