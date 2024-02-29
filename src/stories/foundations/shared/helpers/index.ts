export const copyToClipboard = (string: string): void => {
    navigator.clipboard.writeText(string);
    alert(`${ string } was copied to clipboard!, You can use it in your style!`);
}