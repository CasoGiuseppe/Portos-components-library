export interface IUseIntersectionObserver {
    action?: (entry: any) => any,
    options: Record<string, any>
}

export interface ICreateObserver {
    element?: HTMLElement
    collection?: HTMLCollection
}

export interface IIntersectionObserver {
    createObserver: ({ element, options }: { element:  HTMLElement | Element, options?: Record<string, any> }) => void
}