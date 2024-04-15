import { type Component } from 'vue';

export type UniqueId = string

export interface ISelectedOption {
    label: string
    option: string
}

export type IIcon = {
    type: Component,
    props: Record<string, any>;
}
export type IList = {
    id: string,
    label: string,
    option: string,
    icon?: IIcon
}

export enum Mode {
    DEFAULT = 'default',
    DROPDOWN = 'dropdown',
}