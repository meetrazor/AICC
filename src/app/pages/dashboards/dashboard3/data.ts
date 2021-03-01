import { ChartType } from './dashboar3.model';

const widget = [
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

const revenueAreaChart: ChartType = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
        label: 'Current Week',
        backgroundColor: 'rgba(26, 128, 156, 0.3)',
        borderColor: '#1abc9c',
        data: [32, 42, 42, 62, 52, 75, 62]
    }, {
        label: 'Previous Week',
        fill: true,
        backgroundColor: 'transparent',
        borderColor: '#f1556c',
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

const projectionBarChart: ChartType = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
        {
            label: 'Sales Analytics',
            backgroundColor: '#4a81d4',
            borderColor: '#4a81d4',
            hoverBackgroundColor: '#4a81d4',
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
    }
];

export { widget, revenueAreaChart, projectionBarChart, inboxData, chatData, todoData };
