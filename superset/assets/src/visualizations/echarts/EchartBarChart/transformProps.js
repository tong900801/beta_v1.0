// transformProps.js
export default function transformProps(chartProps) {
  const { width, height, payload, queryData, groupby, formData } = chartProps;
  //const { metric, metric2, } = queryData.data.chart_data
  //console.log(chartProps); //可以用来验证数据是否正确

  return {
    data: queryData.data,
    width,
    height,
    metric: queryData.data[0],
    metric2: queryData.data[1],
    sliceId: formData.sliceId,
  };

}

