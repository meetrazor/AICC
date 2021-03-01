import { ChartType } from './chartjs.model';
const lineAreaChart: ChartType = {

    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
        label: 'Current Week',
        backgroundColor: 'rgba(59, 175, 218, 0.3)',
        borderColor: '#3bafda',
        data: [32, 42, 42, 62, 52, 75, 62]
    }, {
        label: 'Previous Week',
        fill: true,
        backgroundColor: 'transparent',
        borderColor: '#f672a7',
        borderDash: [5, 5],
        data: [42, 58, 66, 93, 82, 105, 92]
    }],
    options: {
        maintainAspectRatio: false,
        legend: {
            display: false
        },
        tooltips: {
            intersect: false
        },
        hover: {
            intersect: true
        },
        plugins: {
            filler: {
                propagate: false
            }
        },
        scales: {
            xAxes: [{
                reverse: true,
                gridLines: {
                    color: 'rgba(0,0,0,0.05)'
                }
            }],
            yAxes: [{
                ticks: {
                    stepSize: 20
                },
                display: true,
                borderDash: [5, 5],
                gridLines: {
                    color: 'rgba(0,0,0,0)',
                    fontColor: '#fff'
                }
            }]
        }
    }
};

const lineBarChart: ChartType = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
        {
            label: 'Sales Analytics',
            backgroundColor: '#1abc9c',
            borderColor: '#1abc9c',
            hoverBackgroundColor: '#1abc9c',
            hoverBorderColor: '#1abc9c',
            data: [65, 59, 80, 81, 56, 89, 40, 32, 65, 59, 80, 81]
        },
        {
            label: 'Dollar Rate',
            backgroundColor: '#e3eaef',
            borderColor: '#e3eaef',
            hoverBackgroundColor: '#e3eaef',
            hoverBorderColor: '#e3eaef',
            data: [89, 40, 32, 65, 59, 80, 81, 56, 89, 40, 65, 59]
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
                }
            }]
        }
    }
};

const pieChart: ChartType = {
    labels: [
        'Direct',
        'Affilliate',
        'Sponsored',
        'E-mail'
    ],
    datasets: [
        {
            data: [300, 135, 48, 154],
            backgroundColor: [
                '#3bafda',
                '#f7b84b',
                '#1abc9c',
                '#ebeff2'
            ],
            borderColor: 'transparent',
        }
    ],
    options: {
        maintainAspectRatio: false,
        legend: {
            display: false
        }
    }
};

const donutChart: ChartType = {
    labels: [
        'Direct',
        'Affilliate',
        'Sponsored'
    ],
    datasets: [
        {
            data: [128, 78, 48],
            backgroundColor: [
                '#3bafda',
                '#1abc9c',
                '#ebeff2'
            ],
            borderColor: 'transparent',
            borderWidth: '3',
        }],
    options: {
        maintainAspectRatio: false,
        cutoutPercentage: 60,
        legend: {
            display: false
        }
    }
};

const radarChart: ChartType = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
        {
            label: 'Desktops',
            backgroundColor: 'rgba(59, 175, 218,0.2)',
            borderColor: '#3bafda',
            pointBackgroundColor: '#3bafda',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#3bafda',
            data: [65, 59, 90, 81, 56, 55, 40, 23, 44, 65, 34, 12]
        },
        {
            label: 'Tablets',
            backgroundColor: 'rgba(246, 114, 167,0.2)',
            borderColor: '#f672a7',
            pointBackgroundColor: '#f672a7',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#f672a7',
            data: [28, 48, 40, 19, 96, 27, 100]
        }
    ],
    options: {
        maintainAspectRatio: false,
        legend: {
            position: 'top'
        }
    }
};

const reportChart: ChartType = {
    labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
    datasets: [
        {
            data: [65, 59, 80, 81, 56, 55, 40],
            borderColor: '#f672a7'
        },
        {
            data: [28, 48, 40, 19, 86, 27, 90],
            backgroundColor: 'rgba(59, 175, 218, 0.3)',
            borderColor: '#3bafda'
        }
    ],
    options: {
        responsive: true,
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
                }
            }]
        },
        legend: {
            display: false
        }
    }
};

export { lineAreaChart, lineBarChart, pieChart, donutChart, radarChart, reportChart };
