<script setup lang="ts">
import { provide } from 'vue'
import { ApolloClient } from '@apollo/client/core'
import AwsMovieProvider from './providers/AwsMovieProvider.vue'
import MovieFilterProvider from './providers/MovieFilterProviders.vue'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { useApolloClient } from './utils/useApolloClient'
import TheDrawer from './components/TheDrawer/TheDrawer.vue'
import TheHeader from './components/TheHeader/TheHeader.vue'
import TheFilterRow from './components/TheFilterRow/TheFilterRow.vue'
import TMDBSearchProvider from './providers/TMDBSearchProvider.vue'
import MainMovieList from './components/MainMovieList/MainMovieList.vue'
import ScreenSizeProvider from './providers/ScreenSizeProvider.vue'
provide(DefaultApolloClient, useApolloClient() as ApolloClient<any>)
</script>

<template>
  <AwsMovieProvider>
    <MovieFilterProvider>
      <TMDBSearchProvider>
        <ScreenSizeProvider>
          <TheHeader />
          <TheFilterRow />
          <MainMovieList />
          <TheDrawer />
        </ScreenSizeProvider>
      </TMDBSearchProvider>
    </MovieFilterProvider>
  </AwsMovieProvider>
</template>
<style>
@import url('https://fonts.cdnfonts.com/css/geist-sans');
@import url('https://fonts.cdnfonts.com/css/geist-mono');

/* Global variables */
:root {
  --app-bg: #f5f5f5;
  --font-sans:
    'Geist Sans', system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial,
    'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  --font-mono:
    'Geist Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
    'Liberation Mono', 'Courier New', monospace;
  --header-height: 64px;
  --filter-row-height: 56px;
}

html,
body {
  margin: 0;
  background: var(--app-bg);
  color: #111;
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

/* Button reset */
button {
  all: unset;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
}
</style>
