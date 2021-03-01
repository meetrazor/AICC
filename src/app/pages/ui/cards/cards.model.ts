export interface SimpleCard {
    title?: boolean;
    image: string;
    text: string;
    list ?: string[];
    link ?: string[];
    button ?: boolean;
}

export interface Card {
    title: string;
    text: string;
    align ?: string;
}

export interface CardColor {
    color: string;
}

export interface CardGroups {
    image: string;
    title: string;
    text: string;
    status: string;
}
