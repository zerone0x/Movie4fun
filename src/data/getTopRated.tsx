import { createContext } from 'react'
import { fetchMovieTopRated } from '../services/fetchDataAPI'
import { useQuery } from 'react-query'
import Spinner from '../ui/Spinner'
interface TopRatedType {
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
interface TopRatedContextType {
  movies: TopRatedType[]
}
const defaultContextValue: TopRatedContextType = {
  movies: [],
}

export const TopRatedContext = createContext<TopRatedContextType>(defaultContextValue)

export const TopRatedProvider = ({ children }: any) => {
  const {
    data: movies,
    error,
    isLoading,
    isError,
  } = useQuery('trendTopRateds', fetchMovieTopRated)
  if (isLoading) return <Spinner />
  if (isError) return <div>Error: {error}</div>

  return (
    <TopRatedContext.Provider value={{ movies }}>{children}</TopRatedContext.Provider>
  )
}
