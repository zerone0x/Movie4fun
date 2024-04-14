import { useSelector } from "react-redux";
import Button from "./Button"
import { selectWatchListCount } from "../store/watchListSlice";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImdb } from '@fortawesome/free-brands-svg-icons';

function Header() {
  const navigate = useNavigate();
  const watchListCount = useSelector(selectWatchListCount)
  const handleClick = () => {
    navigate('/watchlist'); 
};
  return (
    <>
    <Link to='/'>
    <FontAwesomeIcon icon={faImdb}size="3x" /></Link>
    {/* TODO add some selections */}
    <input type="search" placeholder="Search"/>
    <button onClick={handleClick}>WatchList {watchListCount}</button>
    <br/>
</>

  );
}

export default Header;