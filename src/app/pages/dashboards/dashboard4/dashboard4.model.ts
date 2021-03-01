// Widget data
export interface Widget {
    image: string;
    name: string;
    designation: string;
}

// project table data
export interface Project {
    name: string;
    startdate: string;
    duedate: string;
    team: string[];
    status: string;
    client: string;
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
    toolbar?: any;
    type?: any;
    height?: any;
    dataLabels?: any;
    sparkline?: any;
}
