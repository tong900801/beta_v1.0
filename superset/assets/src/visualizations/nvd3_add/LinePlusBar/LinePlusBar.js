/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import React from 'react';
import PropTypes from 'prop-types';
import Mustache from 'mustache';
import { scaleLinear } from 'd3-scale';
import { Table, Thead, Th, Tr, Td } from 'reactable-arc';
import { formatNumber } from '@superset-ui/number-format';
import { formatTime } from '@superset-ui/time-format';
import moment from 'moment';
import d3 from 'd3';
import nv from 'nvd3'
import FormattedNumber from './FormattedNumber';
import './linePlusBarData.json'
import './LinePlusBar.less'
//import SparklineCell from './SparklineCell';
/*
const propTypes = {
    data: PropTypes.array,
    width: PropTypes.number,
    height: PropTypes.number,
}; //检查类型，其中data包含viz.py中返回的数据，width和height为图表宽高

function LinePlusBar(element, props) {

    const {
        width,
        height,
        data,
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
    var html = '<div id="chart" style="height:' + height + 'px; width:' + width + 'px;"><svg></svg></div>';
    div.html(html);
    d3.json("http://nvd3.org/examples/linePlusBarData.json", function (error, data) {
        nv.addGraph(function () {
            var chart = nv.models.linePlusBarChart()
                .margin({ top: 30, right: 60, bottom: 50, left: 70 })
                //We can set x data accessor to use index. Reason? So the bars all appear evenly spaced.
                .x(function (d, i) { return i })
                .y(function (d, i) { return d[1] })
                ;

            chart.xAxis.tickFormat(function (d) {
                var dx = data[0].values[d] && data[0].values[d][0] || 0;
                return d3.time.format('%x')(new Date(dx))
            });

            chart.y1Axis
                .tickFormat(d3.format(',f'));

            chart.y2Axis
                .tickFormat(function (d) { return '$' + d3.format(',f')(d) });

            chart.bars.forceY([0]);

            d3.select('#chart svg')
                .datum(data)
                .transition()
                .duration(0)
                .call(chart);

            nv.utils.windowResize(chart.update);

            return chart;
        });

    })
};

LinePlusBar.propTypes = propTypes;
export default LinePlusBar;*/


const propTypes = {
    data: PropTypes.array,
    width: PropTypes.number,
    height: PropTypes.number,
};

class LinePlusBar extends React.Component {

    render() {
        d3.json("http://nvd3.org/examples/linePlusBarData.json", function (error, data) {
            nv.addGraph(function () {
                var chart = nv.models.linePlusBarChart()
                    .margin({ top: 30, right: 60, bottom: 50, left: 70 })
                    //We can set x data accessor to use index. Reason? So the bars all appear evenly spaced.
                    .x(function (d, i) { return i })
                    .y(function (d) { return d[1] })
                    ;

                chart.xAxis.tickFormat(function (d) {
                    var dx = data[0].values[d] && data[0].values[d][0] || 0;
                    return d3.time.format('%x')(new Date(dx))
                });

                chart.y1Axis
                    .tickFormat(d3.format(',f'));

                chart.y2Axis
                    .tickFormat(function (d) { return '$' + d3.format(',f')(d) });

                chart.bars.forceY([0]);

                d3.select('#lineplusbar svg')
                    .datum(data)
                    .transition()
                    .duration(500)
                    .call(chart);

                nv.utils.windowResize(chart.update);

                return chart;
            });

        })
        return (
            <div className="lineplusbar" id="lineplusbar">
                <svg height="100%" width="100%"></svg>
            </div>
        );
    }
}

LinePlusBar.propTypes = propTypes;
export default LinePlusBar;

