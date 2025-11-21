export interface NumberInputProps {
    defaultValue?: number
    initialValue?: number | null
    disabled?: boolean
    min?: number
    max?: number
    step?: number
    placeholder?: string
    label?: string
}
export interface NumberInputEmits {
    (e: 'update:numberValue', value: number | null): void
}


