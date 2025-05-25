import { Wiki } from "./wiki.dto";

export interface Topic {
    id: number;
    title: string;
    description: string;
    wikis: Wiki[];
}

export interface CreateTopicDTO {
    title: string;
    description: string;
}