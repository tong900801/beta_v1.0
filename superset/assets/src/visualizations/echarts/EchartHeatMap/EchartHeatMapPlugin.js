// MixLineBarChartPlugin.js
import { t } from '@superset-ui/translation';
import { ChartMetadata, ChartPlugin } from '@superset-ui/chart';
import transformProps from './transformProps';
import thumbnail from './images/thumbnail.png';


const metadata = new ChartMetadata({
  name: t('Echart Heat Map'),
  description: '',
  credits: ['https://echarts.apache.org/examples/zh/editor.html?c=heatmap-cartesian'],
  thumbnail,
});

export default class EchartHeatMapPlugin extends ChartPlugin {
  constructor() {
    super({
      metadata,
      transformProps,
      loadChart: () => import('./ReactEchartHeatMap.js'),
    });
  }
}

