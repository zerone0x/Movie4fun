import { useContext, useEffect, useState } from "react";
import {MovieContext, MovieProvider} from "../data/getMovie";
import {selectMovie, set} from '../store/movieSlice'
import {selectWatchList, setWatchList, addWatchList, removeWatchList} from '../store/watchListSlice'
import {useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Poster from "../components/poster";

const HomeBox = styled.div`
  padding: 4rem;
  background: black;

`
const MovieBox = styled.div`
max-width: 1200px;
margin: 0 auto;
  `

const Header = styled.h1`
  font-size: 3rem;
  color:#F5C518;
  margin-bottom: 20px;
`;



function Home() {
  const movies = useContext(MovieContext)

  // const dispatch = useDispatch()
  const watchList = useSelector(selectWatchList)



  return (
    <HomeBox>
      <MovieBox>
    <Header>What to watch</Header>
    <Poster movies={movies.movies} header="Top Trend"/>
    <Poster movies={watchList} header="From your Watchlist"/>
    </MovieBox>
    </HomeBox>
  );
}

export default Home;