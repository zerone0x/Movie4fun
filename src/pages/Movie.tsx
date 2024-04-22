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
        const response= await axios.get('http://www.omdbapi.com/?apikey=cfb2ee9c&i='+movieId)
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
                    <h1>{movie.Title}</h1>
                    <img src={movie.Poster} alt={movie.Title} />
                    <p>{movie.Plot}</p>
               </div>
            ) : (
                <p>Loading movies...</p>
            )}
</>

  );
}

export default Movie;