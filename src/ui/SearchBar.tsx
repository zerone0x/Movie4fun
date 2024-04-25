import { Link, useLocation, useNavigate } from "react-router-dom";
import GetMovie from "../services/GetMovie";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectQuery, setQuery } from "../store/querySlice";
import { debounce } from 'lodash';
import axios from "axios";
import {Search} from "lucide-react"
import styled from "styled-components";

const SearchSuggestion = styled.ul`
position: absolute;
background-color: #333;
color: white;
display: flex;
flex-direction: column;
z-index: 1000;
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
&:hover{
    background-color: grey;
    cursor: pointer;
}
`
const SearchSuggestionText = styled.div`
display: flex;
flex-direction: column;
`
const SearchButton = styled.button`
    padding-top: 0.5rem; padding-bottom: 0.5rem;
    padding-left: 1rem; padding-right: 1rem;
    border-radius: 0 5px 5px 0;
    flex-shrink: 0;
    color: grey;
    background-color: white;
    border: none;
    outline: none;
    &:focus{
        outline: 2px solid #DEB522;
    }
`
const SearchBox = styled.div`
&:focus{
    outline: 2px solid #DEB522;
}
`
const SearchInput = styled.div`
display: flex;
flex-grow: 1;
max-width:600px;
color: black;
&:focus{
    outline: 2px solid #DEB522;
}
`
const SearchTxt = styled.input`
border-top-left-radius: 5px; 
padding: 0.5rem 1rem;
border-bottom-left-radius: 5px;
line-height: 1.75rem;
width: 100%;
border-right: none;
@media (max-width: 600px) { 
display: none;
}
`
function SearchBar() {
const dispatch = useDispatch()
const query = useSelector(selectQuery)
const navigate = useNavigate();
const [suggestions, setSuggestions] = useState([])
const [isVisible, setIsVisible] = useState(false);
const fetchSuggestions = async (query) => {
    if(!query) return;
    try{
        const response = await axios.get('https://api.themoviedb.org/3/search/movie?query='+query+'&api_key=dcd345ec48e9703490f93056cc03c057');
        const data = response.data;
        setSuggestions(data.results || []);
        console.log(data.results)
    }catch(error){
        console.error("Failed to fetch suggestions:", error);
        setSuggestions([]);
    }
}
const debouncedFetchSuggestions = debounce(fetchSuggestions, 300);
useEffect(() => {
    debouncedFetchSuggestions(query);
}, [query]);

function handleSearch(e){
    dispatch(setQuery(e.target.value))
    setIsVisible(true);
}
// it will hide the searchresults when user move pointer to other place  NOTE
const handleDocumentClick = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

function handleKeyDown(e){
    if (e.key === 'Enter') {
        searchMovie()
      }
    }
function searchMovie(){
    navigate(`/search?query=${encodeURIComponent(query)}`);
}

  return (
    <SearchBox>
    <SearchInput>
    <SearchTxt type="search" 
    onKeyDown={(e)=>{handleKeyDown(e)}}
    placeholder="Search" value={query} onChange={(e)=> {handleSearch(e)}}/>
    <SearchButton onClick={searchMovie}><Search/></SearchButton>
    </SearchInput>
    {suggestions.length > 0 && isVisible &&  query && (
        <SearchSuggestion >
            {suggestions.slice(0,10).map((suggestion, index) => (
                <Link to ={`/movie/${suggestion.id}`}>
                <SearchSuggestionItem>
                    {suggestion.poster_path !== 'N/A' ? (
                  <Poster src={`https://image.tmdb.org/t/p/w500${suggestion.poster_path}`}  />
                ) : (
                  <span>No Poster</span>
                )}
                <SearchSuggestionText>
                <span key={index}>{suggestion.original_title}</span>
                <span key={index}>{suggestion.release_date}</span>
                </SearchSuggestionText>
                </SearchSuggestionItem>
                </Link>
            ))}
        </SearchSuggestion>
    )}
</SearchBox>
  );
}

export default SearchBar;