/// <reference types="vite/client" />
type Reaction = {
    _id: string;
    reactionBody: string;
    userName: string;
    reactions?: Reaction[]; // Optional, since not all reactions might have nested reactions
};

type Thought = {
    _id: string;
    thoughtText: string;
    userName: string;
    createdAt: Date;
    reactions: Reaction[];
    __v: number;
};

type User = {
    _id: string;
    userName: string;
    email: string;
    friends: string[]; // An array of friend IDs
    password: string
};