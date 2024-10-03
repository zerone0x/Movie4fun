import { Link, useNavigate } from 'react-router-dom'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectQuery, setQuery } from '../store/querySlice'
import { debounce } from 'lodash'
import { Search } from 'lucide-react'
import styled from 'styled-components'
import { useQuery } from 'react-query'
import { fetchMovieByQuery, fetchMutiByQuery } from '../services/fetchDataAPI'
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
`
const SearchBox = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  position: relative;
  border-radius: 8px;

  @media (max-width: 768px) {
    width: 100%;
    // z-index: 1;
  }
`
const SearchInput = styled.div`
  display: flex;
  flex-grow: 1;
  max-width: 600px;
  color: black;
  border: none;
  width: 100%;

  @media (min-width: 601px) {
    width: 500px;
  }
`
const SearchTxt = styled.input<SearchBarProperty>`
  border-top-left-radius: 5px;
  padding: 0.5rem 1rem;
  border-bottom-left-radius: 5px;
  line-height: 1.75rem;
  width: 100%;
  border-right-radius: none;
  border: none;
  outline: none;

  @media (max-width: 600px) {
    width: ${(props) => (props.isExpanded ? '100%' : '0')};
    visibility: ${(props) => (props.isExpanded ? 'visible' : 'hidden')};
  }
`

const NoPoster = styled.div`
  width: 40px;
  height: 60px;
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
`

const SuggestDetail = styled.div`
  display: flex;
  gap: 0.5rem;
  p {
    color: #f5c518;
  }
`

interface SearchBarProperty {
  isExpanded: boolean
}
interface suggestionProperty {
  id: number
  poster_path: string
  original_title: string
  release_date: string
  media_type: string
  first_air_date: string
  original_name: string
  profile_path: string
}

interface SearchBarComponentProperty {
  onFocus: () => void
  onBlur: () => void
  onActiveStatus: boolean
  onStatusChange: (onActiveStatus: boolean) => void
}

function SearchBar({
  onFocus,
  onBlur,
  onActiveStatus,
  onStatusChange,
}: SearchBarComponentProperty) {
  const dispatch = useDispatch()
  const query = useSelector(selectQuery)
  const navigate = useNavigate()
  const [suggestions, setSuggestions] = useState([])
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const {
    data: suggestResults,
    isLoading,
    isError,
    error,
  } = useQuery(['search', query], () => fetchMutiByQuery(query ? query : ''))
  useEffect(() => {
    if (suggestResults) {
      setSuggestions(suggestResults || [])
    }
  }, [setSuggestions, suggestResults])

  const debouncedFetchSuggestions = useCallback(
    debounce((query) => {
      dispatch(setQuery(query))
    }, 500),
    [dispatch]
  )

  useEffect(() => {
    if (query) debouncedFetchSuggestions(query)
  }, [query, debouncedFetchSuggestions])

  function handleSearch(e: { target: { value: string } }) {
    dispatch(setQuery(e.target.value))
    setIsVisible(true)
  }
  // REVIEW important to learn later
  // it will hide the searchresults when user move pointer to other place  NOTE
  const handleDocumentClick = useCallback(
    (event) => {
      // 确保event不是来源于 input 或 button
      if (!event.target.closest('#search-container')) {
        setIsVisible(false)
        setIsExpanded(false)
        onBlur()
      }
    },
    [setIsExpanded, onBlur]
  )

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick)

    return () => {
      document.removeEventListener('click', handleDocumentClick)
    }
  }, [handleDocumentClick])

  function handleKeyDown(e: { key: string }) {
    if (e.key === 'Enter') {
      searchMovie()
      setIsVisible(false)
      setIsExpanded(false)
      onBlur()
    }
  }
  function searchMovie() {
    let activeStatus = !onActiveStatus
    onStatusChange(activeStatus)
    setIsExpanded((prev) => !prev)
    if (query) {
      navigate(`/search?query=${encodeURIComponent(query)}`)
    }
  }

  if (isError) return <div>Error: {error}</div>

  return (
    <SearchBox id="search-container">
      <SearchInput>
        {/* <select>
          <option value="movie">Movie</option>
          <option value="tv">TV</option>
        </select> */}
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
          isExpanded={isExpanded}
        />
        <SearchButton onClick={searchMovie} type="submit">
          <Search />
        </SearchButton>
      </SearchInput>
      {suggestions.length > 0 && isVisible && query && (
        <SearchSuggestion>
          {isLoading ? (
            <Spinner />
          ) : (
            suggestions
              .slice(0, 12)
              .map((suggestion: suggestionProperty, index) => (
                <div key={`search-suggestion-${suggestion.id}`}>
                  <Link to={`/${suggestion.media_type}/${suggestion.id}`}>
                    <SearchSuggestionItem>
                      {suggestion?.poster_path === null ||
                      suggestion?.profile_path === null ? (
                        suggestion?.media_type !== 'person' ? (
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
                            suggestion?.poster_path
                              ? `https://image.tmdb.org/t/p/w500${suggestion?.poster_path}`
                              : `https://image.tmdb.org/t/p/w500${suggestion?.profile_path}`
                          }
                          loading="lazy"
                          decoding="async"
                        />
                      )}
                      <SearchSuggestionText>
                        <h4>
                          {suggestion?.original_title
                            ? suggestion.original_title
                            : suggestion?.original_name}
                        </h4>
                        <SuggestDetail>
                          {suggestion?.media_type !== 'person' ? (
                            <>
                              <time>
                                {suggestion?.release_date
                                  ? suggestion.release_date
                                  : suggestion?.first_air_date}
                              </time>
                              <p>{suggestion?.media_type}</p>
                            </>
                          ) : null}
                        </SuggestDetail>
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
