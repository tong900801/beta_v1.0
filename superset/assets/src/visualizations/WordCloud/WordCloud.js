// TimeSeriesScatter.js
import echarts from 'echarts';
import d3 from 'd3';
import PropTypes from 'prop-types';
import 'echarts-wordcloud';
import EchartTheme from '../echarts/EchartTheme';

const propTypes = {
    data: PropTypes.array,
    width: PropTypes.number,
    height: PropTypes.number,
}; //检查类型，其中data包含viz.py中返回的数据，width和height为图表宽高

function WordCloud(element, props) {
    const {
        width,
        height,
        data,
        sliceId
    } = props;
    console.log(data) //可以检查一下data内容


    const div = d3.select(element, props);
    var sliceID = 'echartwordcloud_slice_' + sliceId;
    var html = '<div id=' + sliceID + ' style="height:' + height + 'px; width:' + width + 'px;"></div>';
    echarts.registerTheme('essos', EchartTheme)
    div.html(html); //给echarts添加div

    var myChart = echarts.init(document.getElementById(sliceID), 'essos'); //初始化echarts，接下来的就是echarts内容了
    var option = {

        tooltip: {
            show: true
        },
        grid: {
            left: '5%',
            right: '5%',
            bottom: '5%',
        },
        series: [{
            type: "wordCloud",
            gridSize: 6,
            shape: 'diamond',
            sizeRange: [12, 50],
            width: 800,
            height: 500,
            textStyle: {
                normal: {
                    color: function () {
                        return 'rgb(' + [
                            Math.round(Math.random() * 160),
                            Math.round(Math.random() * 160),
                            Math.round(Math.random() * 160)
                        ].join(',') + ')';
                    }
                },
                emphasis: {
                    shadowBlur: 10,
                    shadowColor: '#333'
                }
            },
            data: data,
        }]
    };

    myChart.setOption(option);
}

WordCloud.displayName = 'Word Cloud';
WordCloud.propTypes = propTypes;

export default WordCloud;

