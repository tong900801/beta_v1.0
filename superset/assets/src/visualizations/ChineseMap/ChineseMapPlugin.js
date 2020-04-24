// TimeSeriesScatterChartPlugin.js
import { t } from '@superset-ui/translation';
import { ChartMetadata, ChartPlugin } from '@superset-ui/chart';
import transformProps from './transformProps';
import thumbnail from './images/thumbnail.png';


const metadata = new ChartMetadata({
  name: t('Chinese Map'),
  description: '',
  credits: ['https://gallery.echartsjs.com/editor.html?c=x1-bQDu00'],
  thumbnail,
});

export default class ChineseMapPlugin extends ChartPlugin {
  constructor() {
    super({
      metadata,
      transformProps,
      loadChart: () => import('./ReactChineseMap.js'),
    });
  }
}

