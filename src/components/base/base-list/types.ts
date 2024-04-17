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
    id: UniqueId,
    label: string,
    option: string,
    component?: IComponent
}

export enum Mode {
    DEFAULT = 'default',
    DROPDOWN = 'dropdown',
}