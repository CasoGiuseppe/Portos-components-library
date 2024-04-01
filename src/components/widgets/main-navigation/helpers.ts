export const loadNavigationItems = async (userRole: string): Promise<any> => {
    try {
        return (await import(`./items/${userRole}`))?.default;
    } catch (error) {
        console.error('Error loading items file:', error);
    }
};

export const switchChildrenPosition = (entry: IntersectionObserverEntry): void => {
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