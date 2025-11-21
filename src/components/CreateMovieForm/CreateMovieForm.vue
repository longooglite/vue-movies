<script setup lang='ts'>
import StringInput from '../FormComponents/StringInput.vue'
import NumberInput from '../FormComponents/NumberInput.vue'
import TriStateBoolean from '../FormComponents/TriStateBoolean.vue'
import { ref, inject, Ref } from 'vue'
import { awsMovieProviderKey } from '../../types/providers/AwsMovieProvider'
import { AwsMovieProviderReturn } from '../../types/providers/AwsMovieProvider'
import { useDrawerStore } from '../../stores/drawerStore/drawerStore'
import { Movie } from '../../types/types'
import DrawerFormRow from '../DrawerFormRow/DrawerFormRow.vue'
import {
    selectFormat,
    selectLabel,
    selectGenre,
    selectCountry,
    formatOptions,
    countryOptions,
    labelOptions,
    genreOptions
} from '../../composables/selectValues'

const drawerStore = useDrawerStore()
const { createMovie, movies } = inject(awsMovieProviderKey) as AwsMovieProviderReturn
const props = defineProps<{
    movie: Omit<Movie, 'id'>
}>()

const title = ref(props.movie.title)
const year = ref(props.movie.year)
const director = ref(props.movie.director)
const decade = ref(props.movie.decade)
const country = ref(props.movie.country ?? '')
const genre = ref(props.movie.genre)
const watched = ref(props.movie.watched ?? false)
const format = ref(props.movie.format ?? '')
const label = ref(props.movie.label ?? '')

const countries = countryOptions(movies.value)
const formats = formatOptions(movies.value)
const labels = labelOptions(movies.value)
const genres = genreOptions(movies.value)

const handleFormatSelect = (newFormat: string) => {
    selectFormat(newFormat, format as Ref<string | null>)
}
const handleLabelSelect = (newLabel: string) => {
    selectLabel(newLabel, label as Ref<string | null>)
}
const handleGenreSelect = (newGenre: string) => {
    selectGenre(newGenre, genre as Ref<string[] | string | null>)
}
const handleCountrySelect = (newCountry: string) => {
    selectCountry(newCountry, country as Ref<string | null>)
}

const onSave = async () => {
    const input: any = {
        title: title.value,
        year: year.value,
        director: director.value,
        decade: decade.value,
        country: country.value,
        genre: genre.value,
        watched: watched.value,
        format: format.value,
        label: label.value,
        tmdbId: props.movie.tmdbId,
        tmdbPosterPath: props.movie.tmdbPosterPath,
        description: props.movie.description,
    }
    await createMovie(input)
    drawerStore.closeDrawer()
}
</script>
<template>
    <div class="create-movie-form">
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
                    :class="{ 'active': genre === option }"
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
                    :class="{ 'active': country === option }"
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
                    :class="{ 'active': genre === option }"
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
                    :class="{ 'active': genre === option }"
                    @click="handleLabelSelect(option)"
                >
                    {{ option }}
                </span>
            </div>
        </DrawerFormRow>
        <DrawerFormRow>
            <button @click="onSave">Save</button>
        </DrawerFormRow>
    </div>
    </template>
<style scoped>
.create-movie-form {
    display: flex;
    flex-direction: column;
    gap: 8px;
}
.options-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
.option-button {
    width: 50%;
    cursor: pointer;
    font-size: .8rem;
}
.option-button:hover {
    text-decoration: underline;
}
</style>

