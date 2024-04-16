import { type Component } from 'vue';

export type UniqueId = string

type IComponent = {
    type: Component,
    props: Record<string, any>
}

export type IList = {
    id: string,
    label: string,
    option: string,
    component?: IComponent
}

export enum Mode {
    DEFAULT = 'default',
    DROPDOWN = 'dropdown',
}