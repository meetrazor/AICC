import { ChartType } from './widgets.model';
const widget = [
    {
        icon: 'fe-heart',
        color: 'primary',
        number: 58947,
        title: 'Total Revenue'
    },
    {
        icon: 'fe-shopping-cart',
        color: 'success',
        number: 127,
        title: 'Today\'s Sales'
    },
    {
        icon: 'fe-bar-chart-line',
        color: 'info',
        number: 0.58,
        title: 'Conversion'
    },
    {
        icon: 'fe-eye',
        color: 'warning',
        number: 78412,
        title: 'Today\'s Visits'
    },
    {
        icon: 'fe-shopping-bag',
        color: 'danger',
        number: 178,
        title: 'Available Stores'
    },
    {
        icon: 'fe-gitlab',
        color: 'dark',
        number: 289,
        title: 'Gitlab Commits'
    },
    {
        icon: 'fe-gift',
        color: 'blue',
        number: 1021,
        title: 'Free Gifts'
    },
    {
        icon: 'fe-users',
        color: 'pink',
        number: 154,
        title: 'Paid Users'
    },
];

const widgetTooltip = [
    {
        title: 'Income Status',
        value: 31570,
        text: 'Total income: $22506 ',
        revenue: '10.25%'
    },
    {
        title: 'Sales Status',
        value: 683,
        text: 'Total sales: 2398 ',
        revenue: '7.85%'
    },
    {
        title: 'Recent Users',
        value: 3.2,
        text: 'Total users: 121 M',
        revenue: '3.64%'
    },
    {
        title: 'Total Revenue',
        value: 68541,
        text: 'Total revenue: $1.2 M',
        revenue: '17.48%'
    }
];

const widgetProgress = [
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
        color: 'primary',
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


const widgetuser = [
    {
        image: 'assets/images/users/user-3.jpg',
        name: 'Thelma Fridley',
        type: 'Admin User',
    },
    {
        image: 'assets/images/users/user-4.jpg',
        name: 'Chandler Hervieux',
        type: 'Manager',
    },
    {
        image: 'assets/images/users/user-5.jpg',
        name: 'Percy Demers',
        type: 'Product Manager',
    },
    {
        image: 'assets/images/users/user-6.jpg',
        name: 'Antoine Masson',
        type: 'Premium User',
    }
];

const widgetInline = [
    {
        icon: 'mdi mdi-cart-plus',
        color: 'primary',
        title: 'Lifetime Sales',
        number: 8954,
    },
    {
        icon: 'mdi mdi-currency-usd',
        color: 'success',
        title: 'Income Amounts',
        number: 7841
    },
    {
        icon: 'mdi mdi-account-group',
        color: 'danger',
        title: 'Total Users',
        number: 6521
    },
    {
        icon: 'mdi mdi-eye-outline',
        color: 'blue',
        title: 'Total Visits',
        number: 325
    }
];

const lifetimeAreaChart: ChartType = {
    toolbar: {
        show: false,
    },
    series: [{
        data: [0, 23, 43, 35, 44, 45, 56, 37, 40],
    }, {
        data: [25, 23, 26, 24, 25, 32, 30, 24, 19]
    }],
    colors: ['#00acc1', '#f1556c'],
    height: 200,
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
                formatter: (seriesName) => {
                    return '';
                }
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

const amountsBarChart: ChartType = {
    toolbar: {
        show: false,
    },
    height: 200,
    type: 'bar',
    stacked: true,
    color: ['rgb(59, 175, 218)', 'rgb(227, 234, 239)'],
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
        show: false
    },
    tooltip: {
        x: {
            show: false
        }
    },
    stroke: {
        show: true,
        width: 4,   // thickness of the lines
    },
    series: [{
        data: [70, 90, 100, 140, 50, 80, 130, 90, 80, 120, 120, 140],
    },
    {
        data: [40, 50, 150, 80, 90, 120, 80, 70, 50, 130, 100, 110],
    }],
    plotOptions: {
        bar: {
            columnWidth: '60%'
        }
    },
};

const revenuePieChart: ChartType = {
    type: 'pie',
    series: [20, 40, 30, 10],
    option: {
        pie: {
            expandOnClick: false
        }
    },
    height: 210,
    piechartcolor: ['#00acc1', '#4b88e4', '#e3eaef', '#fd7e14'],
    dataLabels: {
        enabled: false
    },
    legend: {
        show: false,
    },
    tooltip: {
        x: {
            labels: false,
            show: false
        },
        y: {
            title: {
                formatter: (seriesName) => {
                    return '';
                }
            }
        },
    },
    grid: {
        show: false,
        padding: {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
        }
    },
};

/* -------------------------------- INBOX ---------------------------- */
const inboxData = [
    {
        image: 'assets/images/users/user-1.jpg',
        name: 'Chadengle',
        message: 'Hey! there I\'m available...'
    },
    {
        image: 'assets/images/users/user-2.jpg',
        name: 'Tomaslau',
        message: 'I\'ve finished it! See you so...'
    },
    {
        image: 'assets/images/users/user-3.jpg',
        name: 'Stillnotdavid',
        message: 'This theme is awesome!'
    },
    {
        image: 'assets/images/users/user-4.jpg',
        name: 'Kurafire',
        message: 'Nice to meet you'
    },
    {
        image: 'assets/images/users/user-5.jpg',
        name: 'Shahedk',
        message: 'Hey! there I\'m available...'
    },
    {
        image: 'assets/images/users/user-6.jpg',
        name: 'Adhamdannaway',
        message: 'This theme is awesome!'
    },
    {
        image: 'assets/images/users/user-8.jpg',
        name: 'Arashasghari',
        message: 'Hey! there I\'m available...'
    },
    {
        image: 'assets/images/users/user-9.jpg',
        name: 'Joshaustin',
        message: 'I\'ve finished it! See you so...'
    }
];


/* -------------------- chat ----------------------*/
const chatData = [
    {
        image: 'assets/images/users/user-5.jpg',
        name: 'John Deo',
        message: 'Hello!',
        time: '10:00'
    },
    {
        image: 'assets/images/users/user-1.jpg',
        name: 'Geneva',
        message: 'Hi, How are you? What about our next meeting?',
        time: '10:01'
    },
    {
        image: 'assets/images/users/user-5.jpg',
        name: 'John Deo',
        message: 'Yeah everything is fine',
        time: '10:01'
    },
    {
        image: 'assets/images/users/user-1.jpg',
        name: 'Geneva',
        message: 'Wow that\'s great',
        time: '10:02'
    }
];

/* -------------------- Todo ----------------------*/

const todoData = [
    {
        id: 1,
        text: 'Design One page theme',
        done: false
    },
    {
        id: 2,
        text: 'Build a js based app',
        done: true
    },
    {
        id: 3,
        text: 'Creating component page',
        done: true
    },
    {
        id: 4,
        text: 'Testing??',
        done: true
    },
    {
        id: 5,
        text: 'Hehe!! This is looks cool!',
        done: false
    },
    {
        id: 6,
        text: 'Create new version 3.0',
        done: false
    },
    {
        id: 7,
        text: 'Build an angular app',
        done: true
    },
    {
        id: 8,
        text: 'It\'s Awesome theme !',
        done: false
    }
];

/*------------------------------Chart ---------------------------*/
const incomeBarChart = {
    type: 'bar',
    tooltip: {
        enabled: false
    },
    sparkline: {
        enabled: true,
    },
    dataLabels: {
        enabled: false
    },
    colors: ['#f7b84b', 'rgb(227, 234, 239)'],
    height: 36,
    plotOptions: {
        bar: {
            columnWidth: '80%',
            distributed: true
        }
    },
    series: [
        {
            name: 'Weekly Earning',
            data: [5, 3, 9, 6, 5, 9, 7, 3, 5, 2, 9, 7, 2, 1, 3, 5, 2, 9, 7, 2, 5, 3, 9, 6, 5, 9, 7]
        }
    ]
};

const recentuserAreaChart = {
    type: 'area',
    height: 36,
    fill: true,
    series: [{
        name: 'users',
        data: [3, 5, 2, 9, 7, 2, 5, 3, 9, 6, 5, 9, 7]
    }],
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'straight',
        width: 1,
    },
    sparkline: {
        enabled: true,
    },
    tooltip: {
        x: {
            show: false
        }
    },
    toolbar: {
        show: false
    },
    colors: ['#00b19d'],
};

const salesStatusChart = {
    type: 'line',
    height: 36,
    series: [{
        name: 'sales',
        data: [5, 3, 9, 6, 5, 9, 7, 3, 5, 2]
    }],
    colors: ['#4a81d4'],
    dataLabels: {
        enabled: false
    },
    tooltip: {
        fixed: {
            enabled: false
        },
        x: {
            show: false
        },
    },
    stroke: {
        width: 1
    },
    toolbar: {
        show: false
    },
    sparkline: {
        enabled: true
    },
};

const revenueRadialChart = {
    chart: {
        height: 200,
        type: 'radialBar',
    },
    series: [60],
    colors: ['rgb(241, 85, 108)'],
    plotOptions: {
        radialBar: {
            hollow: {
                size: '65%',
            },
            dataLabels: {
                name: {
                    show: false
                },
                value: {
                    fontSize: '24px',
                    color: 'rgb(241, 85, 108)',
                    offsetY: 10,
                    formatter: (val) => {
                        return val + '';
                    }
                }
            }
        }
    },
    stroke: {
        lineCap: 'round',
    }
};


const salesRadialChart = {
    chart: {
        height: 200,
        type: 'radialBar',
    },
    colors: ['#6658dd'],
    plotOptions: {
        radialBar: {
            hollow: {
                size: '65%',
            },
            dataLabels: {
                name: {
                    show: false
                },
                value: {
                    fontSize: '24px',
                    color: '#6658dd',
                    offsetY: 10,
                    formatter: (val) => {
                        return val + '';
                    }
                }
            }
        }
    },
    stroke: {
        lineCap: 'round',
    },
    series: [37],
};

const usersRadialChart = {
    chart: {
        height: 200,
        type: 'radialBar',
    },
    colors: ['#1abc9c'],
    plotOptions: {
        radialBar: {
            hollow: {
                size: '65%',
            },
            dataLabels: {
                name: {
                    show: false
                },
                value: {
                    fontSize: '24px',
                    color: '#1abc9c',
                    offsetY: 10,
                    formatter: (val) => {
                        return val + '';
                    }
                }
            }
        }
    },
    series: [81],
};

export {
    // tslint:disable-next-line: max-line-length
    widget, widgetuser, widgetProgress, widgetTooltip, widgetInline, lifetimeAreaChart, amountsBarChart, revenuePieChart, chatData, todoData, inboxData,
    salesStatusChart, recentuserAreaChart, incomeBarChart, revenueRadialChart, salesRadialChart, usersRadialChart
};

