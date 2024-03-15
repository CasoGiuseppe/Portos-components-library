import { type IIconComponent } from '@ui/base/base-icon/BaseIcon.vue'

interface IListIcon extends IIconComponent {
  position: 'left' | 'right'
}

export interface IListComponent {
  id: number
  label: string
  secondLabel?: string
  icon?: IListIcon
  selected?: boolean
}
