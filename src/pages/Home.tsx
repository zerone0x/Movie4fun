import { useContext } from 'react'
import { MovieContext } from '../data/getMovie'
import { selectWatchList } from '../store/watchListSlice'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Poster from '../components/poster'
import { TVContext } from '../data/getTV'
import { Helmet } from 'react-helmet-async'

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
  // padding: 4rem;
`

const Header = styled.h1`
  font-size: 3rem;
  color: #f5c518;
  margin-bottom: 20px;
  // font-weight: 550;
  @media (max-width: 768px) {
    font-size: 2.7rem;
  }
`

function Home() {
  const movies = useContext(MovieContext)
  const movieList = movies?.movies
  const tvInfo = useContext(TVContext)
  // const tvList = tvInfo?.tvSource

  // const dispatch = useDispatch()
  const watchList = useSelector(selectWatchList)

  return (
    <HomeBox>
      <Helmet>
        <title>Home - movies4fun</title>
        <meta property="og:title" content="movies4fun" />
        <meta property="og:description" content="Browse our top trending movies and TV shows to find your next favorite." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://movie4fun.netlify.app/" />
        <meta property="og:image" content="http://www.yourwebsite.com/path-to-your-image.jpg" />
      </Helmet>
      <MovieBox>
        <Header>Watch for fun</Header>
        <Poster movies={movieList} header="Top Movie Trend" />
        {/* <Poster movies={tvList} header="Top TV Shows" /> */}
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
