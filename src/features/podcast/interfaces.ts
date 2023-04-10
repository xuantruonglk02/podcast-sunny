export interface Podcast {
    id: number;
    name: string;
    image: string;
    sound: string;
    title: string;
}

export interface Topic {
    id: number;
    name: string;
    watched: boolean;
    podcasts: Podcast[];
}
