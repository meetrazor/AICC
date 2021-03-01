export interface Widget {
    title: string;
    value: number;
    text: string;
    revenue: string;
}

export interface Inbox {
    image: string;
    name: string;
    message: string;
}

export interface Chat {
    image: string;
    name: string;
    message: string;
    time: string;
}

export interface Todo {
    id: number;
    text: string;
    done: boolean;
}

// Chart data
export interface ChartType {
    chart?: any;
    plotOptions?: any;
    colors?: any;
    series?: any;
    stroke?: any;
    fill?: any;
    labels?: any;
    markers?: any;
    legend?: any;
    xaxis?: any;
    yaxis?: any;
    tooltip?: any;
    grid?: any;
    datasets?: any;
    options?: any;
}
