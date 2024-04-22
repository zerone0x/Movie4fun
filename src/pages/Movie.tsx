import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Movie() {
  const [movie, setMovie] = useState(null);
  let { movieId } = useParams();
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

<><p>Movie</p>
{movie? (
               <div>
                    <h1>{movie.original_title}</h1>
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.original_title} />
                    <p>{movie.overview}</p>
               </div>
            ) : (
                <p>Loading movies...</p>
            )}
</>

  );
}

export default Movie;