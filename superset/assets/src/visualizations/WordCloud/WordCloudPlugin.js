// MixLineBarChartPlugin.js
import { t } from '@superset-ui/translation';
import { ChartMetadata, ChartPlugin } from '@superset-ui/chart';
import transformProps from './transformProps';
import thumbnail from './images/thumbnail.png';


const metadata = new ChartMetadata({
  name: t('Echart Word Cloud'),
  description: '',
  credits: ['https://gallery.echartsjs.com/editor.html?c=xMOEsMUSLk'],
  thumbnail,
});

export default class WordCloudChartPlugin extends ChartPlugin {
  constructor() {
    super({
      metadata,
      transformProps,
      loadChart: () => import('./ReactWordCloud.js'),
    });
  }
}

