import { Options } from 'ng5-slider';

// Slider data
export interface Slider {
    title: string;
    minValue?: number;
    maxValue?: number;
    default?: number;
    option?: Options;
}
