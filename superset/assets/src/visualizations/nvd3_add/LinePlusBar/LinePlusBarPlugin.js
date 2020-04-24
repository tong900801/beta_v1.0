import { t } from '@superset-ui/translation';
import { ChartMetadata, ChartPlugin } from '@superset-ui/chart';
import transformProps from './transformProps';
import thumbnail from './images/thumbnail.png';


const metadata = new ChartMetadata({
  name: t('Line Plus Bar'),
  description: '',
  credits: ['http://nvd3.org/examples/linePlusBar.html'],
  thumbnail,
});

export default class LinePlusBarPlugin extends ChartPlugin {
  constructor() {
    super({
      metadata,
      transformProps,
      loadChart: () => import('./LinePlusBar.js'),
    });
  }
}

