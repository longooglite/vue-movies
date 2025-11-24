import { Ref } from 'vue'
import { Movie } from '../types/types'

const getOptionsForKey = (key: keyof Movie) => (movies: Movie[]) => {
  return (
    Array.from(
      new Set(
        movies
          .filter((movie: Movie) => movie[key])
          .map((movie: Movie) => movie[key] as string)
          .sort((a: string, b: string) => a.localeCompare(b)),
      ),
    )
  )
}

export const countryOptions = getOptionsForKey('country')
export const formatOptions = getOptionsForKey('format')
export const labelOptions = getOptionsForKey('label')
export const genreOptions = getOptionsForKey('genre')

const selectFormat = (newFormat: string, formatRef: Ref<string | null>) => {
  formatRef.value = newFormat
}
const selectLabel = (newLabel: string, labelRef: Ref<string | null>) => {
  labelRef.value = newLabel
}
const selectGenre = (
  newGenre: string,
  genreRef: Ref<string[] | string | null>,
) => {
  genreRef.value = newGenre
}
const selectCountry = (newCountry: string, countryRef: Ref<string | null>) => {
  countryRef.value = newCountry
}

export { selectFormat, selectLabel, selectGenre, selectCountry }
