import { createContext } from 'react'
import { fetchTVTopRated } from '../services/fetchDataAPI'
import { useQuery } from 'react-query'
import Spinner from '../ui/Spinner'
import { mediaProperty } from '../utils/interface'
interface TVTopRateContextType {
  tvSource: mediaProperty[]
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
