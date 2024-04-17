export interface INavigationItemContextualComponent {
  id: string
  selected: boolean
  elementType: Element,
  to: RouterTo
}

export enum Element {
  ANCHOR = 'a',
  BUTTON = 'button',
  ROUTERLINK = 'router-link'
}

export type RouterTo = {
  path?: string,
  name?: string,
  query?: { [key: string]: string }
}
