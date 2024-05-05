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

const NoPoster = styled.div`
  width: 177px;
  height: 300px;
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const PosterImg = styled.img`
  width: 177px;
  height: 300px;
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
  profile_path?: string
  name?: string
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
  let type = movie?.media_type
  let title:string | undefined = ''
  if(movie?.profile_path){
    type='person'
    title = movie?.name
  }
  else if(movie?.original_title){
    type = 'movie'
    title = movie?.original_title
  }
  else if(movie?.original_name){
    type = 'tv'
    title = movie?.original_name
  }
  return (
    <Card>
     { movie?.poster_path &&<AddWatchBtn movie={movie}/>}
      <Link to={`/${type}/${movie.id}`}>
        <PosterWrapper height={height} width={width}>
        {movie?.poster_path === null ||
                    movie?.profile_path === null ? (
                      movie?.media_type !== 'person' ? (
                        <NoPoster>
                          <PosterImg
                            src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
                            alt="No Poster"
                            loading="lazy"
                            decoding="async"
                          />
                        </NoPoster>
                      ) : (
                        <NoPoster>
                          <PosterImg
                            src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg"
                            alt="No Actor Poster"
                            loading="lazy"
                            decoding="async"
                          />
                        </NoPoster>
                      )
                    ) : (
                      <Poster
                        src={
                          movie?.poster_path
                            ? `https://image.tmdb.org/t/p/w500${movie?.poster_path}`
                            : `https://image.tmdb.org/t/p/w500${movie?.profile_path}`
                        }
                        loading="lazy"
                        decoding="async"
                        
                      />
                    )}
        </PosterWrapper>
      </Link>
    </Card>
  )
}

export default PosterPic
