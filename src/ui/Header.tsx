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
  `
const GroupBtn = styled.div`


`
const WatchListBtn = styled.button`
display: flex;
flex-shrink: 0;
height: 3.5rem;
padding-left: 1rem;
padding-right: 1rem;
padding-top: 0.5rem;
border-radius: 5px;
background-color: #f5c518;
color: #000;


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
    <WatchListBtn onClick={handleClick}>WatchList {watchListCount}</WatchListBtn>
    {/* <User/> */}
    </GroupBtn>
    <br/>
</TopHeader>

  );
}

export default Header;