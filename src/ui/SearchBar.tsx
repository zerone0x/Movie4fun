import { Link, useLocation, useNavigate } from "react-router-dom";
import GetMovie from "../services/GetMovie";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectQuery, setQuery } from "../store/querySlice";
import { debounce } from 'lodash';
import axios from "axios";



function SearchBar() {
const dispatch = useDispatch()
const query = useSelector(selectQuery)
const navigate = useNavigate();
const [suggestions, setSuggestions] = useState([])
const fetchSuggestions = async (query) => {
    if(!query) return;
    try{
        const response = await axios.get(`http://www.omdbapi.com/?apikey=f84fc31d&s=${query}`);
        const data = response.data;
        setSuggestions(data.Search || []);
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
}

function handleKeyDown(e){
    if (e.key === 'Enter') {
        navigate(`/search?query=${encodeURIComponent(query)}`);
      }
    }


  return (
    <>
    <input type="search" 
    onKeyDown={(e)=>{handleKeyDown(e)}}
    placeholder="Search movie" value={query} onChange={(e)=> {handleSearch(e)}}/>
    {suggestions.length > 0 && (
        <ul>
            {suggestions.map((suggestion, index) => (
                <Link to ={`/movie/${suggestion.imdbID}`}>
                <li key={index}>{suggestion.Title}</li></Link>
                // TODO link to movie detail 
            ))}
        </ul>
    )}
</>
  );
}

export default SearchBar;