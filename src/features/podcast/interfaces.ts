export interface Podcast {
    id: number;
    name: string;
    image: string;
    sound: string;
}

export interface Topic {
    id: number;
    name: string;
    watched: boolean;
    podcasts: Podcast[];
}
