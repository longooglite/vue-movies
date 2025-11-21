export enum TriStateBooleanValues {
    TRUE = 'true',
    FALSE = 'false',
    NULL = 'null',
}
export interface TriStateBooleanProps {
    defaultValue?: TriStateBooleanValues
    initialValue?: TriStateBooleanValues | null
    labels?: {
        true?: string
        false?: string
        null?: string
    }
}
export interface TriStateBooleanEmits {
    (e: 'update:triStateValue', value: TriStateBooleanValues): void
}


