import { useDispatch, useSelector } from 'react-redux'
import {
  addWatchList,
  removeWatchList,
  selectWatchList,
} from '../store/watchListSlice'
import styled from 'styled-components'
import { memo } from 'react'
import { BookmarkPlus, Check } from 'lucide-react'

const AddButton = styled.button<ButtonProps>`
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${(props) =>
    props['data-isthisinwatchlist'] === 'true' ? '#f5c518' : '#333'};
  z-index: 1000;
  color: #fff;
  border: none;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  
`
interface ButtonProps {
  'data-isthisinwatchlist': string
  size?: number
}

interface MovieProperty {
  id: number
  media_type: string
}

interface AddWatchBtnProps {
  movie: MovieProperty
  size?: number
}

interface WatchListItemProps {
  id: number
  genres: { name: string }[]
  poster_path: string
  runtime: number
  overview: string
  vote_average: number
  backdrop_path: string
  media_type: string
  original_title?: string
  original_name?: string
  release_date?: string
  first_air_date?: string
}

function AddWatchBtn({ movie, size = 35 }: AddWatchBtnProps) {
  const dispatch = useDispatch()
  const watchList = useSelector(selectWatchList)
  let isThisInWatchList = watchList.some(
    (item: WatchListItemProps) => item.id === movie.id && item.media_type === movie.media_type
  )

  function handleAddWatchList(movie: MovieProperty) {
    if (isThisInWatchList) {
      dispatch(removeWatchList(movie))
    } else {
      dispatch(addWatchList(movie))
    }
  }

  return (
    <AddButton
      onClick={() => handleAddWatchList(movie)}
      data-isthisinwatchlist={isThisInWatchList.toString()}
      size={size}
    >
      {isThisInWatchList ? <Check /> : <BookmarkPlus />}
    </AddButton>
  )
}

export default AddWatchBtn
