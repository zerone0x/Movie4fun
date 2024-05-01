import { Link, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useSearch } from '../data/getSearchRes'
import styled from 'styled-components'
import { useQuery } from 'react-query'
import Spinner from '../ui/Spinner'
import { fetchMovieByQuery } from '../services/fetchDataAPI'
import { Helmet } from 'react-helmet-async'
const SearchRes = styled.ul`
  background-color: #f0f0f0;
  color: black;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 3rem;
  height: 100%;
  box-sizing: border-box;
`

const SearchBox = styled.div`
  color: black;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  height: 100vh;
`
const Poster = styled.img`
  max-width: 60px;
  max-height: 60px;
`
const SearchItem = styled.li`
  display: flex;
  gap: 1rem;
  padding: 0.5rem;
  border-radius: 5px;
`
const SearchText = styled.div`
  display: flex;
  flex-direction: column;
`
const Title = styled.h4`
  &:hover {
    color: grey;
    cursor: pointer;
  }
`
const SearchTitle = styled.h1`
  background-color: #f0f0f0;
  padding: 2rem;
  color: black;
`

function Search() {
  interface searchProperty {
    id: number
    poster_path: string
    original_title: string
    release_date: string
  }
  const { searchRes, setSearchRes } = useSearch()
  const location = useLocation()
  const searchQuery = new URLSearchParams(location.search).get('query')
  // const query = useSelector(selectQuery)
  // TODO the query could be removed
  const {
    data: searchResults,
    isLoading,
    isError,
    error,
  } = useQuery(['search', searchQuery], () =>
    fetchMovieByQuery(searchQuery ? searchQuery : '')
  )
  useEffect(() => {
    if (searchResults) {
      setSearchRes(searchResults)
    }
  }, [searchResults, setSearchRes])
  if (isLoading) return <Spinner />
  if (isError) return <div>Error: {error}</div>
  return (
    <>
    <Helmet>
    <title>Search Results for "{searchQuery}" - movies4fun</title>
    <meta name="description" content={`Search results for ${searchQuery} on movies4fun.`} />
    <meta property="og:title" content={`Search Results for "${searchQuery}" - movies4fun`} />
    <meta property="og:description" content={`Find movies related to ${searchQuery} on movies4fun.`} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={`https://movie4fun.netlify.app/search?query=${encodeURIComponent(searchQuery ? searchQuery : '')}`} />
    <meta property="og:image" content="todo" />
    <meta property="og:site_name" content="movies4fun" />
  </Helmet>
      <SearchTitle>Search "{searchQuery}"</SearchTitle>
      {searchRes?.length > 0 ? (
        <SearchBox>
          <SearchRes>
            {searchRes.slice(0, 10).map((searchItem: searchProperty, index) => (
              <div key={`search-item-${searchItem.id}`}>
                <Link to={`/movie/${searchItem.id}`}>
                  <SearchItem>
                    {searchItem.poster_path !== 'N/A' ? (
                      <Poster
                        src={`https://image.tmdb.org/t/p/w500${searchItem.poster_path}`}
                      />
                    ) : (
                      <span>No Poster</span>
                    )}
                    <SearchText>
                      <Title>{searchItem.original_title}</Title>
                      <time>{searchItem.release_date}</time>
                    </SearchText>
                  </SearchItem>
                </Link>
              </div>
            ))}
          </SearchRes>
        </SearchBox>
      ) : (
        <SearchRes>No search results o(︶︿︶)o</SearchRes>
      )}
    </>
  )
}

export default Search
