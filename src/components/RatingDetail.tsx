import { useDispatch, useSelector } from 'react-redux';
import Star from '../ui/Star'
import styled from "styled-components";
import { openPopup } from '../store/PopupSlice';
import { selectRating } from '../store/ratingSlice';
import { memo } from 'react';
const RatingStar = styled.div`
  &:hover {
    background-color: grey;
  }
`
const RatingBox = styled.div`
  display: flex;
  gap: 10px;
`

const AverageRate = styled.div`
  display: flex;
  gap: 5px;
`

interface ratingArrProps {
    id: number;
    rate: number;
}
interface MovieProps{
    id: number,
    vote_average: number
}

function RatingDetail({movie}: {movie: MovieProps}) {
    const dispatch = useDispatch()
    const ratingArr = useSelector(selectRating)
  return (
<RatingBox>
    <AverageRate>
        <Star size={20} color="#F5C518" full={true} />{' '}
        {movie.vote_average.toFixed(1)}
    </AverageRate>
    {ratingArr.map((item:ratingArrProps) => {
        if (item.id === movie.id) {
        return (
            <AverageRate
            key={`rating-${item.id}`}
            onClick={() => {
                dispatch(openPopup(movie))
            }}
            >
            <Star
                size={20}
                color="#5799EF"
                full={item?.rate !==0}
            />


            {item?.rate !== 0 && item.rate}
            </AverageRate>
        )
        }
    })}
    {ratingArr.filter((item:ratingArrProps) => item.id === movie.id).length ===
        0 && (
        <RatingStar
        onClick={() => {
            dispatch(openPopup(movie))
        }}
        >
        <Star size={20} color="#5799EF" full={false} />
        </RatingStar>
    )}
    </RatingBox>

  );
}

export default memo(RatingDetail);