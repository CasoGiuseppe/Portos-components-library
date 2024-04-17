import { type Component } from 'vue';

export type UniqueId = string

type IComponent = {
    type: Component,
    props: Record<string, any>
}

export interface IKeyHandler {
    ArrowDown: () => void,
    ArrowUp: () => void
}

export type IList = {
    id: string,
    label: string,
    option: string,
    component?: IComponent
}

export type ISelected = {
    label: string
    option: string
}

export enum Mode {
    DEFAULT = 'default',
    DROPDOWN = 'dropdown',
}