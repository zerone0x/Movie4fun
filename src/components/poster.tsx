import { useDispatch, useSelector } from "react-redux";
import { addWatchList, removeWatchList, selectWatchList } from "../store/watchListSlice";
import styled from "styled-components";
import StarRating from "./starRating";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const MovieSection = styled.div`
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  
`;

const CardBox = styled.div`
  display: flex;
  overflow-x: hidden;
  position: relative;
  margin: auto; 
`;

const SectionTitle = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  // margin: left;
`;


const Card = styled.div`
  flex: 0 0 auto;
  max-width: 200px;
  margin-right: 20px;
  position: relative;
  background: #1A1A1A;
  

`;

const AddButton = styled.button`
  // position: absolute;
  // top: 10px;
  // right: 10px;
  // background: rgba(0, 0, 0, 0.7);
  // color: #fff;
  // border: none;
  // border-radius: 50%;
  // width: 30px;
  // height: 30px;
  // font-size: 16px;
  // cursor: pointer;
`;

const PosterWrapper = styled.div`
  width: 100%;
  height: 300px;
  background: #ddd;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PosterItem = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
`;

const Title = styled.h3`
  font-size: 16px;
  margin: 10px 0 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Year = styled.p`
  font-size: 14px;
  color: #888;
  margin-bottom: 10px;
`;

const Button = styled.button`
  background: #f5c518;
  color: #000;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
`;



const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  border: none;
  font-size: 24px;
  padding: 10px;
  cursor: pointer;
  z-index: 10;
  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }
`;

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', background: 'green' }}
      onClick={onClick}
    />
  );
}

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', background: 'green' }}
      onClick={onClick}
    />
  );
}
function Poster({ movies, header }) {
 
  const dispatch = useDispatch();
  const watchList = useSelector(selectWatchList);
  
  const movieEx = movies[0];
  type Movie = typeof movieEx;
  console.log(movies)
  

  function handleAddWatchList(movie: Movie) {
    const isInWatchList = watchList.find(item => item.id === movie.id);
    if (isInWatchList) {
      dispatch(removeWatchList(movie));
    } else {
      dispatch(addWatchList(movie));
    }
  }
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <MovieSection>
      <SectionTitle>{header}</SectionTitle>
      
     
        <Slider {...settings}>
        {movies?.map((movie, index) => (
          <Card key={index}>
            <AddButton onClick={() => handleAddWatchList(movie)}>
              {watchList.find(item => item.id === movie.id) ? '✔️' : '➕'}
            </AddButton>
            <Link to={`/movie/${movie.id}`}>
              <PosterWrapper>
                {movie.poster_path !== 'N/A' ? (
                  <PosterItem src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.original_title} />
                ) : (
                  <span>No Poster</span>
                )}
              </PosterWrapper>
            </Link>
            <Title>{movie.original_title}</Title>
            <Year>{movie.release_date}</Year>
            <Button>Rate</Button>
            <StarRating id={movie.id} />
          </Card>
        ))}
</Slider>
     
    </MovieSection>
  );
}

export default Poster;