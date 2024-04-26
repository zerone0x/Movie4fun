import styled from "styled-components";
import AddWatchBtn from "../ui/AddWatchBtn";
import { Link } from "react-router-dom";
const Poster = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`
const PosterWrapper = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height}px;
  // max-height: ${(props) => props.height}px;
`
const Card = styled.div`
  position: relative;
  // background: #1a1a1a;
  // margin-right: 20px;
  max-width: 200px;
`
function PosterPic({movie, height =200, width='100px'}) {
  return (
<Card >
            <AddWatchBtn movie={movie} />
            <Link to={`/movie/${movie.id}`}>
              <PosterWrapper height={height} width={width} >
                {movie.poster_path !== 'N/A' ? (
                  <Poster
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.original_title}
                  />
                ) : (
                  <span>No Poster</span>
                )}
              </PosterWrapper>
            </Link>
            </Card>

  );
}

export default PosterPic;