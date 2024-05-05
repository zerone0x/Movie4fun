import { useDispatch, useSelector } from 'react-redux'
import {
  addWatchList,
  removeWatchList,
  selectWatchList,
} from '../store/watchListSlice'
import styled from 'styled-components'
import { memo, useEffect, useState } from 'react'
import { BookmarkPlus, Check } from 'lucide-react'
import { mediaProperty } from '../utils/interface'

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

interface AddWatchBtnProps {
  movie: mediaProperty
  size?: number
}

function AddWatchBtn({ movie, size = 35 }: AddWatchBtnProps) {
  const dispatch = useDispatch()
  const watchList = useSelector(selectWatchList)
  const [inWatchList, setInWatchList] = useState(false);

  useEffect(() => {
    const isThisInWatchList = watchList.some(
      (item) => item.id === movie.id && item.backdrop_path === movie.backdrop_path
    );
    setInWatchList(isThisInWatchList);
  }, [watchList, movie]); 

  function handleAddWatchList(movie: mediaProperty) {
    if (inWatchList) {
      dispatch(removeWatchList(movie))
    } else {
      dispatch(addWatchList(movie))
    }
  }

  return (
    <AddButton
      onClick={() => handleAddWatchList(movie)}
      data-isthisinwatchlist={inWatchList.toString()}
      size={size}
      key={`watchList-btn-${movie.media_type}-${movie.id}`}
    >
      {inWatchList ? <Check /> : <BookmarkPlus />}
    </AddButton>
  )
}

export default AddWatchBtn
