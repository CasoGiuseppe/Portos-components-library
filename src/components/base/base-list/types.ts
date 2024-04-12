import { type Names, Types } from '@/components/base/base-icon/types';

export interface IListOption {
    label: string
    icon?: {
        name: Names
        type: Types
    },
    option?: any
}

export interface IBaseListComponent {
    options: IListOption[]
}