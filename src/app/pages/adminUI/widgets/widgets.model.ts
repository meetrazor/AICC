//  Widgets data
export interface Widgets {
    icon: string;
    color: string;
    number: number;
    title: string;
}

// Widget inline data
export interface WidgetInline {
    icon: string;
    color: string;
    title: string;
    number: number;
}

// widget Tooltip data
export interface WidgetTooltip {
    title: string;
    value: number;
    text: string;
    revenue: string;
}

// Widget progressbar data
export interface WidgetProgress {
    icon: string;
    value: string;
    text: string;
    color: string;
    progressValue: number;
}

// Widget with user data
export interface WidgetUser {
    image: string;
    name: string;
    type: string;
}

// Inbox data
export interface Inbox {
    image: string;
    name: string;
    message: string;
}

// Chat data
export interface Chat {
    image: string;
    name: string;
    message: string;
    time: string;
}
// Todo data
export interface Todo {
    id: number;
    text: string;
    done: boolean;
}

// Chart data
export interface ChartType {
    data?: any;
    chart?: any;
    series?: any;
    stroke?: any;
    fill?: any;
    labels?: any;
    option?: any;
    type?: any;
    height?: any;
    piechartcolor?: any;
    dataLabels?: any;
    legend?: any;
    color?: any;
    colors?: any;
    toolbar?: any;
    sparkline?: any;
    stacked?: any;
    tooltip?: any;
    xaxis?: any;
    plotOptions?: any;
    grid?: any;
}
