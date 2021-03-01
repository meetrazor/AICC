// tslint:disable-next-line: max-line-length
const text = 'Some quick example text to build on the card title and make up the bulk of the card\'s content. With supporting text below as a natural lead-in to additional content.';

const cardData = [
    {
        title: true,
        image: 'assets/images/small/img-1.jpg',
        text,
        button: true
    },
    {
        title: true,
        image: 'assets/images/small/img-2.jpg',
        text,
        list: ['Cras justo odio', 'Dapibus ac facilisis in'],
        link: ['Card link', 'Another link']
    },
    {
        image: 'assets/images/small/img-3.jpg',
        text,
        button: true
    }
];

const card = [
    {
        title: 'Special title treatment',
        text: 'With supporting text below as a natural lead-in to additional content.',
    },
    {
        title: 'Special title treatment',
        text: 'With supporting text below as a natural lead-in to additional content.',
        align: 'center'
    },
    {
        title: 'Special title treatment',
        text: 'With supporting text below as a natural lead-in to additional content.',
        align: 'right'
    }
];

const cardColor = [
    {
        color: 'primary'
    },
    {
        color: 'success'
    },
    {
        color: 'info'
    },
    {
        color: 'warning'
    },
    {
        color: 'danger'
    },
    {
        color: 'blue'
    },
    {
        color: 'pink'
    },
    {
        color: 'dark'
    }
];

const cardGroup = [
    {
        image: 'assets/images/small/img-1.jpg',
        title: 'Card title',
        // tslint:disable-next-line: max-line-length
        text: 'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
        status: 'Last updated 3 mins ago'
    },
    {
        image: 'assets/images/small/img-3.jpg',
        title: 'Card title',
        text: 'This is a wider card with supporting text below as a natural lead-in to additional content.',
        status: 'Last updated 3 mins ago'
    },
    {
        image: 'assets/images/small/img-2.jpg',
        title: 'Card title',
        // tslint:disable-next-line: max-line-length
        text: 'This is a wider card with supporting text below as a natural lead-in to additional content.This card has even longer content than the first to show that equal height action.',
        status: 'Last updated 3 mins ago'
    }
];

export { cardData, text, card, cardColor, cardGroup };

