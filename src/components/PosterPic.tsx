import styled from 'styled-components'
import AddWatchBtn from '../ui/AddWatchBtn'
import { Link } from 'react-router-dom'
const Poster = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`
const PosterWrapper = styled.div<PosterWrapperProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height}px;
  // max-height: ${(props) => props.height}px;
`
const Card = styled.div`
  position: relative;
  // background: #1a1a1a;
  // margin-right: 20px;
  max-width: 200px;
`

interface Media {
  id: number
  poster_path: string
  vote_average: number
  media_type: string
  original_title?: string
  original_name?: string
  release_date?: string
  first_air_date?: string
}

interface posterProps {
  movie: Media
  height?: number
  width?: string
}

interface PosterWrapperProps {
  height: number
  width: string
}

function PosterPic({ movie, height = 200, width = '100px' }: posterProps) {
  let type = movie.media_type === 'movie' ? 'movie' : 'tv'
  if(movie?.original_title){
    type = 'movie'
  }else{
    type = 'tv'
  }
  return (
    <Card>
      <AddWatchBtn movie={movie}/>
      <Link to={type === 'movie' ? `/movie/${movie.id}` : `/tv/${movie.id}`}>
        <PosterWrapper height={height} width={width}>
          {movie.poster_path !== 'N/A' ? (
            <Poster
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie?.original_title ? movie.original_title : movie?.original_name}
              loading="lazy"
              decoding="async"
            />
          ) : (
            <span>No Poster</span>
          )}
        </PosterWrapper>
      </Link>
    </Card>
  )
}

export default PosterPic
