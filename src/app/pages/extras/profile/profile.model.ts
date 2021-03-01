export interface Project {
    id: number;
    name: string;
    startdate: string;
    duedate: string;
    status: string;
    client: string;
}

// Inbox data
export interface Inbox {
    image: string;
    name: string;
    message: string;
}
