
import { type IListOption } from '@/components/base/base-list/types';

export interface IBaseDropdownComponent {
	placeholder?: string
	selectedOption?: IListOption
	isDisabled?: boolean
	error?: string
}