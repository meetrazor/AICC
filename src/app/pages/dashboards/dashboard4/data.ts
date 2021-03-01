import { ChartType } from './dashboard4.model';

const lifetimeDonutChart: ChartType = {
    type: 'donut',
    height: 270,
    series: [12, 30, 20],
    labels: ['Campaign', 'Total Sales', 'Daily Sales'],
    colors: ['#4fc6e1', '#6658dd', '#ebeff2'],
    dataLabels: {
        enabled: false
    },
    legend: {
        show: false
    }
};

const statisticsBarChart: ChartType = {
    labels: ['2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018'],
    datasets: [
        {
            label: 'Statistics',
            backgroundColor: '#02c0ce',
            borderColor: '#02c0ce',
            hoverBackgroundColor: '#02c0ce',
            hoverBorderColor: '#02c0ce',
            data: [81, 87, 75, 50, 75, 50, 38, 72]
        }
    ],
    options: {
        maintainAspectRatio: false,
        legend: {
            display: false
        },
        scales: {
            yAxes: [{
                gridLines: {
                    display: false
                },
                stacked: false,
                ticks: {
                    stepSize: 20
                }
            }],
            xAxes: [{
                barPercentage: 0.7,
                categoryPercentage: 0.5,
                stacked: false,
                gridLines: {
                    color: 'rgba(0,0,0,0.01)'
                },
            }]
        }
    }
};

const incomeAmountAreaChart: ChartType = {
    toolbar: {
        show: false,
    },
    labels: ['2012', '2013', '2014', '2015', '2016', '2017', '2018'],
    series: [{
        name: 'Bitcoin',
        data: [0, 23, 43, 35, 44, 45, 56],
    }, {
        name: 'Litecoin',
        data: [25, 23, 26, 24, 25, 32, 30]
    }],
    colors: ['#6658dd', '#4fc6e1'],
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
            show: true
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
        axisBorder: {
            show: false
        },
        lines: {
            show: false,
        }
    }
};

/*------------------------------- WIDGET ----------------- */

const widgetData = [
    {
        image: 'assets/images/users/user-3.jpg',
        name: 'Thelma Fridley',
        designation: 'Admin User'
    },
    {
        image: 'assets/images/users/user-4.jpg',
        name: 'Chandler Hervieux',
        designation: 'Manager'
    },
    {
        image: 'assets/images/users/user-5.jpg',
        name: 'Percy Demers',
        designation: 'Director'
    },
    {
        image: 'assets/images/users/user-6.jpg',
        name: 'Antoine Masson',
        designation: 'Premium User'
    }
];


/*----------------------------- PROJECTS TABLE--------------------  */

const projectData = [
    {
        name: 'App design and development',
        startdate: 'Jan 03, 2015',
        duedate: '	Oct 12, 2018',
        // tslint:disable-next-line: max-line-length
        team: ['assets/images/users/user-1.jpg', 'assets/images/users/user-2.jpg', 'assets/images/users/user-3.jpg', 'assets/images/users/user-5.jpg'],
        status: 'Work in Progress',
        client: 'Halette Boivin'
    },
    {
        name: 'Coffee detail page - Main Page',
        startdate: 'Sep 21, 2016',
        duedate: 'May 05, 2018',
        // tslint:disable-next-line: max-line-length
        team: ['assets/images/users/user-3.jpg', 'assets/images/users/user-4.jpg', 'assets/images/users/user-5.jpg'],
        status: 'Pending',
        client: 'Durandana Jolicoeur'
    },

    {
        name: 'Poster illustation design',
        startdate: 'Mar 08, 2018',
        duedate: 'Sep 22, 2018',
        // tslint:disable-next-line: max-line-length
        team: ['assets/images/users/user-2.jpg', 'assets/images/users/user-6.jpg', 'assets/images/users/user-7.jpg'],
        status: 'Completed',
        client: 'Lucas Sabourin'
    },
    {
        name: 'Drinking bottle graphics',
        startdate: 'Oct 10, 2017',
        duedate: 'May 07, 2018',
        // tslint:disable-next-line: max-line-length
        team: ['assets/images/users/user-9.jpg', 'assets/images/users/user-10.jpg', 'assets/images/users/user-1.jpg'],
        status: 'Work in Progress',
        client: 'Donatien Brunelle'
    },
    {
        name: 'Landing page design - Home',
        startdate: 'Coming Soon',
        duedate: 'May 25, 2021',
        // tslint:disable-next-line: max-line-length
        team: ['assets/images/users/user-5.jpg', 'assets/images/users/user-8.jpg', 'assets/images/users/user-2.jpg', 'assets/images/users/user-7.jpg'],
        status: 'Coming Soon',
        client: 'Karel Auberjo'
    },
];

export { incomeAmountAreaChart, statisticsBarChart, lifetimeDonutChart, widgetData, projectData };
