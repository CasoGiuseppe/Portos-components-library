export const loadNavigationItems = async (userRole: string): Promise<any> => {
    try {
        return (await import(`./items/${userRole}`))?.default;
    } catch (error) {
        console.error('Error loading items file:', error);
    }
};