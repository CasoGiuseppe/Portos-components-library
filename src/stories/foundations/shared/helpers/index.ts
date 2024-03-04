export const copyToClipboard = async (string: string): Promise<void> => {
    try {
        navigator.clipboard.writeText(string).then(() => {
            alert(`${ string } was copied to clipboard!, You can use it in your style!`);
        });
    } catch (err) {
        throw new Error(`Failed to copy: ${err}`);
    }
}