import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AddWatchBtn from '../ui/AddWatchBtn'
import styled from 'styled-components'
import RatingDetail from '../components/RatingDetail'
import Spinner from '../ui/Spinner'
import { useQuery } from 'react-query'
import { fetchMovieById } from '../services/fetchDataAPI'

const MovieDetail = styled.div`
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 1) 100%
  );
  padding: 4rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  @media (max-width: 768px) {
    padding: 2rem;
  flex-direction: column;
  }
`
const MovieBox = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`
const PosterAdd = styled.div`
  position: relative;
`
const PosterItem = styled.img`
  min-width: 300px;
  min-height: 400px;
  @media (max-width: 768px) {
    max-width: 90%;
    max-height: 90%;
  }
`
const GenreList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;

  & li {
    list-style: none;
    background-color: rgba(0, 0, 0, 0.3);
    padding: 0.5rem;
    border-radius: 0.5rem;
    color: white;
    & a {
      color: #f5c518;
    }
    &::after {
      content: ' ';
    }
  }
`
const MovieInfo = styled.div`
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 0.5rem;
  color: white;
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;



`
const MovieHeader = styled.div`
display: flex;
justify-content: space-between;
@media (max-width: 768px) {
  flex-direction: column;
  gap: 1rem;
}


`

const MovieBody = styled.div`
display: flex;
@media (max-width: 768px) {
  flex-direction: column;
  gap: 1rem;
}


`
interface movieProperty {
  original_title: string;
  id: number;
  genres: {name:string}[];
  poster_path: string;
  release_date: string;
  runtime: number;
  overview: string;
  vote_average: number;
}

function Movie() {
  const [movie, setMovie] = useState<movieProperty | null>(null)
  let { movieId } = useParams()


  const {data: movieInfo, error, isLoading, isError} = useQuery(['MovieById', movieId], ()=>fetchMovieById(movieId))
  useEffect(() => {
    if (movieInfo) {
      setMovie(movieInfo)
    }
  }, [movieInfo])
  if (isLoading) return <Spinner />
  if (isError) return <div>Error: {error}</div>


  return (
    <>
      {movie ? (
        <MovieDetail>
          <MovieBox>
            <h1>{movie.original_title}</h1>
            <MovieHeader>
            <GenreList>
              <li>
                <a href={`https://www.imdb.com/title/${movie.id}`}>IMDB</a>
              </li>
              {movie.genres.map((genre, index) => (
                <li key={`movie-genre-${index}`}>{genre.name}</li>
              ))}
            </GenreList>
            <RatingDetail movie={movie}/>
</MovieHeader>
<MovieBody>
            
            <PosterAdd>
              <AddWatchBtn movie={movie} size={40} />
              <PosterItem
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.original_title}
              />
            </PosterAdd>
            <MovieInfo>
             
            <p>Release Date: {movie?.release_date }</p>
            <p>Runtime: {movie.runtime} minutes</p>
              <h3>Overview</h3>
            <p>{movie.overview}</p>
            </MovieInfo>
            </MovieBody>
          </MovieBox>
        </MovieDetail>
      ) : (
        <Spinner />
      )}
    </>
  )
}

export default Movie
