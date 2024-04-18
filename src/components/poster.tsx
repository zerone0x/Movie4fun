import { useDispatch, useSelector } from "react-redux";
import { addWatchList, removeWatchList, selectWatchList, setWatchList } from "../store/watchListSlice";
import styled from "styled-components";
import  StarRating  from "./starRating";
import { Link } from "react-router-dom";

const CardBox = styled.div`
display: flex;


`;

const Card = styled.div`
  width: 250px;
  border: 0px;
  border-radius: 4px;
  position: relative;
  margin: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
`;

const PosterItem = styled.img`
  width: 100%;
  height: 60%;
  margin: 0;
  display: block;

`;

const AddButton = styled.button`
  position: absolute;

  padding: 5px 10px;
  border: none;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  z-index: 1;

  &:hover {
    background-color: #f5c518;
  }
`;
// 标题样式
const Title = styled.h3`
  font-size: 18px;
  padding: 10px;
  margin: 0;
  color: #333;
  background-color: #f0f0f0;
`;



const Button = styled.button`
  display: block;
  width: 100%;
  padding: 10px;
  border: none;
  background-color: ##f5c518;
  color: white;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: ##f5c518;
  }
`;

function Poster({movies}) {
    console.log('posters',movies)
  const dispatch = useDispatch()
  const watchList = useSelector(selectWatchList)
  

  const movieEx = movies[0]
  type Movie = typeof movieEx
  function handleAddWatchList(movie: Movie){
    const isInWatchList = watchList.find(item => item.imdbID === movie.imdbID)
    if (isInWatchList){
        dispatch(removeWatchList(movie))
    }else{
        dispatch(addWatchList(movie))
    }
  }
  return (
    <CardBox>
    {
       movies?.map((movie, index) => (
        <Link to ={`/movie/${movie.imdbID}`}>
        <Card key={index}>
          <AddButton onClick={()=> handleAddWatchList(movie)}>{watchList.find(item => item.imdbID === movie.imdbID) ? '✔️' : '➕'}</AddButton>
          <PosterItem src={movie.Poster} alt={movie.Title}/>
          <Title>{movie.Title}</Title>
          <p>{movie.Year}</p>
          <Button>Rate</Button>
           <StarRating imdbID ={movie.imdbID}/>
        </Card></Link>
    )
    )}
    </CardBox>
    
  );
}

export default Poster;