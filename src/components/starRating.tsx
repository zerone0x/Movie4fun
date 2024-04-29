import { memo, useState } from 'react'
import ratingSlice, { selectRating, setRating } from '../store/ratingSlice'

import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { selectHoverRate, setHoverRate } from '../store/PopupSlice'
const TextStyle = styled.p`
font-size: 18px;
color: blue,
margin:0;`

const RateBox = styled.div`
  display: flex;
  align-items: center;
`
interface ratingArrProps {
  id: number;
  rate: number;
}
interface StarRatingProps {
  id: number;
  maxRating?: number;
  color?: string;
  size?: number;
}
function StarRating({ id, maxRating = 5, color = '#F5C518', size = 24 }: StarRatingProps) {
  const ratingArr = useSelector(selectRating)
  let rating = 0
  const dispatch = useDispatch()
  ratingArr.forEach((item: ratingArrProps) => {
    if (item.id === id) {
      rating = item.rate
    }
  })

  const CacheRate = useSelector(selectHoverRate)
  const [HoverRate, setHoverRating] = useState(0)

  return (
    <>
   
      <RateBox>
      
        {Array.from({ length: maxRating }).map((_, index) => (
          <Star
            key={`star-${index}`}
            onRate={() => dispatch(setHoverRate(index + 1))}
            size={size}
            onHoverIn={() => setHoverRating(index + 1)}
            onHoverOut={() => setHoverRating(0)}
            color={color}
            full={index + 1 <= (HoverRate || CacheRate || rating)}
          />
        ))}
         <TextStyle color={color}>
          {HoverRate ? HoverRate : CacheRate || rating || '?'}
        </TextStyle>
      </RateBox>
    </>
  )
}
interface StarProps {
  onRate: () => void;
  onHoverIn: () => void;
  onHoverOut: () => void;
  size: number;
  color: string;
  full: boolean;
}
function Star({ onRate, size, onHoverIn, onHoverOut, color, full }: StarProps) {
  const starStyle = {
    width: `${size}px`,
    height: `${size}px`,
    display: 'block',
    cursor: 'pointer',
  }

  return (
    <span
      onClick={onRate}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
      style={starStyle}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill={full ? color : 'grey'}
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    </span>
  )
}

export default (StarRating)
