import { ChartType } from './dashboard2.model';

const widget = [
    {
        icon: 'fe-aperture',
        value: '12145',
        text: 'Income status',
        color: 'blue',
        progressValue: 60
    },
    {
        icon: 'fe-shopping-cart',
        value: '1576',
        text: 'January\'s Sales',
        color: 'success',
        progressValue: 49
    },
    {
        icon: 'fe-bar-chart-2',
        value: '8947',
        text: 'Payouts',
        color: 'warning',
        progressValue: 18
    },
    {
        icon: 'fe-cpu',
        value: '178',
        text: 'Available Stores',
        color: 'info',
        progressValue: 74
    }
];

const lifetimeSalesAreaChart: ChartType = {
    toolbar: {
        show: false,
    },
    series: [{
        name: 'Desktop',
        data: [0, 23, 43, 35, 44, 45, 56, 37, 40],
    }, {
        name: 'Laptop',
        data: [25, 23, 26, 24, 25, 32, 30, 24, 19]
    }],
    colors: ['#00acc1', '#f1556c'],
    height: 250,
    type: 'area',
    stroke: {
        curve: 'straight',
        width: 1,
    },
    dataLabels: {
        enabled: false
    },
    sparkline: {
        enabled: true
    },
    grid: {
        show: false,
        padding: {
            top: 40,
            left: 0,
            right: 0,
            bottom: 0
        }
    },
    legend: {
        show: false,
    },
    tooltip: {
        x: {
            show: false
        },
        y: {
            title: {
                text: undefined,
            }
        },
        marker: {
            show: false
        }
    },
    xaxis: {
        labels: {
            show: false
        },
        axisBorder: {
            show: false
        },
        lines: {
            show: false,
        }
    }
};

const incomeAmountsLineChart: ChartType = {
    toolbar: {
        show: false,
    },
    height: 250,
    type: 'bar',
    colors: ['#00acc1'],
    dataLabels: {
        enabled: false
    },
    sparkline: {
        enabled: true,
    },
    grid: {
        show: false,
        padding: {
            top: 40,
            left: 0,
            right: 0,
            bottom: 0
        }
    },
    legend: {
        show: false,
    },
    tooltip: {
        x: {
            show: false
        }
    },
    stroke: {
        show: true,
        width: 1,   // thickness of the lines
    },
    series: [{
        name: 'Revenue',
        data: [70, 90, 100, 140, 50, 80, 130, 90, 80, 120, 130, 140, 90, 100, 75],
    }],
    plotOptions: {
        bar: {
            columnWidth: '50%'
        }
    },
};

const totalUsersPieChart: ChartType = {
    type: 'pie',
    series: [20, 40, 30, 10],
    option: {
        pie: {
            expandOnClick: false
        }
    },
    height: 250,
    piechartcolor: ['#00acc1', '#4b88e4', '#e3eaef', '#fd7e14'],
    dataLabels: {
        enabled: false
    },
    legend: {
        show: false,
    },
    tooltip: {
        x: {
            show: false
        }
    },
    grid: {
        show: false,
        padding: {
            top: 30,
            left: 0,
            right: 0,
            bottom: 0
        }
    },
};

const productData = [
    {
        name: 'ASOS Ridley High Waist',
        price: '$79.49',
        quantity: 82,
        amount: '$6,518.18',
        date: 'Sep 1, 2018',
        sales: 54,
        productid: 200125
    },
    {
        name: 'Marco Lightweight Shirt',
        price: '$128.50',
        quantity: 37,
        amount: '$4,754.50',
        date: 'Sep 15, 2018',
        sales: 28,
        productid: 200130
    },
    {
        name: 'Half Sleeve Shirt',
        price: '$39.99',
        quantity: 64,
        amount: '$2,559.36',
        date: 'Nov 1, 2018',
        sales: 55,
        productid: 200140
    },
    {
        name: 'Lightweight Jacket',
        price: '$20.00',
        quantity: 184,
        amount: '$3,680.00',
        date: 'Nov 15, 2018',
        sales: 85,
        productid: 200250
    },
    {
        name: 'Marco Shoes',
        price: '$28.49',
        quantity: 69,
        amount: '$1,965.81',
        date: 'Jan 1, 2019',
        sales: 49,
        productid: 200256
    },
    {
        name: 'ASOS Ridley High Waist',
        price: '$79.49',
        quantity: 82,
        amount: '$6,518.18',
        date: 'Sep 1, 2018',
        sales: 54,
        productid: 200125
    },
    {
        name: 'Half Sleeve Shirt',
        price: '$39.99',
        quantity: 64,
        amount: '$2,559.36',
        date: 'Nov 1, 2018',
        sales: 55,
        productid: 200140
    },
    {
        name: 'Lightweight Jacket',
        price: '$20.00',
        quantity: 184,
        amount: '$3,680.00',
        date: 'Nov 15, 2018',
        sales: 85,
        productid: 200250
    }
];


export { widget, lifetimeSalesAreaChart, incomeAmountsLineChart, totalUsersPieChart, productData };

