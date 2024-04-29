import { useDispatch, useSelector } from 'react-redux'
import {
  selectWatchList,
  setWatchList,
  addWatchList,
  removeWatchList,
  sortWatchList,
  reverseWatchList,
  selectAllWatchList,
  setCurrentPage
} from '../store/watchListSlice'
import PosterPic from '../components/PosterPic'
import RatingDetail from '../components/RatingDetail'
import styled from 'styled-components'
import { ArrowDown, ArrowUp} from 'lucide-react'
import { useEffect, useState } from 'react'
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai"; 
import { IconContext } from "react-icons"; 
import ReactPaginate from 'react-paginate';
const WatchPage = styled.div`
background: #CECECA;
color: black;
padding: 1rem 15rem;
min-height: 100vh;
`
const WatchBox = styled.ul`
color: black;
display: flex;
flex-direction: column;
flex:0;
margin: 0 auto;
min-height: 100vh;
// max-width: 1200px;
gap: 1rem;
background: white;
`
const WatchItem = styled.li`
display: flex;
padding: 2rem 3rem;
gap: 1rem;
border-bottom: 1px solid #f5c518;
`
const WatchHeader = styled.div`
display: flex;
justify-content: space-between;
`
const Btn = styled.button`
border: none;
background: none;
border-radius: 5px;
padding: 0.5rem;
&:hover {
  background-color: grey;
}
`
const WatchSort = styled.div`
display: flex;
align-items: center;
gap: 1rem;
`
const WatchSelect = styled.select`
padding-left: 0.5rem;
`

const PaginationContainer = styled(ReactPaginate)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5%;
  gap:10px;
  cursor: pointer;
  

  .page-item {
    padding: 10px 13px;
    border-radius: 40%;
    &:hover {
      background: grey;
      color: black;
    }
  }

  .active {
    background: #f5c518;
    color: black;
  }
`;

interface WatchListItemProp{
  id: number;
  title: string;
  vote_average: number;
  release_date: string;
  original_title: string;
  poster_path: string;
  overview: string;
  runtime: number;
  genres: {name:string}[];

}

function WatchList() {
  const {value:WatchList, currentPage, moviesPerPage} = useSelector(selectAllWatchList)
  const dispatch = useDispatch()
  const [filterMovies, setFilterMovies] = useState<WatchListItemProp[]>([]);
  useEffect(() => {
    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = WatchList.slice(indexOfFirstMovie, indexOfLastMovie);
    setFilterMovies(currentMovies);
  }, [WatchList, currentPage, moviesPerPage]); 
  useEffect(() => {
    if (currentPage > 0 && WatchList.length <= currentPage * moviesPerPage) {
      setCurrentPage(currentPage - 1);
    }
  }, [WatchList, currentPage, moviesPerPage]);
  
  const handlePageClick = (data: { selected: number }) => {
    dispatch(setCurrentPage(data.selected+1));
  };


  const handleSelectChange = (event:  { target: { value: string } }) => {
    const value = event.target.value;
    switch(value) {
      case '1':
        dispatch(sortWatchList('rating'));
        break;
      // case '2':
      //   dispatch(sortWatchList('YourRating'));
      //   break;
      case '3':
        dispatch(sortWatchList('release'));
        break;
      case '4':
        dispatch(sortWatchList('title'));
        break;
      default:
        // handle default case
    }
  };

  interface movieProperty{
    original_title: string;
    id: number;
    genres: {name:string}[];
    poster_path: string;
    release_date: string;
    runtime: number;
    overview: string;
    vote_average: number;
  }
  return (
    <WatchPage>
      <WatchHeader>
      <h1>Your WatchList</h1>
      <WatchSort>
      <p>Sort by:</p>
      {/* TODO https://poe.com/s/HVXVZe68aug9dZuJUvTs */}
      <WatchSelect onChange={handleSelectChange}>
        <option value="1">IMDb Rating</option>
        {/* <option value="2">Your Rating</option> */}
        <option value="3">Release Date</option>
        <option value="4" >Title</option>
      </WatchSelect>
        <Btn onClick={() => dispatch(reverseWatchList())}>
      <ArrowDown/>
      <ArrowUp/></Btn>

      </WatchSort>
      </WatchHeader>
     
      {filterMovies.length > 0 ? (
        <>
        <WatchBox>
          {filterMovies.map((movie:movieProperty) => (
            <WatchItem key={`watchlist-movie-${movie.id}`}>
              <PosterPic movie={movie} height={200} width="130px" />
              <div>
                <h4>{movie.original_title}</h4>
                <span>{movie.release_date}</span>
               {movie?.runtime && <span> {movie?.runtime}min </span>}
                {/* <ul>
                {movie.genres.map((genre, index) => (
                <li key={index}>{genre.name}</li>
              ))}</ul> */}
              <RatingDetail movie={movie}/>
                <p>{movie.overview}</p>
              </div>
            </WatchItem>
          ))}
        </WatchBox>
        <PaginationContainer
        breakLabel="..."
        pageCount={Math.ceil(WatchList.length / moviesPerPage)}
        onPageChange={handlePageClick}
        pageClassName={"page-item"}
        activeClassName={'active'}
        previousLabel={
          <IconContext.Provider value={{ color: "#f5c518", size: "36px" }}>
            <AiFillLeftCircle />
          </IconContext.Provider>
        }
        nextLabel={
          <IconContext.Provider value={{ color: "#f5c518", size: "36px" }}>
            <AiFillRightCircle />
          </IconContext.Provider>
        }
      />
      </>


      ) : (
        <p>Your watchlist is empty.</p>
      )}      
    </WatchPage>
  )
}

export default WatchList
