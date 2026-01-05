import gql from 'graphql-tag'

export const LIST_MOVIES_QUERY = gql`
query listMovies {
    listMovies {
      items {
        id
        title
        year
        director
        decade
        country
        genre
        watched
        format
        label
        tmdbId
        tmdbPosterPath
        description
      }
    }
  }
`
