import { type Names, type Types } from '@/components/base/base-icon/types';

export interface INavigationItem {
    label: string
    icon: Names
    type: Types
    link: string
    children?: INavigationItem[]
}

export interface INavigationItemComponent {
    id: number
    label: string
    selected: boolean
    inversed: boolean
    children?: INavigationItem[]
    collapsed: boolean
};