import styled from 'styled-components'
import AddWatchBtn from '../ui/AddWatchBtn'
import { Link } from 'react-router-dom'
import { memo, useMemo } from 'react'
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
  return (
    <Card>
      <AddWatchBtn movie={movie} />
      <Link to={movie.media_type === 'tv' ? `/tv/${movie.id}` : `/movie/${movie.id}`}>
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
