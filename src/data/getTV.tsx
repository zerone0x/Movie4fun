import { createContext } from 'react'
import { fetchTrendTV } from '../services/fetchDataAPI'
import { useQuery } from 'react-query'
import Spinner from '../ui/Spinner'
import { mediaProperty } from '../utils/interface'
interface TVContextType {
  tvSource: mediaProperty[]
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
