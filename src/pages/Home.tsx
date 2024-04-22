import { useContext, useEffect, useState } from "react";
import {MovieContext, MovieProvider} from "../data/getMovie";
import {selectMovie, set} from '../store/movieSlice'
import {selectWatchList, setWatchList, addWatchList, removeWatchList} from '../store/watchListSlice'
import {useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Poster from "../components/poster";



function Home() {
  const movies = useContext(MovieContext)

  // const dispatch = useDispatch()
  // const watchList = useSelector(selectWatchList)



  return (
    <Poster movies={movies.movies}/>
    
  );
}

export default Home;