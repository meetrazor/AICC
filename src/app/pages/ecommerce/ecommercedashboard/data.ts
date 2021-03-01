import { ChartType } from './dashboard.model';
const widgetData = [
    {
        icon: 'dripicons-wallet',
        value: 58947,
        title: 'Total Revenue',
        color: 'primary'
    },
    {
        icon: 'dripicons-basket',
        value: 1845,
        title: 'Orders',
        color: 'success'
    },
    {
        icon: 'dripicons-store',
        value: 58947,
        title: 'Stores',
        color: 'info'
    },
    {
        icon: 'dripicons-user-group',
        value: 2430,
        title: 'Total Revenue',
        color: 'warning'
    },
];

/*-------------------Transaction table --------------------- */

const transactionData = [
    {
        image: 'assets/images/users/user-2.jpg',
        name: 'Imelda J. Stanberry',
        card: 'assets/images/cards/visa.png',
        cardNumber: '**** 3256',
        date: '27.03.2018',
        amount: '$345.98',
        status: 'Failed',
    },
    {
        image: 'assets/images/users/user-3.jpg',
        name: 'Francisca S. Lobb',
        card: 'assets/images/cards/master.png',
        cardNumber: '**** 8451',
        date: '28.03.2018',
        amount: '$1,250',
        status: 'Paid',
    },
    {
        image: 'assets/images/users/user-1.jpg',
        name: 'James A. Wert',
        card: 'assets/images/cards/amazon.png',
        cardNumber: '**** 2258',
        date: '28.03.2018',
        amount: '$145',
        status: 'Paid',
    },
    {
        image: 'assets/images/users/user-4.jpg',
        name: 'Dolores J. Pooley',
        card: 'assets/images/cards/american-express.png',
        cardNumber: '**** 6950',
        date: '29.03.2018',
        amount: '$2,005.89',
        status: 'Failed',
    },
    {
        image: 'assets/images/users/user-5.jpg',
        name: 'Karen I. McCluskey',
        card: 'assets/images/cards/discover.png',
        cardNumber: '**** 0021',
        date: '31.03.2018',
        amount: '$24.95',
        status: 'Paid',
    }
];


/*------------------------Product table ---------------------*/

const productData = [
    {
        image: 'assets/images/products/product-1.jpg',
        name: 'Adirondack Chair',
        category: 'Dining Chairs',
        date: '27.03.2018',
        amount: '$345.98',
        status: 'Active'
    },
    {
        image: 'assets/images/products/product-2.jpg',
        name: 'Biblio Plastic Armchair',
        category: 'Baby Chairs',
        date: '28.03.2018',
        amount: '$1,250',
        status: 'Active'
    },
    {
        image: 'assets/images/products/product-3.jpg',
        name: 'Adirondack Chair',
        category: 'Plastic Armchair',
        date: '28.03.2018',
        amount: '$145',
        status: 'Deactive'
    },
    {
        image: 'assets/images/products/product-4.jpg',
        name: 'Adirondack Chair',
        category: 'Wing Chairs',
        date: '29.03.2018',
        amount: '$2,005.89',
        status: 'Active'
    },
    {
        image: 'assets/images/products/product-5.jpg',
        name: 'Adirondack Chair',
        category: 'Plastic Armchair',
        date: '31.03.2018',
        amount: '$24.95',
        status: 'Active'
    }
];

const revenueAreaChart: ChartType = {
    chart: {
        height: 350,
        type: 'line',
        toolbar: {
            show: false
        }
    },
    stroke: {
        curve: 'smooth'
    },
    series: [{
        name: 'Desktops',
        type: 'area',
        data: [100, 75, 50, 75, 50, 75, 100, 100, 75, 50, 75, 50]
    }, {
        name: 'Tablets',
        type: 'area',
        data: [90, 65, 40, 65, 40, 65, 90, 90, 65, 40, 65, 40]
    }, {
        name: 'Mobiles',
        type: 'area',
        data: [40, 20, 50, 95, 22, 56, 60, 40, 20, 50, 95, 22]
    }],
    colors: ['#ebeff2', '#f1556c', '#4a81d4'],
    fill: {
        type: 'solid',
        opacity: 0.2,
    },
    markers: {
        size: 0
    },
    legend: {
        show: false
    },
    xaxis: {
        categories: ['2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'],
        axisBorder: {
            show: false
        },
        axisTicks: {
            show: false
        }
    }
};
export { widgetData, transactionData, productData, revenueAreaChart };
