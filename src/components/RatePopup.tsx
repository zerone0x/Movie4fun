import styled from 'styled-components'
import StarRating from './starRating'
import { useDispatch, useSelector } from 'react-redux'
import { selectRating, setRating } from '../store/ratingSlice'
import {
  closePopup,
  selectHoverRate,
  selectIsOpen,
  selectSelectedMovie,
  setHoverRate,
} from '../store/PopupSlice'
import { X } from 'lucide-react'

const Btn = styled.button<ButtonProp>`
  background: #f5c518;
  padding: 0.5rem 1rem;
  color: ${(props) => (props.isActive ? '#000' : 'white')};
  font-size: 1rem;
  border: none;  // outline: none;
  border-radius: 5px;
  background-color: ${(props) => (props.isActive ? '#F5C518' : '#333')};

  padding: 8px 16px;
  font-size: 16px;
  margin-top: 10px;
`
const CloseBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  color: white;
  font-size: 24px;
  border-radius: 50%;
  padding: 8px 16px;
  margin-top: 10px;
  border: none;
  background-color: #333;
`
const ModalBox = styled.dialog`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  max-width: 400px;
  background-color: #333;
  padding: 20px;
  border-radius: 10px;
  z-index: 1000;
  border: none;
`
const ModalContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  h2 {
    color: white;
    font-size: 2.5rem;
  }
`
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`
const RateText = styled.span`
  color: #f5c518;
  font-size: 1.4rem;
`
interface ButtonProp {
  isActive: boolean
}
interface ratingProp {
  id: number
  rate: number
}

function RatePopup() {
  const dispatch = useDispatch()
  const isOpen = useSelector(selectIsOpen)
  const selectedMovie = useSelector(selectSelectedMovie)
  const MovieID = selectedMovie?.id
  const HoverRate = useSelector(selectHoverRate)
  const ratingArr = useSelector(selectRating)
  let rating = 0

  ratingArr.forEach((item: ratingProp) => {
    if (item.id === MovieID) {
      rating = item.rate
    }
  })

  function setRate(value: number) {
    dispatch(setRating({ rate: value, id: MovieID }))
    dispatch(setHoverRate(0))
    dispatch(closePopup())
  }
  function handleRate(e: any) {
    e.preventDefault()
    dispatch(setRating({ rate: HoverRate, id: MovieID }))
    dispatch(setHoverRate(0))
    dispatch(closePopup())
  }
  function isBtnDisabled() {
    if (!HoverRate) {
      return true
    }
  }

  return (
    <>
      {selectedMovie ? (
        <>
        {/* todo note  learn this  */}
          <Overlay onClick={() => dispatch(closePopup())} />
          <ModalBox open={isOpen}>
            <ModalContainer >
            <CloseBtn onClick={() => dispatch(closePopup())}><X/></CloseBtn>
              <RateText>RATE THIS</RateText>
              <h2>{selectedMovie.original_title ? selectedMovie.original_title : selectedMovie.original_name}</h2>
              <StarRating
                id={selectedMovie.id}
                maxRating={10}
                color="#5799EF"
              />
              <Btn
                type="submit"
                disabled={isBtnDisabled()}
                isActive={true}
                onClick={(e) => {
                  handleRate(e)
                }}
              >
                Rate
              </Btn>
              {rating !== 0 && (
                <Btn isActive={false} onClick={() => setRate(0)} type="submit">
                  Remove Rating
                </Btn>
              )}
            </ModalContainer>
          </ModalBox>
        </>
      ) : null}
    </>
  )
}
export default RatePopup
