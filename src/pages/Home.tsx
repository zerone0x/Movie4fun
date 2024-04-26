import { useContext } from 'react'
import { MovieContext,  } from '../data/getMovie'
import {
  selectWatchList,
} from '../store/watchListSlice'
import {  useSelector } from 'react-redux'
import styled from 'styled-components'
import Poster from '../components/poster'

const HomeBox = styled.div`
  padding: 4rem;
  background: black;
  display: flex;
  flex: 1;
`
const MovieBox = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const Header = styled.h1`
  font-size: 3rem;
  color: #f5c518;
  margin-bottom: 20px;
`

function Home() {
  const movies = useContext(MovieContext)
  const movieList = movies.movies

  // const dispatch = useDispatch()
  const watchList = useSelector(selectWatchList)

  return (
    <HomeBox>
      <MovieBox>
        <Header>What to watch</Header>
        <Poster movies={movieList} header="Top Trend" />
        {watchList.length > 0 ? (
          <Poster movies={watchList} header="From your Watchlist" />
        ) : (
          <p>Your watchlist is empty.</p>
        )}
      </MovieBox>
    </HomeBox>
  )
}

export default Home
