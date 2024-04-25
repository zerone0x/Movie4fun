import { useDispatch, useSelector } from "react-redux";
import { addWatchList, removeWatchList, selectWatchList } from "../store/watchListSlice";
import styled from "styled-components";
import StarRating from "./starRating";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AddWatchBtn from "../ui/AddWatchBtn";
import RatePopup from "../ui/RatePopup";

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

.slick-prev:before, .slick-next:before {
  font-size: 50px; 
  color:  	#bbbbbb; 
  background-color: transparent;
  opacity: 1; 
}
.slick-prev:hover:before, .slick-next:hover:before {
  opacity: 1; 
  color: #F5C518!important;
  // background-color: #F5C518!important;
  z-index: 1000;
  transform: scale(1.1); 
}
  .slick-prev {
    left: 10px;
  }

  .slick-next {
    right: -10px;
  }
`;

const MovieDetail = styled.div`
  padding: 10px;
  border-radius: 0 0 4px 4px;
`;
const MovieBox = styled.div`
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  
`;


const SectionTitle = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  &::after {
    content: '>';
  }
  &::before {
    content: '| ';
    color: #F5C518;
  }
`;


const Card = styled.div`
  position: relative;
  background: #1A1A1A;
  // margin-right: 20px;

`;


const PosterWrapper = styled.div`

  width: 100%;
  height: 300px;
  min-height: 200px;

`;

const PosterItem = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
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
  border: none;
  cursor: pointer;
  z-index: 10;
  &:hover {
    border: #f5c518;
  }
`;

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <ArrowButton
      className={className}
      onClick={onClick}
    />
  );
}

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <ArrowButton
      className={className}
      onClick={onClick}
    />
  );
}
function Poster({ movies, header }) {
 

  

  console.log(movies)
  

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };
  const [isOpen, setIsOpen] = useState(false);
  return (
    <MovieBox>
      {header && <SectionTitle>{header} </SectionTitle>}
        <StyledSlider {...settings}>
        {movies?.map((movie, index) => (
          <Card key={index}>
            <AddWatchBtn movie={movie} />
            <Link to={`/movie/${movie.id}`}>
              <PosterWrapper>
                {movie.poster_path !== 'N/A' ? (
                  <PosterItem src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.original_title} />
                ) : (
                  <span>No Poster</span>
                )}
              </PosterWrapper>
            </Link>
            <MovieDetail>
            <Title>{movie.original_title}</Title>
            <Year>{movie.release_date}</Year>
            <Button onClick={()=>{setIsOpen(true)}}>Rate</Button>
            {/* <StarRating id={movie.id} /> */}
            {isOpen && <RatePopup movie={movie} setIsOpen={setIsOpen} />}
            </MovieDetail>
          </Card>
          
        ))}
</StyledSlider>
     
    </MovieBox>
  );
}

export default Poster;