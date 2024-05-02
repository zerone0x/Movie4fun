import { createContext } from 'react'
import { fetchTrendMovies } from '../services/fetchDataAPI'
import { useQuery } from 'react-query'
import Spinner from '../ui/Spinner'
interface MovieType {
  id: number
  genres: { name: string }[]
  poster_path: string
  runtime: number
  overview: string
  vote_average: number
  backdrop_path: string
  media_type: string
  original_title?: string
  original_name?: string
  release_date?: string
  first_air_date?: string
}
interface MovieContextType {
  movies: MovieType[]
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
