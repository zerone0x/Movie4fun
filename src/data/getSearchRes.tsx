import { createContext, useContext, useState } from 'react'

export const SearchContext = createContext<SearchContextProp>({
  searchRes: [],
  setSearchRes: () => {},
})

interface SearchContextProp {
  searchRes: any[]
  setSearchRes: (value: any) => void
}

export const SearchProvider = ({ children }: any) => {
  const [searchRes, setSearchRes] = useState([])
  return (
    <SearchContext.Provider value={{ searchRes, setSearchRes }}>
      {children}
    </SearchContext.Provider>
  )
}

export const useSearch = () => useContext(SearchContext)

