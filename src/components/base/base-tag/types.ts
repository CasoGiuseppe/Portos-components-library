// types.ts
export enum Types {
  Default = 'default',
  Warning = 'warning',
  Damage = 'damage'
}

export interface Name {
  status: Types
  damage?: Number
}
