import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AddWatchBtn from '../ui/AddWatchBtn'
import styled from 'styled-components'
import RatingDetail from '../components/RatingDetail'
import Spinner from '../ui/Spinner'
import { useQuery } from 'react-query'
import { fetchMovieById } from '../services/fetchDataAPI'
import { Helmet } from 'react-helmet-async'

const MovieDetail = styled.div<MovieBackgroundProps>`
  padding-top: 4rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
  z-index: 1;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 30%;
    background: ${(props) => `url(${props.backpng})`};
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    filter: blur(3px);
    z-index: -2;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(128, 128, 128, 0.6); 
    z-index: -1;
    backdrop-filter: blur(3px); // 应用模糊效果
   
  }

  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 1) 100%
  );

  @media (min-width: 769px) {
    &::before,
    &::after {
      height: 700px;
    }
  }

  @media (max-width: 768px) {
    padding: 2rem;
    flex-direction: column;
  }
`;
const MovieBox = styled.div`
  max-width: 1200px;
  margin: 0 auto;


`
const PosterAdd = styled.div`
  position: relative;
margin:1rem
`
const PosterItem = styled.img`
  min-width: 400px;
  min-height: 500px;

  @media (max-width: 768px) {
    max-width: 80%;
    max-height: 80%;
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
  padding: 5rem;
  // background-color: rgba(0, 0, 0, 0.3);
  border-radius: 0.5rem;
  color: white;
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`
const MovieHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 2rem;
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
const ScoreStar = styled.div`
display: flex;
gap: 1rem;
  `
interface movieProperty {
  original_title: string
  id: number
  genres: { name: string }[]
  poster_path: string
  release_date: string
  runtime: number
  overview: string
  vote_average: number
  backdrop_path: string
}
interface MovieBackgroundProps {
  backpng: string
}

function Movie() {
  const [movie, setMovie] = useState<movieProperty | null>(null)
  let { movieId } = useParams()

  const {
    data: movieInfo,
    error,
    isLoading,
    isError,
  } = useQuery(['MovieById', movieId], () => fetchMovieById(movieId))
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
        <MovieDetail backpng={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}>
          <Helmet>
        <title>{movie.original_title} - Movie Details</title>
        <meta name="description" content={movie.overview} />
        <meta property="og:title" content={movie.original_title} />
        <meta property="og:description" content={movie.overview} />
        <meta property="og:type" content="video.movie" />
        <meta property="og:url" content={`https://movie4fun.netlify.app/movies/${movie.id}`} />
        <meta property="og:image" content={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
        <meta property="og:site_name" content="movies4fun" />
      </Helmet>
          <MovieBox >
            
            
            <MovieBody >
              <PosterAdd>
                <AddWatchBtn movie={movie} size={40} />
                <PosterItem
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.original_title}
                  loading="lazy"
                  decoding="async"
                />
              </PosterAdd>
              <MovieInfo  >
              <h1>{movie.original_title}</h1>
              <time> {movie?.release_date}</time>
              <MovieHeader>
              <GenreList>
                <li>
                  <a href={`https://www.imdb.com/title/${movie.id}`}>IMDB</a>
                </li>
                {movie.genres.map((genre, index) => (
                  <li key={`movie-genre-${index}`}>{genre.name}</li>
                ))}
              </GenreList>
              <ScoreStar>
              <h3>User Score:</h3><RatingDetail movie={movie} /></ScoreStar>
            </MovieHeader>
            
                {/* <p>Runtime: {movie.runtime} minutes</p> */}
                <h2>Overview</h2>
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
