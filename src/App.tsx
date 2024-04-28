import GlobalStyles from './styles/GlobalStyles'
import { QueryClient, QueryClientProvider } from "react-query";
import {
  BrowserRouter,
  createBrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'
import AppLayout from './ui/AppLayout'
import Home from './pages/Home'
import PageNotFound from './pages/PageNotFound'
import WatchList from './pages/WatchList'
import Movie from './pages/Movie'
import Top250 from './pages/Top250'
import { MovieProvider, MovieContext } from './data/getMovie'
import { SearchProvider } from './data/getSearchRes'
import Search from './pages/Search'
import { ReactQueryDevtools } from 'react-query-devtools';
import { TVProvider } from './data/getTV';

const queryClient = new QueryClient()

function App() {
  return (
    <>
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />
      <BrowserRouter>
        <SearchProvider>
          <TVProvider>
          <MovieProvider>
            <Routes>
              <Route element={<AppLayout />}>
                <Route index element={<Navigate replace to="home" />} />
                <Route path="home" element={<Home />} />
                <Route path="watchlist" element={<WatchList />} />
                <Route path="top250" element={<Top250 />} />
                <Route path="movie/:movieId" element={<Movie />} />
                <Route path="search" element={<Search />} />
                {/* TODO - Add a route for the actor page */}
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </MovieProvider>
          </TVProvider>
        </SearchProvider>
      </BrowserRouter>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </>
  )
}

export default App
