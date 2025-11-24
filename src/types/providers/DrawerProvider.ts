import { InjectionKey } from 'vue'

export enum DrawerIds {
  MOVIE_DETAILS = 'movieDetails',
  CREATE_MOVIE = 'createMovie',
  NAVIGATION = 'navigation',
  EDIT_MOVIE = 'editMovie',
  SEARCH_MOVIES = 'searchMovies',
  MOBILE_FILTER = 'mobileFilter',
}

export interface DrawerProviderReturn {
  openDrawer: (drawerId: DrawerIds) => void
  closeDrawer: () => void
}

export const drawerProviderKey: InjectionKey<DrawerProviderReturn> =
  Symbol('drawerProvider')
