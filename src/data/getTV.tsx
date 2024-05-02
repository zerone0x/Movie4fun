import { createContext } from 'react'
import { fetchTrendTV } from '../services/fetchDataAPI'
import { useQuery } from 'react-query'
import Spinner from '../ui/Spinner'
interface TVType {
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
interface TVContextType {
  tvSource: TVType[]
}
const defaultContextValue: TVContextType = {
  tvSource: [],
}

export const TVContext = createContext<TVContextType>(defaultContextValue)

export const TVProvider = ({ children }: any) => {
  const {
    data: tvSource,
    error,
    isLoading,
    isError,
  } = useQuery('trendTVs', fetchTrendTV)
  if (isLoading) return <Spinner />
  if (isError) return <div>Error: {error}</div>

  return (
    <TVContext.Provider value={{ tvSource }}>{children}</TVContext.Provider>
  )
}
