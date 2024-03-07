export const required = ( value) => {
    if (value) return undefined;

    return "Field is required"
}

export const maxLengthCreator = (length) => (value) => {
    if (value && value.length > length) return `Max length ${length} symbols`;
    return undefined
}
export const minLengthCreator = (length) => (value) => {
    if (value && value.length < length) return `Min length ${length} symbols`;
    return undefined
}