import { createContext } from 'react'
import { fetchMovieTopRated } from '../services/fetchDataAPI'
import { useQuery } from 'react-query'
import Spinner from '../ui/Spinner'
import { mediaProperty } from '../utils/interface'

interface TopRatedContextType {
  movies: mediaProperty[]
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
