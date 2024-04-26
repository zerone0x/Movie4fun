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
    props.isInWatchList ? '#F5C518' : 'rgba(0, 0, 0, 0.7)'};
  z-index: 1000;
  color: #fff;
  border: none;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
`
interface ButtonProps {
  isInWatchList: boolean;
  size?: number;
}

interface MovieProperty {
  id: string;
}

interface AddWatchBtnProps {
  movie: MovieProperty;
  size?: number;  
}
function AddWatchBtn({ movie, size = 30 }: AddWatchBtnProps) {
  const dispatch = useDispatch()
  const watchList = useSelector(selectWatchList)
  const isThisInWatchList = watchList.find((item) => item.id === movie.id)
  function handleAddWatchList(movie) {
    if (isThisInWatchList) {
      dispatch(removeWatchList(movie))
    } else {
      dispatch(addWatchList(movie))
    }
  }

  return (
    <AddButton
      onClick={() => handleAddWatchList(movie)}
      isInWatchList={
        isThisInWatchList
      }
      size={size}
    >
      {watchList.find((item) => item.id === movie.id) ? '✔️' : '➕'}
    </AddButton>
  )
}

export default AddWatchBtn
