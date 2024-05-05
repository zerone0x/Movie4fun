import { Link, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useSearch } from '../data/getSearchRes'
import styled from 'styled-components'
import { useQuery } from 'react-query'
import Spinner from '../ui/Spinner'
import { fetchMovieByQuery, fetchMutiByQuery } from '../services/fetchDataAPI'
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

const NoPoster = styled.div`
  width: 40px;
  height: 60px;
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
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
// search res need to be split pages TODO 
function Search() {
  interface searchProperty {
    id: number
    poster_path: string
    original_title: string
    release_date: string
    media_type: string
    first_air_date: string
    original_name: string
    profile_path: string

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
    fetchMutiByQuery(searchQuery ? searchQuery : '')
  )
  useEffect(() => {
    if (searchResults) {
      setSearchRes(searchResults)
    }
  }, [searchResults, setSearchRes, searchRes])
  if (isLoading) return <Spinner />
  if (isError) return <div>Error: {error}</div>
  return (
    <>
      <Helmet>
        <title>Search Results for "{searchQuery}" - movies4fun</title>
        <meta
          name="description"
          content={`Search results for ${searchQuery} on movies4fun.`}
        />
        <meta
          property="og:title"
          content={`Search Results for "${searchQuery}" - movies4fun`}
        />
        <meta
          property="og:description"
          content={`Find movies related to ${searchQuery} on movies4fun.`}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://movie4fun.netlify.app/search?query=${encodeURIComponent(searchQuery ? searchQuery : '')}`}
        />
        <meta property="og:image" content="todo" />
        <meta property="og:site_name" content="movies4fun" />
      </Helmet>
      <SearchTitle>Search "{searchQuery}"</SearchTitle>
      {searchRes?.length > 0 ? (
        <SearchBox>
          <SearchRes>
            {searchRes.slice(0, 15).map((searchItem: searchProperty, index) => (
              <div key={`search-item-${searchItem.id}`}>
                <Link to={`/${searchItem.media_type}/${searchItem.id}`}>
                  <SearchItem>
                    {searchItem?.poster_path === null ||
                    searchItem?.profile_path === null ? (
                      searchItem?.media_type !== 'person' ? (
                        <NoPoster>
                          <Poster
                            src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
                            alt="No Poster"
                            loading="lazy"
                            decoding="async"
                          />
                        </NoPoster>
                      ) : (
                        <NoPoster>
                          <Poster
                            src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg"
                            alt="No Actor Poster"
                            loading="lazy"
                            decoding="async"
                          />
                        </NoPoster>
                      )
                    ) : (
                      <Poster
                        src={
                          searchItem?.poster_path
                            ? `https://image.tmdb.org/t/p/w500${searchItem?.poster_path}`
                            : `https://image.tmdb.org/t/p/w500${searchItem?.profile_path}`
                        }
                        loading="lazy"
                        decoding="async"
                        
                      />
                    )}
                    <SearchText>
                      <Title>
                        {searchItem?.original_title
                          ? searchItem.original_title
                          : searchItem?.original_name}
                      </Title>
                      {/* <p>{searchItem.media_type}</p> */}
                      <time>
                        {searchItem?.release_date
                          ? searchItem.release_date
                          : searchItem?.first_air_date}
                      </time>
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
