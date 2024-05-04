import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AddWatchBtn from '../ui/AddWatchBtn'
import styled from 'styled-components'
import RatingDetail from '../components/RatingDetail'
import Spinner from '../ui/Spinner'
import { useQuery } from 'react-query'
import { fetchMovieById, fetchMovieCredits, fetchMovieVideos, fetchTVById, fetchTVCredits, fetchTvVideos } from '../services/fetchDataAPI'
import { Helmet } from 'react-helmet-async'
import Poster from '../components/poster'

const MovieDetail = styled.div<MovieBackgroundProps>`
  padding-top: 3rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
  // z-index: 1;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 30%;
    background: ${(props) => `url(${props.backPng})`};
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    filter: blur(2px);
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
max-width: 1500px;
margin: 0 auto;
padding:1rem


`
const PosterAdd = styled.div`
  position: relative;

`
const PosterItem = styled.img`
  width: 100%;
  aspect-ratio: 2 / 3;
  

  @media (max-width: 768px) {
    max-width: 100%;
    max-height: 100%;
  }
`

const PosterImg = styled.img`
  max-width: 60px;
  max-height: 60px;

`

const NoPoster = styled.div`
min-height: 50vw;
min-width: 33.3333333vw;
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    max-width: 100%;
    max-height: 100%;
  }
`
const MovieSection = styled.div`
  display: flex;
  gap: 1rem;
  min-width: 100%;
  min-height: 100%;
  @media (max-width: 768px) {
    flex-direction: column;
    
  }
  
`
const GenreList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;

  & li {
    list-style: none;
    background-color: rgba(0, 0, 0, 0.3);
    padding: 0.5rem;
    border-radius: 0.5rem;
    color: white;
    & a {
      color: #f5c518;
    }
    
  }
  @media (max-width: 768px) {
    gap:0.8rem;
  }
`
const MovieInfo = styled.div`
  padding: 5rem;
  color: white;
  display: flex;
  flex-direction: column;
  
  gap: 1rem;
  h2{
    font-size: 4rem;
  }
  p{
    font-size: 2rem;
  }
  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`
const MovieHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  padding: 1rem;
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
flex-direction: column;
justify-content: end;
  `

const MovieVideo = styled.iframe`
width: 100%;
height: 100%;
border: none;

@media (max-width: 768px) {
  aspect-ratio: 16 / 9;
  min-width: 100%!important;
  min-height:100%!important;
}
`
const MovieTitle = styled.h1`
font-size: 5rem;
width: 100%;
`
const VideoBox = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin: 0 auto;
font-size: 4rem;
Color: #F5C518;
@media (max-width: 768px) {
  font-size: 2rem;
}
`

const ActorPosterBox = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`
interface mediaProperty {
  id: number
  genres: { name: string }[]
  poster_path: string
  runtime: number
  overview: string
  vote_average: number
  backdrop_path: string
  media_type: string
  original_title?: string
  original_name?: string
  release_date?: string
  first_air_date?: string
}

interface MovieBackgroundProps {
  backPng: string
}

interface Video {
  key: string
}
function Movie() {
  const [movie, setMedia] = useState<mediaProperty | null>(null)
  const [videos, setVideos] = useState<Video[]>([])
  const [credits, setCredits] = useState<Actor[]>([])
  let { type, mediaId } = useParams()

  const {
    data: movieVideo,
    error: errorVideo,
    isLoading: isLoadingVideo,
    isError: isErrorVideo,
  } = useQuery(
    [type === 'movie' ? 'MovieVideosById' : 'TVVideosById', mediaId],
    () => {
      if (type === 'movie') {
        return fetchMovieVideos(mediaId)
      } else if (type === 'tv') {
        return fetchTvVideos(mediaId)
      }
      return Promise.reject(new Error('Invalid media type'))
    }
  )

  useEffect(() => {
    if (movieVideo) {
      setVideos(movieVideo)
    }
  }, [movieVideo])
 
  const {
    data: mediaInfo,
    error,
    isLoading,
    isError,
  } = useQuery(
    [type === 'movie' ? 'MovieById' : 'TVById', mediaId],
    () => {
      if (type === 'movie') {
        return fetchMovieById(mediaId)
      } else if (type === 'tv') {
        return fetchTVById(mediaId)
      }
      return Promise.reject(new Error('Invalid media type'))
    }
  )
  
  useEffect(() => {
    if (mediaInfo) {
      setMedia(mediaInfo)
    }
  }, [mediaInfo])
      
  const {
    data: creditsInfo,
    error: creditsErr,
    isLoading: creditsIsLoading,
    isError: creditsIsErr,
  } = useQuery(
    [type === 'movie' ? 'MovieCreditsById' : 'TVCreditsById', mediaId],
    () => {
      if (type === 'movie') {
        return fetchMovieCredits(mediaId)
      } else if (type === 'tv') {
        return fetchTVCredits(mediaId)
      }
      return Promise.reject(new Error('Invalid media type'))
    }
  )
  
  useEffect(() => {
    if (creditsInfo) {
      setCredits(creditsInfo)
    }
  }, [creditsInfo])
  if (isLoading) return <Spinner />
  // TODO Error page 
  if (isError) return <div>Error: Can't find movie with this id</div>
  

  return (
    <>
      {movie ? (
        <MovieDetail
          backPng={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
        >
          <Helmet>
            <title>
              {movie?.original_title
                ? movie.original_title
                : movie?.original_name}{' '}
              - Movie Details
            </title>
            <meta name="description" content={movie.overview} />
            <meta
              property="og:title"
              content={
                movie?.original_title
                  ? movie.original_title
                  : movie?.original_name
              }
            />
            <meta property="og:description" content={movie.overview} />
            <meta property="og:type" content="video.movie" />
            <meta
              property="og:url"
              content={`https://movie4fun.netlify.app/movies/${movie.id}`}
            />
            <meta
              property="og:image"
              content={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            />
            <meta property="og:site_name" content="movies4fun" />
          </Helmet>
          <MovieBox>
            <MovieHeader>
              <div>
                <MovieTitle>
                  {movie?.original_title
                    ? movie.original_title
                    : movie?.original_name}
                </MovieTitle>
                <GenreList>
                  {
                    movie?.release_date?.length || movie?.first_air_date?.length ? (
                      <li>
                        {movie?.release_date
                          ? movie.release_date
                          : movie?.first_air_date}
                      </li>
                    ) : null
                  }
                  
                  {movie.genres.map(
                    (genre, index) =>
                      genre?.name.length && (
                        <li key={`movie-genre-${index}`}>{genre.name}</li>
                      )
                  )}
                  <li>
                    <a href={`https://www.imdb.com/title/${movie.id}`}>IMDB</a>
                  </li>
                </GenreList>
              </div>

              <ScoreStar>
                <RatingDetail movie={movie} size={40} gap={20} scoreSize={2} />
              </ScoreStar>
            </MovieHeader>

            <MovieBody>
              <MovieSection>
                {
                  movie?.poster_path !== null ? (
<PosterAdd>
                  <AddWatchBtn movie={movie} size={40} />
                  <PosterItem
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie?.original_title || movie?.original_name || ''}
                    loading="lazy"
                    decoding="async"
                  />
                </PosterAdd>
                  ) : (
                    <NoPoster>
                          <PosterImg
                            src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
                            alt="No Poster"
                            loading="lazy"
                            decoding="async"
                          />
                        </NoPoster>
                  )
                }
                

                {isLoadingVideo ? (
                  <Spinner />
                ) : isErrorVideo ? (
                  <div>Error: {errorVideo}</div>
                ) : (
                  <>
                    {videos?.length > 0 ? (
                      <MovieVideo
                        title={
                          movie?.original_title || movie?.original_name || ''
                        }
                        height="315"
                        src={`https://www.youtube.com/embed/${videos[0]?.key}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <VideoBox>No video available</VideoBox>
                    )}
                  </>
                )}
              </MovieSection>
            </MovieBody>

            <MovieInfo>
              {/* <p>Runtime: {movie.runtime} minutes</p> */}
              <h2>Overview</h2>
              <p>{movie.overview}</p>
            </MovieInfo>
            
          </MovieBox>
          {creditsIsLoading ? (
          <Spinner />
        ) : creditsIsErr ? (
          <div>Error: {creditsErr}</div>
        ) : (
          credits && <ActorPosterBox><Poster movies={credits} header="Actors" detail={false} fontSize={30}/></ActorPosterBox>
        )}
        </MovieDetail>
      ) : (
        <Spinner />
      )}
    </>
  )
}

export default Movie
