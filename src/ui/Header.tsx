import { useSelector } from 'react-redux'
import { selectWatchListCount } from '../store/watchListSlice'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import SearchBar from './SearchBar'
import styled from 'styled-components'
import { Bookmark, Clapperboard, Menu, User, Video } from 'lucide-react'
import { useState } from 'react'

const TopHeader = styled.div`
  display: flex;
  gap: 2.5rem;
  justify-content: center;
  flex-shrink: 0;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  background-color: #121212;
  align-items: center;
`
const ContentContainer = styled.div`
  display: flex;
  gap: 2.5rem;
  width: 100%;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 768px) {
    justify-content: space-between;
    gap: 1rem;
  flex-grow: 1;
  //   // padding: 0 1rem; 
  
  // }
`

const GroupBtn = styled.div`
  display: flex;
  gap: 2.5rem;
  

  @media (max-width: 768px) {
    justify-content: end;
    gap: 1rem;
    padding: 0 1rem;
    margin-left: auto;
  }
`
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

const ImdbIcon = styled.button`
height: 3.5rem;
padding: 0.5rem 1rem;
background-color: #121212;
color: white;
border: none;
border-radius: 5px;
&:hover {
  background-color: grey;
}
  @media (max-width: 768px) {
    order: 1;
    padding: 0.5rem;
  }
`
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
  border-radius: 5px;

  &:hover {
    background-color: grey;
  }

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
    .menu-text {
      display: none;
    }
  }
`
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

  // @media (max-width: 768px) {
  //   display: none;

  // }
`
const SearchItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;

  @media (max-width: 768px) {
    width: 100%;
  }
`




const ResponsiveHeaderContainer = styled(ContentContainer)<ResponseHeader>`
  @media (max-width: 768px) {
    ${({ active }) =>
      active &&
      `
      ${WatchListBtn}, ${ImdbIcon}, ${IconGroup}{
        display: none;
      }
      ${SearchItem} {
        width: 100%;
      }
      ${GroupBtn} {
        flex-grow: 1;
      }
    `}
  }
`

interface ResponseHeader {
  active: boolean
}
function Header() {
  const navigate = useNavigate()
  const watchListCount = useSelector(selectWatchListCount)

  const handleClick = () => {
    navigate('/watchlist')
  }
  const [isActive, setIsActive] = useState(false)
  const handleSearchFocus = () => {
    setIsActive(true)
  }
  const handleSearchBlur = () => {
    setIsActive(false)
  }
  return (
    <TopHeader>
      <ResponsiveHeaderContainer active={isActive}>
        <IconGroup>
          <ImdbIcon>
            <Link to="/">
              <Clapperboard />
            </Link>
          </ImdbIcon>
          <WatchListBtn className="imdb-icon">
            <Menu /> <span className="menu-text">Menu</span>
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
