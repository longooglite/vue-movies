<script setup lang="ts">
import StringInput from '../FormComponents/StringInput.vue'
import NumberInput from '../FormComponents/NumberInput.vue'
import TriStateBoolean from '../FormComponents/TriStateBoolean.vue'
import { Movie } from '../../types/types'
import { computed, inject, ref } from 'vue'
import { TriStateBooleanValues } from '../../types/components/FormComponents/TriStateBoolean'
import { awsMovieProviderKey } from '../../types/providers/AwsMovieProvider'
import { AwsMovieProviderReturn } from '../../types/providers/AwsMovieProvider'
import { useDrawerStore } from '../../stores/drawerStore/drawerStore'
import {
  selectFormat,
  selectLabel,
  selectGenre,
  selectCountry,
  countryOptions,
  formatOptions,
  labelOptions,
  genreOptions,
} from '../../composables/selectValues'
import DrawerFormRow from '../DrawerFormRow/DrawerFormRow.vue'
const { movies, updateMovie, refetch } = inject(
  awsMovieProviderKey,
) as AwsMovieProviderReturn
const drawerStore = useDrawerStore()
const props = defineProps<{
  movie: Movie
}>()
const title = ref(props.movie.title)
const year = ref(props.movie.year)
const director = ref(props.movie.director)
const decade = computed(() => {
  return String(props.movie.year).slice(0, 3) + '0'
})
const country = ref(props.movie.country ?? null)
const genre = ref(
  props.movie.genre
    ? Array.isArray(props.movie.genre)
      ? props.movie.genre.join(', ')
      : props.movie.genre
    : null,
)
const watched = ref(
  props.movie.watched
    ? TriStateBooleanValues.TRUE
    : props.movie.watched
      ? TriStateBooleanValues.FALSE
      : TriStateBooleanValues.NULL,
)
const format = ref(props.movie.format ?? null)
const label = ref(props.movie.label ?? null)

const countries = countryOptions(movies.value)
const formats = formatOptions(movies.value)
const labels = labelOptions(movies.value)
const genres = genreOptions(movies.value)
const handleFormatSelect = (newFormat: string) => {
  selectFormat(newFormat, format)
}
const handleLabelSelect = (newLabel: string) => {
  selectLabel(newLabel, label)
}
const handleGenreSelect = (newGenre: string) => {
  selectGenre(newGenre, genre)
}
const handleCountrySelect = (newCountry: string) => {
  selectCountry(newCountry, country)
}

const saveMovie = async () => {
  const result = await updateMovie(props.movie.id, {
    title: title.value,
    year: year.value,
    director: director.value,
    decade: decade.value,
    country: country.value,
    genre: genre.value,
    watched: watched.value,
    format: format.value,
    label: label.value,
  })
  await refetch()
  drawerStore.closeDrawer()
}
</script>
<template>
  <div class="edit-movie-form">
    <DrawerFormRow>
      <StringInput label="Title" v-model="title" />
    </DrawerFormRow>
    <DrawerFormRow>
      <StringInput label="Director" v-model="director" />
    </DrawerFormRow>
    <DrawerFormRow>
      <NumberInput label="Year" v-model="year" />
    </DrawerFormRow>
    <DrawerFormRow>
      <NumberInput label="Decade" v-model="decade" />
    </DrawerFormRow>
    <DrawerFormRow>
      <StringInput label="Genre" v-model="genre" />
      <div class="options-container">
        <span
          class="genre-option option-button"
          v-for="option in genres"
          :key="option"
          :class="{ active: genre === option }"
          @click="handleGenreSelect(option)"
        >
          {{ option }}
        </span>
      </div>
    </DrawerFormRow>
    <DrawerFormRow>
      <StringInput label="Country" v-model="country" />
      <div class="options-container">
        <span
          class="genre-option option-button"
          v-for="option in countries"
          :key="option"
          :class="{ active: country === option }"
          @click="handleCountrySelect(option)"
        >
          {{ option }}
        </span>
      </div>
    </DrawerFormRow>
    <DrawerFormRow>
      Watched
      <TriStateBoolean label="Watched" v-model="watched" />
    </DrawerFormRow>
    <DrawerFormRow>
      <StringInput label="Format" v-model="format" />
      <div class="options-container">
        <span
          class="genre-option option-button"
          v-for="option in formats"
          :key="option"
          :class="{ active: genre === option }"
          @click="handleFormatSelect(option)"
        >
          {{ option }}
        </span>
      </div>
    </DrawerFormRow>
    <DrawerFormRow>
      <StringInput label="Label" v-model="label" />
      <div class="options-container">
        <span
          class="genre-option option-button"
          v-for="option in labels"
          :key="option"
          :class="{ active: genre === option }"
          @click="handleLabelSelect(option)"
        >
          {{ option }}
        </span>
      </div>
    </DrawerFormRow>
    <DrawerFormRow>
      <button @click="saveMovie">Save</button>
    </DrawerFormRow>
  </div>
</template>
<style scoped>
.edit-movie-form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
}
.options-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.option-button {
  width: 50%;
  cursor: pointer;
  font-size: 0.8rem;
}
.option-button:hover {
  text-decoration: underline;
}
</style>
