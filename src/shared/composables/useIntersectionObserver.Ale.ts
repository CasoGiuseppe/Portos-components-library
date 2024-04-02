import type {
    IUseIntersectionObserver,
    IIntersectionObserver,
    ICreateObserver,
} from './interfaces/useIntersectionObserver';

export default function useIntersectionObserver({
    action,
    options = { threshold: 0 },
}: IUseIntersectionObserver): IIntersectionObserver {
    const createObserver = ({
        element,
        collection,
    }: ICreateObserver): IntersectionObserver => {
        const observer = new IntersectionObserver(
            entries => entries.forEach(action ?? console.log),
            options
        );

        if (element) {
            observer.observe(element);
        }

        if (collection) {
            for (const node of collection) {
                observer.observe(node);
            }
        }
  
        return observer;
    }

    return {
        createObserver
    }
}