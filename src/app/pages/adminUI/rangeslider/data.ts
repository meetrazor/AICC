const sliderData = [
    {
        title: 'Default',
        default: 34,
        option: {
            floor: 10,
            ceil: 100
        }
    },
    {
        title: 'Min-Max',
        minValue: 100,
        default: 100,
        maxValue: 500,
        option: {
            floor: 100,
            ceil: 1000
        }
    },
    {
        title: 'Slider with custom step value',
        default: 12,
        option: {
            floor: 10,
            ceil: 100,
            step: 5
        }
    },
    {
        title: 'Slider with floating point values',
        default: 0.5,
        option: {
            floor: 0,
            ceil: 2,
            step: 0.1
        }
    },
    {
        title: 'Slider with custom display function',
        default: 100,
        minVal: 100,
        maxVal: 400,
        option: {
            floor: 0,
            ceil: 500,
            translate: (value: number): string => {
                return '$' + value;
            }
        }
    },
    {
        title: 'Slider with ticks',
        default: 5,
        option: {
            floor: 0,
            ceil: 10,
            showTicks: true
        }
    },
    {
        title: 'Slider with ticks and values',
        default: 5,
        option: {
            floor: 0,
            ceil: 10,
            step: 1,
            showTicks: true,
            showTicksValues: true
        }
    },
    {
        title: 'Disabled',
        default: 40,
        minvalue: 10,
        maxvalue: 90,
        option: {
            floor: 0,
            ceil: 100,
            step: 10,
            disabled: true,
            showTicks: true,
            draggableRange: true
        }
    },
    {
        title: 'Slider with draggable range',
        default: 3,
        minvalued: 1,
        maxvalued: 8,
        option: {
            floor: 0,
            ceil: 10,
            draggableRange: true
        }
    },
    {
        title: 'Use decorate_both option',
        default: 4,
        option: {
            showTicksValues: true,
            stepsArray: [
                { value: 1, legend: 'jan' },
                { value: 2, legend: 'feb' },
                { value: 3, legend: 'mar' },
                { value: 4, legend: 'apr' },
                { value: 5, legend: 'may' },
                { value: 6, legend: 'jun' },
                { value: 7, legend: 'jul' },
                { value: 8, legend: 'aug' },
                { value: 9, legend: 'sep' },
                { value: 10, legend: 'oct' },
                { value: 11, legend: 'nov' },
                { value: 12, legend: 'dec' }
            ]
        }
    },
    {
        title: 'Slider with custom scale',
        default: 50,
        option: {
            floor: 0,
            ceil: 100,
            step: 10,
            showTicksValues: true,
            customValueToPosition: (val: number, minVal: number, maxVal: number): number => {
                val = Math.sqrt(val);
                minVal = Math.sqrt(minVal);
                maxVal = Math.sqrt(maxVal);
                const range: number = maxVal - minVal;
                return (val - minVal) / range;
            },
            customPositionToValue: (percent: number, minVal: number, maxVal: number): number => {
                minVal = Math.sqrt(minVal);
                maxVal = Math.sqrt(maxVal);
                const value: number = percent * (maxVal - minVal) + minVal;
                return Math.pow(value, 2);
            }
        }
    },
    {
        title: 'Slider with logarithmic scale',
        default: 1,
        option: {
            floor: 1,
            ceil: 100,
            logScale: true,
            showTicks: true
        }
    }
];

export { sliderData };

