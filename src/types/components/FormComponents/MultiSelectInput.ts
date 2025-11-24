export interface MultiSelectInputProps {
  label?: string
  disabled?: boolean
  options: string[]
  type?: 'number' | 'string'
  initialValue?: (string | number)[] | null
}
export interface MultiSelectInputEmits {
  (e: 'update:multiSelectValue', value: (string | number)[] | null): void
}

export interface MultiSelectOptionProps {
  label?: string
  active: boolean
  value: string
}

export interface MultiSelectOptionEmits {
  (e: 'update:multiSelectOptionValue', value: string): void
}
