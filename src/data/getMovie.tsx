import { createContext } from 'react'
import { fetchTrendMovies } from '../services/fetchDataAPI'
import { useQuery } from 'react-query'
import Spinner from '../ui/Spinner'
import { mediaProperty } from '../utils/interface'
interface MovieContextType {
  movies: mediaProperty[]
}
const defaultContextValue: MovieContextType = {
  movies: [],
}

export const MovieContext = createContext<MovieContextType>(defaultContextValue)

export const MovieProvider = ({ children }: any) => {
  const {
    data: movies,
    error,
    isLoading,
    isError,
  } = useQuery('trendMovies', fetchTrendMovies)
  if (isLoading) return <Spinner />
  if (isError) return <div>Error: {error}</div>

  return (
    <MovieContext.Provider value={{ movies }}>{children}</MovieContext.Provider>
  )
}
