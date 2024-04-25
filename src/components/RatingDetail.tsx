import { useDispatch, useSelector } from 'react-redux';
import Star from '../ui/Star'
import styled from "styled-components";
import { openPopup } from '../store/PopupSlice';
import { selectRating } from '../store/ratingSlice';
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
function RatingDetail({movie}) {
    const dispatch = useDispatch()
    const ratingArr = useSelector(selectRating)
  return (
<RatingBox>
    <AverageRate>
        <Star size={20} color="#F5C518" full={true} />{' '}
        {movie.vote_average.toFixed(1)}
    </AverageRate>
    {ratingArr.map((item) => {
        if (item.id === movie.id) {
        return (
            <AverageRate
            key={item.id}
            onClick={() => {
                dispatch(openPopup(movie))
            }}
            >
            <Star
                size={20}
                color="#128BB5"
                full={item?.rate != 0}
            />


            {item?.rate != 0 && item.rate}
            </AverageRate>
        )
        }
    })}
    {ratingArr.filter((item) => item.id === movie.id).length ===
        0 && (
        <RatingStar
        onClick={() => {
            dispatch(openPopup(movie))
        }}
        >
        <Star size={20} color="#128BB5" full={false} />
        </RatingStar>
    )}
    </RatingBox>

  );
}

export default RatingDetail;