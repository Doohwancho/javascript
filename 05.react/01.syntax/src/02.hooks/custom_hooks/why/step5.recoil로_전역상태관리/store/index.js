import { atom } from 'recoil';

export const todoListState = atom({
    key: "todoListStore",
    default: []
});

export const todoListInputState = atom({
    key: "todoListInputState",
    default: ""
});