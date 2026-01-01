<script setup lang="ts">
import { provide } from 'vue'
import { callbacksProviderKey } from '../types/providers/CallbacksProvider'
import { Movie } from '../types/types'

const callbacks = {
    movieListEntry: {
        editMovie: (_movie: Movie) => {},
        movieDetails: (_movie: Movie) => {},
    }
}

provide(callbacksProviderKey, callbacks)
</script>
<template><slot></slot></template>