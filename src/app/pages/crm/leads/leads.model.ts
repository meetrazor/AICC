export interface Leads {
    company: string;
    name: string;
    location: string;
    category: string;
    date: string;
}

// Chart data
export interface ChartType {
    series?: any;
    stroke?: any;
    type?: any;
    height?: any;
    dataLabels?: any;
    legend?: any;
    color?: any;
    toolbar?: any;
    stacked?: any;
    xaxis?: any;
    plotOptions?: any;
    grid?: any;
    tooltip?: any;
}
