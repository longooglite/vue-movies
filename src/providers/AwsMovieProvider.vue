<script setup lang="ts">
import {
  DefaultApolloClient,
  provideApolloClient,
  useMutation,
  useQuery,
} from '@vue/apollo-composable'
import { computed, inject, provide } from 'vue'
import { awsMovieProviderKey } from '../types/providers/AwsMovieProvider'
import { ApolloClient } from '@apollo/client'
import { LIST_MOVIES_QUERY } from '../graphql/queries'
import { UPDATE_MOVIE_MUTATION } from '../graphql/mutations/updateMovie'
import { CREATE_MOVIE_MUTATION } from '../graphql/mutations/createMovie'

const apolloClient = inject(DefaultApolloClient) as ApolloClient<any>

provideApolloClient(apolloClient)
const { result, loading, error, refetch } = useQuery(LIST_MOVIES_QUERY)
const { mutate: _updateMovie } = useMutation(UPDATE_MOVIE_MUTATION)
const { mutate: _createMovie } = useMutation(CREATE_MOVIE_MUTATION)

const sortByYear = (
  { year: yearA }: { year: number },
  { year: yearB }: { year: number },
) => yearA - yearB

const movies = computed(() => {
  if (result.value?.listMovies?.items) {
    return [...result.value?.listMovies?.items].sort(sortByYear).filter((movie) => movie.title)
  }
  return []
})
const updateMovie = async (id: string, input: any) => {
  const result = await _updateMovie({ id, input })
  await refetch()
  return result
}
const createMovie = async (input: any) => {
  const result = await _createMovie({ input })
  await refetch()
  return result
}
provide(awsMovieProviderKey, {
  movies,
  loading,
  error,
  refetch,
  updateMovie,
  createMovie,
})
</script>
<template><slot></slot></template>
