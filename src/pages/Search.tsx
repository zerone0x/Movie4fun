import { useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectQuery, setQuery } from "../store/querySlice";
import axios from "axios";
import Poster from "../components/poster";
import { useSearch } from "../data/getSearchRes";



function Search() {
    const {searchRes, setSearchRes} = useSearch()
    const location = useLocation();
    const searchQuery = new URLSearchParams(location.search).get('query');
    const query = useSelector(selectQuery)
    // TODO the query could be removed 


    useEffect(()=>{
        async function fetchMovies(){
        try{
            const response = await axios.get('http://www.omdbapi.com/?apikey=f84fc31d&s='+searchQuery)
            const data = await response.data
            if (data.Search){
                setSearchRes(data.Search)
            }
        }catch(error){
            console.error(error)
        }
        }
        fetchMovies()
    }, [query, searchRes])


console.log('searchres',searchRes)

  return (<>
<p>boniu</p>
{searchRes && searchRes.length > 0 ? (
                <Poster movies={searchRes} />
            ) : (
                <p>Loading movies...</p>
            )}
</>
  );
}

export default Search;