const setDynamicClass = (
    base: string,
    value: boolean,
    dynamicClass: string
): string[] => ([
    base,
    value ? dynamicClass : ''
])

export default setDynamicClass