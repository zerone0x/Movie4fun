import { useSelector } from "react-redux";
import Button from "./Button"
import { selectWatchListCount } from "../store/watchListSlice";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImdb } from '@fortawesome/free-brands-svg-icons';
import SearchBar from "./SearchBar";
import styled from "styled-components";
import {Menu, User} from "lucide-react"

const TopHeader = styled.div`
  display: flex;
  gap: 2.5rem;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  padding-top: 0.5rem;
  margin-bottom: -1.5rem;
  margin-left: 1rem;
  margin-right: -1rem;
  background-color: black;
  `
const GroupBtn = styled.div`
// display: flex;
// flex-shrink: 0;

`

function Header() {
  const navigate = useNavigate();
  const watchListCount = useSelector(selectWatchListCount)
  const handleClick = () => {
    navigate('/watchlist'); 
};
  return (
    <TopHeader>
      <Menu/>
    <Link to='/'>
    <FontAwesomeIcon icon={faImdb}size="3x" height="1.5rem"/></Link>
    
    <SearchBar/>
    <GroupBtn>
    <button onClick={handleClick}>WatchList {watchListCount}</button>
    <User/>
    </GroupBtn>
    <br/>
</TopHeader>

  );
}

export default Header;