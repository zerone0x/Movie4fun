import { useContext, useEffect, useState } from "react";
import {MovieContext, MovieProvider} from "../data/getMovie";
import {selectMovie, set} from '../store/movieSlice'
import {selectWatchList, setWatchList, addWatchList, removeWatchList} from '../store/watchListSlice'
import {useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Poster from "../components/poster";

const HomeBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4rem;
  max-width: 1300px;
  margin: 0 auto;
  align-items: stretch;
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
    <Header>What to watch</Header>
    <Poster movies={movies.movies} header="Top Trend"/>
    <Poster movies={watchList} header="From your Watchlist"/>
    </HomeBox>
  );
}

export default Home;