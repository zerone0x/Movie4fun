import { useDispatch, useSelector } from 'react-redux'
import {
  addWatchList,
  removeWatchList,
  selectWatchList,
} from '../store/watchListSlice'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const AddButton = styled.button`
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

function AddWatchBtn({ movie, size = 30 }) {
  const dispatch = useDispatch()
  const watchList = useSelector(selectWatchList)

  function handleAddWatchList(movie) {
    const isInWatchList = watchList.find((item) => item.id === movie.id)
    if (isInWatchList) {
      dispatch(removeWatchList(movie))
    } else {
      dispatch(addWatchList(movie))
    }
  }

  return (
    //   <Card key={index}>
    <AddButton
      onClick={() => handleAddWatchList(movie)}
      isInWatchList={
        watchList.find((item) => item.id === movie.id) !== undefined
      }
      size={size}
    >
      {watchList.find((item) => item.id === movie.id) ? '✔️' : '➕'}
    </AddButton>
    //     <Link to={`/movie/${movie.id}`}>
    //       <PosterWrapper>
    //         {movie.poster_path !== 'N/A' ? (
    //           <PosterItem src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.original_title} />
    //         ) : (
    //           <span>No Poster</span>
    //         )}
    //       </PosterWrapper>
    //     </Link>

    //   </Card>
  )
}

export default AddWatchBtn
