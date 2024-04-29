import { createContext } from 'react'
import { fetchTrendTV } from '../services/fetchDataAPI'
import { useQuery } from 'react-query'
import Spinner from '../ui/Spinner'
interface TVType {
  original_name: string
  first_air_date: string
  poster_path: string
  id: number
  vote_average: number
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
