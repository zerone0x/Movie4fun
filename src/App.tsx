import GlobalStyles from './styles/GlobalStyles'
import { QueryClient, QueryClientProvider } from 'react-query'
import {
  BrowserRouter,
  createBrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'
import AppLayout from './ui/AppLayout'
import { MovieProvider, MovieContext } from './data/getMovie'
import { SearchProvider } from './data/getSearchRes'
import { ReactQueryDevtools } from 'react-query-devtools'
import { TVProvider } from './data/getTV'
import { Suspense, lazy } from 'react'
import Spinner from './ui/Spinner'
import { TopRatedProvider } from './data/getTopRated'
import { TVTopRateProvider } from './data/getTvTopRated'
import Discover from './pages/Discover'
import Actor from './pages/Actor'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/react'

const queryClient = new QueryClient()

const Home = lazy(() => import('./pages/Home'))
const WatchList = lazy(() => import('./pages/WatchList'))
const Movie = lazy(() => import('./pages/Movie'))
const Top250 = lazy(() => import('./pages/Top250'))
const Search = lazy(() => import('./pages/Search'))
const PageNotFound = lazy(() => import('./pages/PageNotFound'))

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GlobalStyles />
        <Suspense fallback={<Spinner />}>
          <BrowserRouter>
            <SearchProvider>
              <TVProvider>
                <MovieProvider>
                  <TopRatedProvider>
                    <TVTopRateProvider>
                      <Routes>
                        <Route element={<AppLayout />}>
                          <Route
                            index
                            element={<Navigate replace to="home" />}
                          />
                          <Route path="home" element={<Home />} />
                          <Route path="watchlist" element={<WatchList />} />
                          <Route path="top250" element={<Top250 />} />
                          <Route path=":type/:mediaId" element={<Movie />} />
                          <Route path="search" element={<Search />} />
                          <Route path="discover" element={<Discover />} />
                          <Route path="person/:actorId" element={<Actor />} />
                        </Route>
                        <Route path="*" element={<PageNotFound />} />
                      </Routes>
                    </TVTopRateProvider>
                  </TopRatedProvider>
                </MovieProvider>
              </TVProvider>
            </SearchProvider>
          </BrowserRouter>
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </Suspense>
      </QueryClientProvider>
    </>
  )
}

export default App
