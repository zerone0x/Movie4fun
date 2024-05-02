import styled from 'styled-components'
import StarRating from './starRating'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import RatingDetail from './RatingDetail'
import PosterPic from './PosterPic'
import { Link } from 'react-router-dom'
import { memo, useMemo } from 'react'

const StyledSlider = styled(Slider)`

  .slick-slide {
    padding: 0 10px;
  }
  .slick-slide > div {
    margin: 0 10px;
    flex: 1 1 auto;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .slick-prev,
  .slick-next {
    z-index: 1;
    top: 50%;
    transform: translateY(-50%);
    border: none;
    opacity: 0.9;
    font-size: 50px;
    width: 50px;
    height: 50px;
  }

  .slick-prev:before,
  .slick-next:before {
    font-size: 50px;
    color: #bbbbbb;
    background-color: transparent;
    opacity: 1;
  }
  .slick-prev:hover:before,
  .slick-next:hover:before {
    opacity: 1;
    color: #f5c518 !important;
    // background-color: #F5C518!important;
    z-index: 1000;
    transform: scale(1.1);
  }
  .slick-prev {
    left: -30px;
  }

  .slick-next {
    right: -50px;
  }
`
const MovieSlider = styled.div`
padding: 0 10px;
    margin: 0 10px;
    flex: 1 1 auto;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 1rem;
  }
`
const MovieDetail = styled.div`
  padding: 10px;
  border-radius: 0 0 4px 4px;
`


const SectionTitle = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  // &::after {
  //   content: '>';
  // }
  &::before {
    content: '| ';
    color: #f5c518;
  }
`

const Card = styled.div`
  position: relative;
  background: #1a1a1a;
  // margin-right: 20px;
  max-width: 200px;
`

const Title = styled.h3`
  font-size: 16px;
  margin: 10px 0 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Year = styled.time`
  font-size: 14px;
  color: #888;
  margin-bottom: 10px;
`

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  cursor: pointer;
  z-index: 10;
  &:hover {
    border: #f5c518;
  }
`

const PosterBox = styled.div`
padding: 1rem;
`


interface ArrowProps {
  className: string
  onClick: () => void
}

function PrevArrow(props: ArrowProps) {
  const { className, onClick } = props
  return <ArrowButton className={className} onClick={onClick} />
}

function NextArrow(props: ArrowProps) {
  const { className, onClick } = props
  return <ArrowButton className={className} onClick={onClick} />
}

interface Movie {
  original_title: string
  release_date: string
  poster_path: string
  id: number
  vote_average: number
}
interface PosterProps {
  movies: Movie[]
  header: string
  link?: string
}
const sliderSettings = (moviesLength: number) => ({
  dots: true,
  infinite: moviesLength > 6,
  speed: 500,
  slidesToShow: Math.min(6, moviesLength),
  slidesToScroll: Math.min(6, moviesLength),
  prevArrow: <PrevArrow className="prev-arrow" onClick={() => {}} />,
  nextArrow: <NextArrow className="next-arrow" onClick={() => {}} />,
})
function Poster({ movies, header = '', link = '' }: PosterProps) {
  const settings = useMemo(() => sliderSettings(movies?.length), [movies])
  if(!movies.length){
    return (
      <p>Your watchlist is empty.</p>
    )
  }
  return (
    <PosterBox>
      {header && (
        <Link to={link || '#'}>
          <SectionTitle>{header}</SectionTitle>
        </Link>
      )}
  
      {movies.length > 6 ? (
        <StyledSlider {...settings}>
          {movies.map((movie) => (
            <Card key={`card-${movie.id}`}>
              <PosterPic movie={movie} height={300} width="100%" />
              <MovieDetail>
                <Title>{movie.original_title}</Title>
                <Year>{movie.release_date}</Year>
                <RatingDetail movie={movie} />
              </MovieDetail>
            </Card>
          ))}
        </StyledSlider>
      ) : (
        <MovieSlider>  
          {movies.map((movie) => (
            <Card key={`card-${movie.id}`}>
              <PosterPic movie={movie} height={300} width="100%" />
              <MovieDetail>
                <Title>{movie.original_title}</Title>
                <Year>{movie.release_date}</Year>
                <RatingDetail movie={movie} />
              </MovieDetail>
            </Card>
          ))}
        </MovieSlider>
      )}
    </PosterBox>
  );
}

export default memo(Poster)
