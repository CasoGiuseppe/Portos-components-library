export interface ButtonsList {
  buttonsList: ButtonsListElement[]
}

export interface ButtonsListElement {
  id: number
  alt: boolean
  values: Value[]
}

interface Value {
  id: number
  type: string
  size: string
  disabled: boolean
}
