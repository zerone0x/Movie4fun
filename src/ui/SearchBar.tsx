import { Link, useNavigate } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectQuery, setQuery } from '../store/querySlice'
import { debounce } from 'lodash'
import { Search } from 'lucide-react'
import styled from 'styled-components'
import { useQuery } from 'react-query'
import { fetchMovieByQuery } from '../services/fetchDataAPI'
import Spinner from './Spinner'

const SearchSuggestion = styled.ul`
  position: absolute;
  background-color: #333;
  color: white;
  display: flex;
  flex-direction: column;
  z-index: 1;
  width: 100%;
  top: 100%;
  left: 0;
`
const Poster = styled.img`
  max-width: 60px;
  max-height: 60px;
`
const SearchSuggestionItem = styled.li`
  display: flex;
  gap: 1rem;
  padding: 0.5rem;
  border-radius: 5px;
  &:hover {
    background-color: grey;
    cursor: pointer;
  }
`
const SearchSuggestionText = styled.div`
  display: flex;
  flex-direction: column;
`
const SearchButton = styled.button`
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  border-radius: 0 5px 5px 0;
  flex-shrink: 0;
  color: grey;
  background-color: white;
  border: none;
  outline: none;
`
const SearchBox = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  position: relative;
  border-radius: 8px;

  &:focus-within {
    outline: 2px solid #deb522;
  }
`
const SearchInput = styled.div`
  display: flex;
  flex-grow: 1;
  max-width: 600px;
  color: black;
  border: none;
  outline: none;
`
const SearchTxt = styled.input<SearchBarProperty>`
  border-top-left-radius: 5px;
  padding: 0.5rem 1rem;
  border-bottom-left-radius: 5px;
  line-height: 1.75rem;
  width: 100%;
  border-right: none;
  @media (max-width: 600px) {
    display:${props => props.isExpanded ? 'block' : 'none'};
  }
`
interface SearchBarProperty {
  isExpanded: boolean
}
function SearchBar() {
  const dispatch = useDispatch()
  const query = useSelector(selectQuery)
  const navigate = useNavigate()
  const [suggestions, setSuggestions] = useState([])
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const {data: suggestResults, isLoading, isError, error} = useQuery(['search',query], ()=>fetchMovieByQuery(query ? query : ''))
  useEffect(() => {
    if (suggestResults){
      setSuggestions(suggestResults || [])
      console.log(suggestResults)
    } 
  }, [setSuggestions, suggestResults])


  const debouncedFetchSuggestions = useCallback(debounce((query) => {
    dispatch(setQuery(query));
  }, 500), [dispatch]);

  useEffect(() => {
    if (query)  debouncedFetchSuggestions(query)
  }, [query, debouncedFetchSuggestions])

  function handleSearch(e: { target: { value: string } }) {
    dispatch(setQuery(e.target.value))
    setIsVisible(true)
  }
  // it will hide the searchresults when user move pointer to other place  NOTE
  const handleDocumentClick = useCallback(() => {
    setIsVisible(false);
    setIsExpanded(false);
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick)

    return () => {
      document.removeEventListener('click', handleDocumentClick)
    }
  }, [handleDocumentClick])

  function handleKeyDown(e: { key: string }) {
    if (e.key === 'Enter') {
      searchMovie()
    }
  }
  function searchMovie() {
    
    if (query) {
      navigate(`/search?query=${encodeURIComponent(query)}`)
    }else{
      setIsExpanded(prev => !prev)
    }
    
  }
  useEffect(() => {
    console.log(isExpanded); // 这里将会在 isExpanded 更新后输出新值
}, [isExpanded]);


if (isError) return <div>Error: {error}</div>
  interface suggestionProperty {
    id: number
    poster_path: string
    original_title: string
    release_date: string
  }
  return (
    <SearchBox>
      <SearchInput>
        <SearchTxt
          type="search"
          onKeyDown={(e) => {
            handleKeyDown(e)
          }}
          placeholder="Search"
          value={query}
          onChange={(e) => {
            handleSearch(e)
          }}
          isExpanded ={isExpanded}
        />
        <SearchButton onClick={searchMovie}>
          <Search />
        </SearchButton>
      </SearchInput>
      {suggestions.length > 0 && isVisible && query && (
        <SearchSuggestion>
        {isLoading ? (
          <Spinner />
        ) : (
          suggestions.slice(0, 10).map((suggestion:suggestionProperty, index) => (
            <div key={`search-suggestion-${suggestion.id}`}>
              <Link to={`/movie/${suggestion.id}`}>
                <SearchSuggestionItem>
                  {suggestion.poster_path !== 'N/A' ? (
                    <Poster src={`https://image.tmdb.org/t/p/w500${suggestion.poster_path}`} />
                  ) : (
                    <span>No Poster</span>
                  )}
                  <SearchSuggestionText>
                    <span>{suggestion.original_title}</span>
                    <span>{suggestion.release_date}</span>
                  </SearchSuggestionText>
                </SearchSuggestionItem>
              </Link>
            </div>
          ))
        )}
      </SearchSuggestion>
      )}
    </SearchBox>
  )
}

export default SearchBar
