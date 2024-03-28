import { Types, type Names } from '@/components/base/base-icon/types';

export interface INavigationItem {
    label: string
    type: Types
    icon: Names
    children?: INavigationItem[]
    customClass?: string
    action?: <T>(...args: (T | undefined)[]) => any
}