import axios from "axios"
import { useEffect } from "react"
import Poster from "../components/poster"

function GetMovie({query}) {
    let SearchMovies = []
    useEffect(()=>{
        async function fetchMovies(){
        try{
            const response = await axios.get('http://www.omdbapi.com/?apikey=f84fc31d&s='+query)
            const data = await response.data
            console.log('this is my data', data)
            console.log(data.Search)
            SearchMovies = data.Search

        }catch(error){
            console.error(error)
        }
        }
        fetchMovies()
    }, [query])
    
  return (<>{SearchMovies.length && <Poster movies={SearchMovies}></Poster>}</>)
}

export default GetMovie;