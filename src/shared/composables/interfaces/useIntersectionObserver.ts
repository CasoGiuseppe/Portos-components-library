export interface IUseIntersectionObserver {
    action?: (entry: IntersectionObserverEntry) => void
    options?: IntersectionObserverInit
}

export interface ICreateObserver {
    element?: HTMLElement
    collection?: HTMLCollection
}

export interface IIntersectionObserver {
    createObserver: ({ element, collection }: ICreateObserver) => IntersectionObserver
}