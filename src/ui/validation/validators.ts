export type ValidatorsType = (value: string | undefined) => string | undefined

export const required: ValidatorsType = (value) => {
    if (value) return undefined;

    return "Field is required"
}

export const maxLengthCreator = (length: number) => (value: string): string | undefined => {
    if (value && value.length > length) return `Max length ${length} symbols`;
    return undefined
}
export const minLengthCreator = (length: number) => (value: string): string | undefined => {
    if (value && value.length < length) return `Min length ${length} symbols`;
    return undefined
}