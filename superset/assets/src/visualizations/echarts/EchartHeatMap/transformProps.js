// transformProps.js
export default function transformProps(chartProps) {
  const { width, height, payload, queryData, groupby, formData } = chartProps;
  //const { metric, metric2, } = queryData.data.chart_data
  console.log(chartProps); //可以用来验证数据是否正确

  return {
    data: queryData.data.records,
    extents: queryData.data.extents,
    width,
    height,
    sliceId: formData.sliceId,
    groupby: formData.groupby,
    metric: formData.metric
  };

}

