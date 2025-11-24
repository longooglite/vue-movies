import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'

export const useApolloClient = () => {
  const apiKey =
    import.meta.env.VITE_AWS_API_KEY || import.meta.env.VITE_AWS_API_KEY || ''

  const httpLink = createHttpLink({
    uri: import.meta.env.VITE_AWS_ENDPOINT || 'http://localhost:4000/graphql',
  })

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        ...(apiKey ? { 'x-api-key': apiKey } : {}),
      },
    }
  })

  const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  })

  return apolloClient
}
