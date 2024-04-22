import { useDispatch, useSelector } from "react-redux";
import { addWatchList, removeWatchList, selectWatchList } from "../store/watchListSlice";
import styled from "styled-components";
import StarRating from "./starRating";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

const MovieSection = styled.div`
  margin-bottom: 40px;
`;

const SectionTitle = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;


const Card = styled.div`
  flex: 0 0 auto;
  width: 200px;
  margin-right: 20px;
  position: relative;
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

const CardBox = styled.div`
  display: flex;
  overflow-x: hidden;
  scroll-behavior: smooth;
  padding: 20px;
  position: relative;
  width: calc(220px * 6); /* width of 6 cards, assuming each card is 200px + 20px margin */
  margin: auto; /* Center the card box */
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


function Poster({ movies }) {
  const dispatch = useDispatch();
  const watchList = useSelector(selectWatchList);
  const cardBoxRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setScrollPosition(0);
      cardBoxRef.current.scrollLeft = 0;
      setShowLeftArrow(false);
      setShowRightArrow(cardBoxRef.current.scrollWidth > cardBoxRef.current.offsetWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // const handleScroll = (direction) => {
  //   const cardWidth = 220;
  //   const containerWidth = cardBoxRef.current.offsetWidth;
  //   const scrollWidth = cardBoxRef.current.scrollWidth;
  //   const currentPosition = cardBoxRef.current.scrollLeft;
  //   const maxScrollPosition = scrollWidth - containerWidth;
  //   const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
  //   const newPosition = currentPosition + scrollAmount;

  //   setScrollPosition(newPosition);
  //   cardBoxRef.current.scrollTo({
  //     left: newPosition,
  //     behavior: 'smooth',
  //   });

  //   setShowLeftArrow(newPosition > 0);
  //   setShowRightArrow(newPosition < maxScrollPosition);
  // };

  const movieEx = movies[0];
  type Movie = typeof movieEx;

  function handleAddWatchList(movie: Movie) {
    const isInWatchList = watchList.find(item => item.imdbID === movie.imdbID);
    if (isInWatchList) {
      dispatch(removeWatchList(movie));
    } else {
      dispatch(addWatchList(movie));
    }
  }

  return (
    <MovieSection>
      <SectionTitle>Movies</SectionTitle>
      <CardBox >
        <ArrowButton
          // direction="left"
          // onClick={() => handleScroll('left')}
          // visible={showLeftArrow}
        >
          ◀️
        </ArrowButton>
        {movies?.map((movie, index) => (
          <Card key={index}>
            <AddButton onClick={() => handleAddWatchList(movie)}>
              {watchList.find(item => item.imdbID === movie.imdbID) ? '✔️' : '➕'}
            </AddButton>
            <Link to={`/movie/${movie.imdbID}`}>
              <PosterWrapper>
                {movie.Poster !== 'N/A' ? (
                  <PosterItem src={movie.Poster} alt={movie.Title} />
                ) : (
                  <span>No Poster</span>
                )}
              </PosterWrapper>
            </Link>
            <Title>{movie.Title}</Title>
            <Year>{movie.Year}</Year>
            <Button>Rate</Button>
            <StarRating imdbID={movie.imdbID} />
          </Card>
        ))}
        <ArrowButton
          // direction="right"
          // onClick={() => handleScroll('right')}
          // visible={showRightArrow}
        >
          ➡️
        </ArrowButton>
      </CardBox>
    </MovieSection>
  );
}

export default Poster;