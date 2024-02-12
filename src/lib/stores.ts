import { writable } from "svelte/store";

//-----type definition-----
export const comment_types = {
    PR: 'paper_reading',
    BR: 'book_review',
    RP: 'research_presentation'
} as const;

export type CommentType = typeof comment_types[keyof typeof comment_types];

export type User = {
    username: string;
};

export type PR = {
    _id?: any,
    date: string,
    title: string,
    url: string,
    body: string,
    type: 'paper_reading',
    user?: string,
    createdAt?: Date,
    updatedAt?: Date,
    __v?: number,
}

export type BR = {
    _id?: any,
    date: string,
    title: string,
    book_url: string,
    info: string,
    review_url: string,
    body: string,
    type: 'book_review',
    user?: string,
    createdAt?: Date,
    updatedAt?: Date,
    __v?: number,
}

export type RP = {
    _id?: any
    date: string,
    title: string,
    body: string,
    type: 'research_presentation',
    user?: string
    createdAt?: Date,
    updatedAt?: Date,
    __v?: number,
}

export type Comment = PR | BR | RP;

export type AdminData = {
    date: Date,
    paper_reading: PR | undefined,
    book_review: BR | undefined,
    research_presentation: RP | undefined,
};

//-----Stores-----
export const isAuth = writable<User|null>();

export const Error = writable<any>();

export const comments = writable<Comment[]>([]);

export const adminComments = writable<AdminData[]>([]);