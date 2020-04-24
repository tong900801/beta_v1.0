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
                ['color_scheme'],
                ['x_axis_format'],
            ],
        },
        {
            label: t('Y Axis 1 (Bar)'),
            expanded: true,
            controlSetRows: [
                ['metric', 'y_axis_format'],
            ],
        },
        {
            label: t('Y Axis 2 (Line)'),
            expanded: true,
            controlSetRows: [
                ['metric_2', 'y_axis_2_format'],
            ],
        },
        annotations,
    ],
    controlOverrides: {
        metric: {
            label: t('Left(Bar) Axis Metric'),
            description: t('Choose a metric for left(Bar) axis'),
        },
        y_axis_format: {
            label: t('Left(Bar) Axis Format'),
        },
        metric_2: {
            label: t('Right(Line) Axis Metric'),
            description: t('Choose a metric for right(Line) axis'),
        },
        y_axis_2_format: {
            label: t('Right(Line) Axis Format'),
        },
        x_axis_format: {
            choices: D3_TIME_FORMAT_OPTIONS,
            default: 'smart_date',
        },
        row_limit: {
            default: 50000,
        },
    },
};