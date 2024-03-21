import type { Names, Types } from '@/components/base/base-icon/types'

interface IListPosition {
  type?: Types
  name?: Names
}
interface IListIcon {
  left?: IListPosition
  right?: IListPosition
}

export interface IListComponent {
  id: number
  label: string
  secondLabel?: string
  icon?: IListIcon
  selected?: boolean
  disabled?: boolean
}
