import { useContext } from 'react'
import { MovieContext } from '../data/getMovie'
import { selectWatchList } from '../store/watchListSlice'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Poster from '../components/poster'
import { TVContext } from '../data/getTV'

const HomeBox = styled.div`
  padding: 4rem;
  background: black;
  display: flex;
  flex: 1;
  @media (max-width: 768px) {
    padding: 2rem;
  }
`

const MovieBox = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 80% @media (max-width: 768px) {
    width: 100%;
  }
`

const Header = styled.h1`
  font-size: 3rem;
  color: #f5c518;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

function Home() {
  const movies = useContext(MovieContext)
  const movieList = movies?.movies
  const tvInfo = useContext(TVContext)
  const tvList = tvInfo?.tvSource

  // const dispatch = useDispatch()
  const watchList = useSelector(selectWatchList)

  return (
    <HomeBox>
      <MovieBox>
        <Header>What to watch</Header>
        <Poster movies={movieList} header="Top Trend" />
        <Poster
          movies={watchList}
          header="From your Watchlist"
          link="/watchlist"
        />
        {/* <Poster movies={tvList} header="Top TV Shows" /> */}
      </MovieBox>
    </HomeBox>
  )
}

export default Home
