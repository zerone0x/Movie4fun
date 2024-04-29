import { useDispatch, useSelector } from 'react-redux'
import {
  addWatchList,
  removeWatchList,
  selectWatchList,
} from '../store/watchListSlice'
import styled from 'styled-components'
import { memo } from 'react'

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
}

interface AddWatchBtnProps {
  movie: MovieProperty
  size?: number
}

interface WatchListItemProps {
  id: number
  original_title: string
  poster_path: string
  genres: { name: string }[]
  overview: string
  runtime: number
}

function AddWatchBtn({ movie, size = 30 }: AddWatchBtnProps) {
  const dispatch = useDispatch()
  const watchList = useSelector(selectWatchList)
  let isThisInWatchList = watchList.some(
    (item: WatchListItemProps) => item.id === movie.id
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
      {isThisInWatchList ? '✔️' : '➕'}
    </AddButton>
  )
}

export default AddWatchBtn
