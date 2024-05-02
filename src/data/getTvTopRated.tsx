import { createContext } from 'react'
import { fetchTVTopRated } from '../services/fetchDataAPI'
import { useQuery } from 'react-query'
import Spinner from '../ui/Spinner'
interface TVTopRateType {
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
interface TVTopRateContextType {
  tvSource: TVTopRateType[]
}
const defaultContextValue: TVTopRateContextType = {
  tvSource: [],
}

export const TVTopRateContext = createContext<TVTopRateContextType>(defaultContextValue)

export const TVTopRateProvider = ({ children }: any) => {
  const {
    data: tvSource,
    error,
    isLoading,
    isError,
  } = useQuery('trendTVTopRates', fetchTVTopRated)
  if (isLoading) return <Spinner />
  if (isError) return <div>Error: {error}</div>

  return (
    <TVTopRateContext.Provider value={{ tvSource }}>{children}</TVTopRateContext.Provider>
  )
}
