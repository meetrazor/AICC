export interface List {
    icon: string;
    name: string;
    value?: number;
    text?: string;
}

export interface Label {
    text: string;
    name: string;
}

export interface Email {
    text ?: string;
    title: string;
    subject: string;
    date: string;
    unread?: boolean;
}
