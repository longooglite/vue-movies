export interface SingleSelectInputProps {
    label?: string
    disabled?: boolean
    options: string[]
    initialValue?: string | null
}
export interface SingleSelectInputEmits {
    (e: 'update:singleSelectValue', value: string | null): void
}

export interface SingleSelectOptionProps {
    label?: string
    active: boolean
    value: string
}

export interface SingleSelectOptionEmits {
    (e: 'update:singleSelectOptionValue', value: string): void
}