
import { type ISelected } from '@/components/base/base-list/types';

export interface IBaseDropdownComponent {
	placeholder?: string
	selectedOption?: ISelected
	isDisabled?: boolean
	error?: string
}