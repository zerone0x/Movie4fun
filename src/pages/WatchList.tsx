import { useDispatch, useSelector } from 'react-redux'
import {
  selectWatchList,
  setWatchList,
  addWatchList,
  removeWatchList,
  sortWatchList,
  reverseWatchList
} from '../store/watchListSlice'
import PosterPic from '../components/PosterPic'
import RatingDetail from '../components/RatingDetail'
import styled from 'styled-components'
import { ArrowDown, ArrowUp, ChevronDown, ListOrdered, LucideListOrdered, SortAsc } from 'lucide-react'
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
max-width: 1200px;
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
// TODO 分页
// https://poe.com/s/A4gmdjmhTHYgOFqWBuyZ
function WatchList() {
  const WatchList = useSelector(selectWatchList)
  const dispatch = useDispatch()
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
     
      {WatchList.length > 0 ? (
        
        <WatchBox>
          {WatchList.map((movie:movieProperty) => (
            <WatchItem key={movie.id}>
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



      ) : (
        <p>Your watchlist is empty.</p>
      )}      
    </WatchPage>
  )
}

export default WatchList
