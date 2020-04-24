// transformProps.js
export default function transformProps(chartProps) {
  const { width, height, payload, queryData, formData } = chartProps;
  console.log(chartProps); //可以用来验证数据是否正确
  return {
    data: queryData.data,
    width,
    height,
    sliceId: formData.sliceId,
    metrics: queryData.data[0],
    metrics2: queryData.data[1]
  };
}


