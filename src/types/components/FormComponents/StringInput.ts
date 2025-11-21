export interface StringInputProps {
    value?: string | null
    disabled?: boolean
    placeholder?: string
    label?: string
}

export interface StringInputEmits {
    (e: 'update:stringValue', value: string | null): void
}