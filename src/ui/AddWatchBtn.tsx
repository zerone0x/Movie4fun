import { useDispatch, useSelector } from 'react-redux'
import {
  addWatchList,
  removeWatchList,
  selectWatchList,
} from '../store/watchListSlice'
import styled from 'styled-components'

const AddButton = styled.button<ButtonProps>`
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${(props) =>
    props.isThisInWatchList ? '#F5C518' : 'rgba(0, 0, 0, 0.7)'};
  z-index: 1000;
  color: #fff;
  border: none;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
`
interface ButtonProps {
  isThisInWatchList: boolean | undefined;
  size?: number;
}

interface MovieProperty {
  id: number;
}

interface AddWatchBtnProps {
  movie: MovieProperty;
  size?: number;  
}

interface WatchListItemProps {
  id: number;
}


function AddWatchBtn({ movie, size = 30 }: AddWatchBtnProps) {
  const dispatch = useDispatch()
  const watchList = useSelector(selectWatchList)
  const isThisInWatchList = watchList.find((item:WatchListItemProps) => item.id === movie.id)
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
      isThisInWatchList={isThisInWatchList}
      size={size}
    >
      {isThisInWatchList ? '✔️' : '➕'}
    </AddButton>
  )
}

export default AddWatchBtn
