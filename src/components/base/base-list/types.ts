import { type Names, Types } from '@/components/base/base-icon/types';

export interface IListOption {
    label: string
    icon: {
        name: Names
        type: Types
    }
}

export interface IBaseListComponent {
    options: IListOption[]
}