import type {InjectionKey, Ref} from 'vue'

export interface AwsMovieProviderReturn {
    movies: Ref<any[]>
    loading: Ref<boolean>
    error: Ref<any>
    refetch: () => void
    updateMovie: (id: string, input: any) => Promise<any>
    createMovie: (input: any) => Promise<any>
}
export const awsMovieProviderKey: InjectionKey<AwsMovieProviderReturn> = Symbol('awsMovieProvider');