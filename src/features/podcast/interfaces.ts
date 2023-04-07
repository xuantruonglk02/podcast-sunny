export interface Podcast {
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
