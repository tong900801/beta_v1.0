// MixLineBarChartPlugin.js
import { t } from '@superset-ui/translation';
import { ChartMetadata, ChartPlugin } from '@superset-ui/chart';
import transformProps from './transformProps';
import thumbnail from './images/thumbnail.png';


const metadata = new ChartMetadata({
  name: t('Echart Bar Chart'),
  description: '',
  credits: ['https://echarts.apache.org/examples/zh/editor.html?c=bar1'],
  thumbnail,
});

export default class EchartBarChartPlugin extends ChartPlugin {
  constructor() {
    super({
      metadata,
      transformProps,
      loadChart: () => import('./ReactEchartBarChart.js'),
    });
  }
}

