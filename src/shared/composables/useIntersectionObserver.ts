import type { IIntersectionObserver } from './interfaces/useIntersectionObserver';

const config = {
    root: document.body,
    rootMargin: "0",
    threshold: 0,
};

export default function useIntersectionObserver({
    action,
}: { action?: (e:any) => any}): IIntersectionObserver {
    const createObserver = ({
        element,
        options
    }: { element:  HTMLElement | Element,  options?: Record<string, any> }): void => {
        const observer = new IntersectionObserver((entry) => {
            if(action) action(entry[0])
        }, {...config, ...options});

        observer.observe(element)
    }

    return {
        createObserver
    }
}