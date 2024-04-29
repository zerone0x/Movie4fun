import { useSelector } from 'react-redux'
import { selectWatchListCount } from '../store/watchListSlice'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImdb } from '@fortawesome/free-brands-svg-icons'
import SearchBar from './SearchBar'
import styled from 'styled-components'
import { Bookmark, Menu, User } from 'lucide-react'

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
  max-width: 1200px;
  width: 100%;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    justify-content: space-between;  // 在小屏幕上分散元素以填充更多空间
    padding: 0 1rem;  // 在小屏幕上添加padding以防止内容紧贴边界
  }
`;

const GroupBtn = styled.div``
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
    padding: 0.5rem; // 减少padding以节省空间
    font-size: 0.9rem; // 减小字体大小以适应小屏幕
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
`
const SearchItem =styled.div`
`
const ImdbIcon = styled.div``
const ResponsiveHeaderContainer = styled(ContentContainer)`
  @media (max-width: 768px) {
    &:focus-within ${WatchListBtn}, &:focus-within ${ImdbIcon}{
      display: none;
    }

    &:focus-within ${SearchItem} {
      width: 100%;
    }
  }
`;

function Header() {
  const navigate = useNavigate()
  const watchListCount = useSelector(selectWatchListCount)
  
  const handleClick = () => {
    navigate('/watchlist')
  }
  return (
    <TopHeader>
      <ResponsiveHeaderContainer>
      <ImdbIcon>
      <Link to="/">
          
          <FontAwesomeIcon icon={faImdb} size="3x" height="1.5rem" />
          
        </Link></ImdbIcon>
        <WatchListBtn>
          <Menu /> Menu
        </WatchListBtn>
        <SearchItem>
        <SearchBar />
        </SearchItem>
        <GroupBtn>
          <WatchListBtn onClick={handleClick}>
            <Bookmark />
            WatchList <WatchCount>{watchListCount}</WatchCount>
          </WatchListBtn>
          {/* <User/> */}
        </GroupBtn>
        <br />
      </ResponsiveHeaderContainer>
    </TopHeader>
  )
}

export default Header
