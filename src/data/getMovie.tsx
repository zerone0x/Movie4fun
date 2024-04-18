import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const MovieContext = createContext([])

export const MovieProvider = ({children})=>{
    const [movies, setMovies] = useState([])

    useEffect(()=>{
        async function fetchMovies(){
        try{
            // Question axios 
            const response = await axios.get('http://www.omdbapi.com/?apikey=f84fc31d&s=curb')
            const data = await response.data
            setMovies(data.Search)
            console.log('this is my data', data)
            console.log(data.Search)
            
        }catch(error){
            console.error(error)
        }
        }
        fetchMovies()
    }, [])

    return(
        <MovieContext.Provider value={{movies}}>
            {children}
        </MovieContext.Provider>
    )
}





