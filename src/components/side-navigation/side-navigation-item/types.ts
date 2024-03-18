import { type Names } from '@/components/base/base-icon/types';

export interface ISideNavigationItem {
    label: string
    icon: Names
    link: string
    inverse: boolean
    children?: ISideNavigationItem[]
    expanded: boolean
}

export interface ISideNavigationItemComponent {
    inverse?: boolean
    children?: ISideNavigationItem[]
    expanded?: boolean
};