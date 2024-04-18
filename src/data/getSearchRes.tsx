import { createContext, useContext, useState } from "react";
import { set } from "../store/movieSlice";

export const SearchContext = createContext({
    searchRes: [],
    setSearchRes: ()=>{}
})
export const SearchProvider = ({children})=>{
    const [searchRes, setSearchRes] = useState([])
    return(
        <SearchContext.Provider value={{searchRes,setSearchRes }}>
            {children}
        </SearchContext.Provider>
    )
}


export const useSearch = () => useContext(SearchContext);