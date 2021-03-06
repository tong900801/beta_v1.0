
import { t } from '@superset-ui/translation';
import { annotations } from './sections';
import { D3_TIME_FORMAT_OPTIONS } from '../controls';

export default {
    requiresTime: true,
    controlPanelSections: [
        {
            label: t('Chart Options'),
            expanded: true,
            controlSetRows: [
                ['color_scheme', 'label_colors'],
                ['x_axis_format'],
            ],
        },
        {
            label: t('X Axis'),
            expanded: true,
            controlSetRows: [
                ['groupby'],
            ],
        },
        {
            label: t('Y Axis 1'),
            expanded: true,
            controlSetRows: [
                ['metric'],
            ],
        },
        {
            label: t('Y Axis 2'),
            expanded: true,
            controlSetRows: [
                ['metric_2'],
            ],
        },
        {
            label: t('Query'),
            expanded: true,
            controlSetRows: [
                ['adhoc_filters'],
            ],
        },

    ],
    controlOverrides: {
        metric: {
            label: t('Left Axis Metric'),
            description: t('Choose a metric for Y axis'),
        },
        y_axis_format: {
            label: t('Y Axis Format'),
        },
        x_axis_format: {
            choices: D3_TIME_FORMAT_OPTIONS,
            default: 'smart_date',
        },
    },
};