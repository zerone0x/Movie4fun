import { useSelector } from "react-redux";
import Button from "./Button"
import { selectWatchListCount } from "../store/watchListSlice";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImdb } from '@fortawesome/free-brands-svg-icons';
import SearchBar from "./SearchBar";
import styled from "styled-components";
import {Bookmark, Menu, User} from "lucide-react"

const TopHeader = styled.div`
  display: flex;
  gap: 2.5rem;
  justify-content: center;
  flex-shrink: 0;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  background-color: var(--color-grey-900);
  align-items: center;

  `
  const ContentContainer = styled.div`
  display: flex;
  gap: 2.5rem;
  max-width: 1200px; 
  width: 100%;
  align-items: center;
  justify-content: center;
`;
const GroupBtn = styled.div`


`
const WatchListBtn = styled.button`
display: flex;
flex-shrink: 0;
align-items: center;
gap: 0.5rem;
height: 3.5rem;
padding: 0.5rem 1rem;
background-color: var(--color-grey-900);
color: white;
border: none;
outline: none;
border-radius: 5px;
&:hover {
  background-color: grey;}
  
`
const WatchCount = styled.p`
background-color: #F5C518;
padding: 0.7rem 1rem;
border-radius: 1rem;
display: inline-block;
color: #000; 
font-size: 1.2rem; 
margin: 0; 
text-align: center; 
font-weight: 600;

`

function Header() {
  const navigate = useNavigate();
  const watchListCount = useSelector(selectWatchListCount)
  const handleClick = () => {
    navigate('/watchlist'); 
};
  return (
    <TopHeader>
      <ContentContainer>
    <Link to='/'>
    <FontAwesomeIcon icon={faImdb}size="3x" height="1.5rem"/></Link>
    <WatchListBtn><Menu/> Menu</WatchListBtn>
    <SearchBar/>
    <GroupBtn>
    <WatchListBtn onClick={handleClick}><Bookmark />WatchList <WatchCount>{watchListCount}</WatchCount></WatchListBtn>
    {/* <User/> */}
    </GroupBtn>
    <br/></ContentContainer>
</TopHeader>

  );
}

export default Header;