import { useContext, useEffect, useState } from "react";
import {MovieContext, MovieProvider} from "../data/getMovie";
import {selectMovie, set} from '../store/movieSlice'
import {selectWatchList, setWatchList, addWatchList, removeWatchList} from '../store/watchListSlice'
// import useLocalStorage from "../hooks/uselocalStorage";
import {useDispatch, useSelector } from "react-redux";
// import Button from "../ui/Button";
import styled from "styled-components";

const CardBox = styled.div`
display: grid;
grid-template-rows: repeat(5, 1fr);
grid-gap: 20px;
padding: 20px 0;

`;

const Card = styled.div`
  width: 250px;
  border: 0px;
  border-radius: 4px;
  position: relative;
  margin: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
`;

const Poster = styled.img`
  width: 100%;
  height: 100%;
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


// // 按钮样式，使用绝对定位
// const AddButton = styled.button`
//   position: absolute;
//   top: 0px;    
//   left: 0px;   
//   padding: 5px 10px;
//   border: none;
//   background-color:rgba(0, 0, 0, 0.5) ;
//   color: white;
//   font-size: 16px;
//   cursor: pointer;
//   border-radius: 5px;

//   &:hover {
//     background-color: #f5c518;
//   }

  
 
// `;



// 按钮样式
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

function Home() {
  const movies = useContext(MovieContext)
  console.log('this is my test', movies.movies)
//   const movie = useSelector(selectMovie)

  const dispatch = useDispatch()
  const watchList = useSelector(selectWatchList)


//   useEffect(() => {
//       async function fetchMovies(){
//           const response = await fetch("http://www.omdbapi.com/?apikey=f84fc31d&s=comedy&y=2021&type=movie");
//           const data = await response.json();
//           dispatch(set(data.Search));
//           console.log(movie)
//       }
//       fetchMovies();
// }, []);
  const movieEx = movies?.movies[0]
  type Movie = typeof movieEx
  function handleAddWatchList(item: Movie){
    console.log('add to watchlist')
    console.log(item)
    dispatch(addWatchList(item))
    // dispatch(removeWatchList(item))
    console.log(watchList)

  }
  return (
    <CardBox>
    {
      movies && movies?.movies.map((movie, index) => (
        <Card key={index}>
          <AddButton onClick={()=> handleAddWatchList(movie)}>+</AddButton>
          <Poster src={movie.Poster} alt={movie.Title}/>
          <Title>{movie.Title}</Title>
          <p>{movie.Year}</p>
          <Button>Rate</Button>

        </Card>
    )
    )}
    </CardBox>
    
  );
}

export default Home;