// Dashboard widget data
export interface Widget {
    icon: string;
    value: number;
    title: string;
    color: string;
}

// Dashboard transaction history table
export interface Transaction {
    image: string;
    name: string;
    card: string;
    cardNumber: string;
    date: string;
    amount: string;
    status: string;
}

// dashboard Recent products table
export interface Products {
    image: string;
    name: string;
    category: string;
    date: string;
    amount: string;
    status: string;
}

// Chart data
export interface ChartType {
    chart?: any;
    series?: any;
    colors?: any;
    fill?: any;
    markers?: any;
    stroke?: any;
    legend?: any;
    xaxis?: any;
}
