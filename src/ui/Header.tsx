import { useSelector } from 'react-redux'
import { selectWatchListCount } from '../store/watchListSlice'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImdb } from '@fortawesome/free-brands-svg-icons'
import SearchBar from './SearchBar'
import styled from 'styled-components'
import { Bookmark, Menu, User } from 'lucide-react'
import { useState } from 'react'

const TopHeader = styled.div`
  display: flex;
  gap: 2.5rem;
  justify-content: center;
  flex-shrink: 0;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  background-color:#121212;
  align-items: center;
 
`
const ContentContainer = styled.div`
  display: flex;
  gap: 2.5rem;
  // max-width: 1200px;
  width: 100%;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    justify-content: space-between;  // 在小屏幕上分散元素以填充更多空间
    gap: 1rem;  // 减少元素之间的间距以节省空间
    padding: 0 1rem;  // 在小屏幕上添加padding以防止内容紧贴边界
  }
`;

const GroupBtn = styled.div`
display: flex;
gap: 2.5rem;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    justify-content: end; 
    gap: 1rem;  
    padding: 0 1rem; 
  }`
const WatchListBtn = styled.button`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  gap: 0.5rem;
  height: 3.5rem;
  padding: 0.5rem 1rem;
  background-color: #121212;
  color: white;
  border: none;
  outline: none;
  border-radius: 5px;

  &:hover {
    background-color: grey;
  }

  @media (max-width: 768px) {
    padding: 0.5rem; 
    font-size: 0.9rem; 
    .menu-text{
      display: none;
      
    }
    
    
  }
`;
const WatchCount = styled.p`
  background-color: #f5c518;
  padding: 0.7rem 1rem;
  border-radius: 1rem;
  display: inline-block;
  color: #000;
  font-size: 1.2rem;
  margin: 0;
  text-align: center;
  font-weight: 600;
  @media (max-width: 768px) {
    display: none;
  }
`
const SearchItem =styled.div`
`
const ImdbIcon = styled.div`
@media (max-width: 768px) {
  order: 1;
}

`
const ResponsiveHeaderContainer = styled(ContentContainer)<ResponseHeader>`
  @media (max-width: 768px) {
    ${({ active }) => active && `
      ${WatchListBtn}, ${ImdbIcon} {
        display: none;
      }
      ${SearchItem} {
        width: 100%;
      }
    `}
  }
`;

const IconGroup = styled.div`
display: flex;
gap: 2.5rem;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    justify-content: start; 
    gap: 1rem;  
    padding: 0 1rem;  
  }

`


interface ResponseHeader{
  active: boolean;

}
function Header() {
  const navigate = useNavigate()
  const watchListCount = useSelector(selectWatchListCount)
  
  const handleClick = () => {
    navigate('/watchlist')
  }
  const [isActive, setIsActive] = useState(false);
  const handleSearchFocus = () => {
    setIsActive(true);
  };
  const handleSearchBlur = () => {
    setIsActive(false);
  };
  return (
    <TopHeader>
      <ResponsiveHeaderContainer active={isActive}>
        <IconGroup>
      <ImdbIcon >
      <Link to="/">
          
          <FontAwesomeIcon  icon={faImdb} size="3x" height="1.5rem" />
          
        </Link></ImdbIcon>
        <WatchListBtn className="imdb-icon"  >
          <Menu />  <span className="menu-text">Menu</span>
        </WatchListBtn>
        </IconGroup>

        <GroupBtn>
        <SearchItem>
        <SearchBar 
        onFocus={handleSearchFocus} 
        onBlur={handleSearchBlur}
        onActiveStatus={isActive}
        onStatusChange={setIsActive}
        />
        </SearchItem>
       
          <WatchListBtn onClick={handleClick}>
            <Bookmark /> <span className="menu-text">WatchList</span> 
             <WatchCount>{watchListCount}</WatchCount>
          </WatchListBtn>
          {/* <User/> */}
        </GroupBtn>
        <br />
      </ResponsiveHeaderContainer>
    </TopHeader>
  )
}

export default Header
