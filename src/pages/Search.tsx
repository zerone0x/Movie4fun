import { Link, useLocation } from 'react-router-dom'
import {  useEffect } from 'react'
import axios from 'axios'
import { useSearch } from '../data/getSearchRes'
import styled from 'styled-components'
const SearchRes = styled.ul`
  background-color: #F0F0F0;
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
height: 100vh
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
background-color: #F0F0F0;
padding: 2rem;
`
function Search() {
  interface searchProperty{
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
  
  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&api_key=${import.meta.env.VITE_API_TMDB}`
        )
        const data = await response.data
        if (data.results) {
          setSearchRes(data.results)
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchMovies()
  }, [searchRes, searchQuery, setSearchRes])

  return (
    <>
      {searchRes && searchRes.length > 0 ? (
<SearchBox>
<SearchTitle>Search "{searchQuery}"</SearchTitle>
<SearchRes>
          {searchRes.slice(0, 10).map((searchItem:searchProperty, index) => (
              <div key={`search-item-${searchItem.id}`}>
                
                <Link to={`/movie/${searchItem.id}`} >
                <SearchItem>
                {searchItem.poster_path !== 'N/A' ? (
                  <Poster
                    src={`https://image.tmdb.org/t/p/w500${searchItem.poster_path}`}
                  />
                ) : (
                  <span>No Poster</span>
                )}
                <SearchText>
                  <Title >{searchItem.original_title}</Title>
                  <span >{searchItem.release_date}</span>
                </SearchText>
                </SearchItem>
                </Link>
               
              </div>
          ))}
        </SearchRes>
</SearchBox>










      ) : (
        <p>Loading movies...</p>
      )}
    </>
  )
}

export default Search
