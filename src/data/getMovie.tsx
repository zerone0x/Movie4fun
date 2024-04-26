import { createContext, useEffect, useState } from 'react'
import axios from 'axios'
interface MovieType {
  original_title: string
  release_date: string
  poster_path: string
  id: number
  vote_average: number
}
interface MovieContextType {
  movies: MovieType[]
}
export const MovieContext = createContext<MovieContextType>([])

export const MovieProvider = ({ children }: any) => {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    async function fetchMovies() {
      try {
        // Question axios
        const response = await axios.get(
          'https://api.themoviedb.org/3/trending/movie/day?language=en-US' +
            '&api_key=dcd345ec48e9703490f93056cc03c057'
        )
        const data = await response.data
        const movie = data.results 
        setMovies(movie)
      } catch (error) {
        console.error(error)
      }
    }
    fetchMovies()
  }, [])

  

  return (
    <MovieContext.Provider value={{ movies }}>{children}</MovieContext.Provider>
  )
}
