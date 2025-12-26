<script setup lang="ts">
import { provide } from 'vue'
import { callbacksProviderKey } from '../types/providers/CallbacksProvider'
import { Movie } from '../types/types'

const callbacks = {
    movieListEntry: {
        editMovie: (movie: Movie) => {
            console.log(movie)
        },  
        movieDetails: (movie: string) => {
            console.log(movie)
        }
    }
}

provide(callbacksProviderKey, callbacks)
</script>
<template><slot></slot></template>