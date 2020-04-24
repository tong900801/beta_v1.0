// ChineseMap.js
import echarts from 'echarts';
import d3 from 'd3';
import PropTypes from 'prop-types';
import React from 'react';
//import china.js and geoJson
import 'echarts/map/js/china';
import geoJson from 'echarts/map/json/china.json';
import EchartTheme from '../echarts/EchartTheme';

const propTypes = {
    data: PropTypes.array,
    width: PropTypes.number,
    height: PropTypes.number,
}; //检查类型，其中data包含viz.py中返回的数据，width和height为图表宽高

function ChineseMap(element, props) {
    const {
        width,
        height,
        data,
        metric,
        sliceId
    } = props;
    //console.log(data) //可以检查一下data内容
    const data_value = data.map(d => d.value)
    const max_datavalue = Math.max(...data_value)

    const div = d3.select(element, props);
    var sliceID = 'chinesemap_slice_' + sliceId;
    var html = '<div id=' + sliceID + ' style="height:' + height + 'px; width:' + width + 'px;"></div>';
    echarts.registerTheme('essos', EchartTheme)
    div.html(html); //给echarts添加div

    var myChart = echarts.init(document.getElementById(sliceID), 'essos'); //初始化echarts，接下来的就是echarts内容了

    var option = {

        tooltip: {
            triggerOn: "click",
            formatter: function (e, t, n) {
                return .5 == e.value ? e.name + "：有疑似病例" : e.seriesName + "<br />" + e.name + "：" + e.value
            }
        },
        visualMap: {
            min: 0,
            max: max_datavalue,
            left: 20,
            bottom: 20,
            showLabel: !0,
            text: ["高", "低"],
            inRange: {
                // color: ['#3B5077', '#031525'] // 蓝黑
                // color: ['#ffc0cb', '#800080'] // 红紫
                // color: ['#3C3B3F', '#605C3C'] // 黑绿
                // color: ['#0f0c29', '#302b63', '#24243e'] // 黑紫黑
                // color: ['#23074d', '#cc5333'] // 紫红
                color: ['#ffd768', '#ff5428'] // 蓝绿
                // color: ['#1488CC', '#2B32B2'] // 浅蓝
                // color: ['#00467F', '#A5CC82'] // 蓝绿
                // color: ['#00467F', '#A5CC82'] // 蓝绿
                // color: ['#00467F', '#A5CC82'] // 蓝绿
                // color: ['#00467F', '#A5CC82'] // 蓝绿

            },
            show: !0
        },
        grid: {
            left: '5%',
            right: '5%',
            bottom: 120,
            containLabel: false
        },
        geo: {
            map: "china",
            roam: !1,
            scaleLimit: {
                min: 1,
                max: 2
            },
            zoom: 1.23,
            top: 50,
            label: {
                normal: {
                    show: !0,
                    fontSize: "14",
                    color: "rgba(0,0,0,0.7)"
                }
            },
            itemStyle: {
                normal: {
                    //shadowBlur: 50,
                    //shadowColor: 'rgba(0, 0, 0, 0.2)',
                    borderColor: "rgba(0, 0, 0, 0.2)"
                },
                emphasis: {
                    areaColor: "#f2d5ad",
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    borderWidth: 0
                }
            }
        },
        series: [{
            name: metric.label,
            type: "map",
            geoIndex: 0,
            data: data
        }]



    };

    myChart.setOption(option);
}

ChineseMap.displayName = 'Chinese Map';
ChineseMap.propTypes = propTypes;

export default ChineseMap;

