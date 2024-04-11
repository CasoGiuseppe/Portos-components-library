import { type Names, Types } from '@/components/base/base-icon/types';

export interface IDropdownOption {
	label: string
	icon: {
	  name: Names
	  type: Types
	}
}

export interface IBaseDropdownComponent {
	placeholder?: string
	label?: string
}