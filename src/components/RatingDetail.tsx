import { useDispatch, useSelector } from 'react-redux'
import Star from '../ui/Star'
import styled from 'styled-components'
import { openPopup } from '../store/PopupSlice'
import { selectRating } from '../store/ratingSlice'
import { memo } from 'react'
const RatingStar = styled.button`
background:none;
border:none;
`
const RatingBox = styled.div<RatingBoxProps>`
  display: flex;
  gap: ${(props) => props.gap}px;
  align-items: center;

`

const AverageRate = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;

`

const Score = styled.p<ScoreProps>`
  font-size: ${(props) => props.size}rem;`

interface ratingArrProps {
  id: number
  rate: number
}
interface MovieProps {
  id: number
  vote_average: number
}
interface RatingBoxProps{
  gap: number
}

interface ScoreProps {
  size: number
}

function RatingDetail({ movie, size=20, gap=10, scoreSize=1.4 }: { movie: MovieProps, size?: number, gap?: number, scoreSize?: number}) {
  const dispatch = useDispatch()
  const ratingArr = useSelector(selectRating)
  return (
    <RatingBox gap={gap}>
      <AverageRate>
        <Star size={size} color="#F5C518" full={true} />{' '}
        <Score size={scoreSize}>{movie.vote_average.toFixed(1)}</Score>
      </AverageRate>
      {ratingArr.map((item: ratingArrProps) => {
        if (item.id === movie.id) {
          return (
            <AverageRate
              key={`rating-${item.id}`}
              onClick={() => {
                dispatch(openPopup(movie))
              }}
            >
              <Star size={size} color="#5799EF" full={item?.rate !== 0} />

              <Score size={scoreSize}>{item?.rate !== 0 && item.rate}</Score>
            </AverageRate>
          )
        }
      })}
      {ratingArr.filter((item: ratingArrProps) => item.id === movie.id)
        .length === 0 && (
        <RatingStar
          onClick={() => {
            dispatch(openPopup(movie))
          }}
        >
          <Star size={size} color="#5799EF" full={false} />
        </RatingStar>
      )}
    </RatingBox>
  )
}

export default memo(RatingDetail)
