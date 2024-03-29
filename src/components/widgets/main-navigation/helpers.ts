export const handleChildrenWatcher = (
    children: HTMLCollection,
    switchChildrenPosition: (entry: IntersectionObserverEntry) => void
) => {
    const observer = new IntersectionObserver(
        entries => entries.forEach(switchChildrenPosition),
        { threshold: 0.1 }
    );

    for (const child of children) {
        observer.observe(child);
    }
}

export const loadNavigationItems = async (userRole: string) => {
    try {
        const { default: items } = await import(`./items/${userRole}`);
        return items;
    } catch (error) {
        console.error('Error loading items file:', error);
    }
};

export const switchChildrenPosition = (entry: IntersectionObserverEntry) => {
    const { target, intersectionRatio } = entry;
    const parentElement = target.parentElement as HTMLElement;

    if (intersectionRatio > 0 && intersectionRatio < 1) {
        parentElement.style.bottom = '0';
        parentElement.style.top = 'auto';

        return;
    }

    parentElement.style.bottom = 'auto';
    parentElement.style.top = '0';
}