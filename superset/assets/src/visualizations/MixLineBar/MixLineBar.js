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


function MixLineBar(element, props) {
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
    echarts.registerTheme('essos', EchartTheme)
    var sliceID = 'mixlinebar_slice_' + sliceId;
    var html = '<div id=' + sliceID + ' style="height:' + height + 'px; width:' + width + 'px;"></div>';
    div.html(html); //给echarts添加div

    var myChart = echarts.init(document.getElementById(sliceID), 'essos'); //初始化echarts，接下来的就是echarts内容了
    var option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            },
            formatter: function (datas) {
                var res = datas[0].name + '<br/>', val;
                for (var i = 0, length = datas.length; i < length; i++) {
                    if (datas[i].value >= 1000) {
                        val = (datas[i].value / 1000).toFixed(0) + 'K';
                        res += datas[i].seriesName + '：' + val + '<br/>';
                    } else if (0 < datas[i].value && datas[i].value <= 1) {
                        val = (datas[i].value * 100).toFixed(1) + '%';
                        res += datas[i].seriesName + '：' + val + '<br/>';
                    } else {
                        val = datas[i].value;
                        res += datas[i].seriesName + '：' + val + '<br/>';
                    }

                }
                return res;
            }
        },
        //set the canvas size
        grid: {
            left: '5%',
            right: '5%',
            bottom: '5%',
            containLabel: true
        },
        // toolbox: {
        //     feature: {
        //         dataView: { show: true, readOnly: false },
        //         magicType: { show: true, type: ['line', 'bar'] },
        //         restore: { show: true },
        //         saveAsImage: { show: true }
        //     }
        // },
        legend: {
            data: [metric.key, metric2.key]

        },
        xAxis: [
            {
                type: 'category',
                data: x,
                axisPointer: {
                    type: 'shadow'
                },
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

            }
        ],
        yAxis: [
            {
                type: 'value',
                name: metric.key,
                data: y1,
                max: maxplus(max_y1),
                interval: maxplus(max_y1) / 10,
                axisLabel: {
                    formatter: function (value) {
                        if (value <= 1 && value > 0) {
                            return (value * 100) + '%';
                        } else if (value >= 1000) {
                            return (value / 1000) + 'K';
                        } else {
                            return value;
                        }
                    }
                }
            },
            {
                type: 'value',
                name: metric2.key,
                data: y2,
                max: maxplus(max_y2),
                interval: maxplus(max_y2) / 10,
                axisLabel: {
                    formatter: function (value) {
                        if (value <= 1 && value > 0) {
                            return (value * 100) + '%';
                        } else if (value >= 1000) {
                            return (value / 1000) + 'K';
                        } else {
                            return value;
                        }
                    }
                }
            }
        ],
        series: [
            {
                name: metric.key,
                type: 'bar',
                data: y1,
                barCategoryGap: 30,
                barWidth: 30,
                // barWidth: function (y1) {
                //     if (y1.length <= 10) {
                //         return (width / (y1.length * 30));
                //     } else {
                //         return (width / y1.length);
                //     }
                // },
                itemStyle: {
                    normal: {
                        show: true,
                        //color: '#FFCC00',
                        barBorderRadius: 0,
                        borderWidth: 0,
                    }
                },
                //label in canvas
                // label: {
                //     show: true,
                //     position: "top",
                //     formatter: function (params) {
                //         return y1[params.dataIndex]
                //     },
                //     fontSize: 10,
                //     fontWeight: 'bold',
                //     color: '#34DCFF'
                // },
            },
            {
                name: metric2.key,
                type: 'line',
                yAxisIndex: 1,
                data: y2,
                itemStyle: {
                    normal: {
                        show: true,
                        //color: '#66CCFF',
                        borderWidth: 0,
                    }
                },
            },
        ]
    };

    myChart.setOption(option);
}

MixLineBar.displayName = 'Mix Line Bar';
MixLineBar.propTypes = propTypes;

export default MixLineBar;

