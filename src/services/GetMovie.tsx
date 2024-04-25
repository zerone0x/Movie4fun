import axios from 'axios'
import { useEffect } from 'react'
import Poster from '../components/poster'

function GetMovie({ query }) {
  let SearchMovies = []
  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await axios.get(
          'http://www.omdbapi.com/?apikey=cfb2ee9c&s=' + query
        )
        const data = await response.data
        SearchMovies = data.Search
      } catch (error) {
        console.error(error)
      }
    }
    fetchMovies()
  }, [query])

  return <>{SearchMovies.length && <Poster movies={SearchMovies}></Poster>}</>
}

export default GetMovie
