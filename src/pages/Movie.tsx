import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddWatchBtn from "../ui/AddWatchBtn";
import styled from "styled-components";

// TODO:
// details of the movie
// genres
// vote_average
// imdb_id
const MovieDetail = styled.div`
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 1) 100%);
  padding: 4rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex:1;
`;
const MovieBox = styled.div`
max-width: 1200px;
margin: 0 auto;
  `
const PosterAdd = styled.div`
position: relative;
`
const PosterItem = styled.img`
width: 300px;
height: 400px;
`
const GenreList = styled.ul`
display: flex;
flex-wrap: wrap;
gap: 0.5rem;

& li {
  list-style: none;
  background-color: rgba(0, 0, 0, 0.3);
  padding: 0.5rem;
  border-radius: 0.5rem;
  color: white;
  & a {
    color: #F5C518;
  }
  &::after {
    content: ' ';
  }
}

`
function Movie() {
  const [movie, setMovie] = useState(null);
  let { movieId } = useParams();
  console.log(movie)
  useEffect(()=>{
    const fetchThisMovie = async()=>{
      if(!movieId) return;
      try{
        const response= await axios.get('https://api.themoviedb.org/3/movie/'+movieId+'?language=en-US&api_key=dcd345ec48e9703490f93056cc03c057')
        const data = response.data;
        setMovie(data)
        
      }catch(error){
        console.error('Failed to fetch movie:', error)
  
      }
    }
    fetchThisMovie()
  }, [movieId])
  

  return (

<>
{movie? (
               <MovieDetail>
                <MovieBox>
                
                    <h1>{movie.original_title}</h1>
            <GenreList>
            <li><a href={`https://www.imdb.com/title/${movie.imdb_id}`}>IMDB</a></li>
               {movie.genres.map((genre, index) => (
                    <li key={index}>{genre.name}</li>
                ))}
    
            </GenreList>
                    <p>Rating: {movie.vote_average}</p>
                    
                    <p>Release Date: {movie.release_date}</p>
                    <p>Runtime: {movie.runtime} minutes</p>
                    <p>Your Rate:</p>
                    <PosterAdd>
                    <AddWatchBtn movie={movie} size={40}/>
                    <PosterItem src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.original_title} />
                    </PosterAdd>
                    <p>{movie.overview}</p>
                    </MovieBox>
               </MovieDetail>
            ) : (
                <p>Loading movies...</p>
            )}
</>

  );
}

export default Movie;