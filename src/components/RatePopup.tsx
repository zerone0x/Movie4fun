import styled from "styled-components";
import StarRating from "./starRating";
import { useDispatch, useSelector } from "react-redux";
import { selectRating, setRating } from "../store/ratingSlice";
import { closePopup, selectHoverRate, selectIsOpen, selectSelectedMovie, setHoverRate } from "../store/PopupSlice";
import { selectMovie } from "../store/movieSlice";

const Btn = styled.button`
padding: 0.5rem 1rem;
color: white;
border: none;
outline: none;
border-radius: 5px;
background-color: ${props => props.isActive ? '#F5C518' : '#333'};

// &:hover {
//   background-color: grey;}
  padding: 8px 16px;
  font-size: 16px;
  margin-top: 10px;

  &:first-child { 
    position: absolute;
    top: 10px;
    right: 10px;
    color: white;
    font-size: 24px;
    border-radius: 50%;

  }`
const ModalBox = styled.div`
position: fixed;             /* 固定位置，无论页面如何滚动，弹窗位置固定 */
top: 50%;                    /* 顶部距离视口50% */
left: 50%;                   /* 左侧距离视口50% */
transform: translate(-50%, -50%); /* 使用transform偏移，确保弹窗中心在视口中心 */
width: 80%;                  /* 弹窗宽度为视口宽度的80% */
max-width: 400px;            /* 弹窗的最大宽度为400px */
background-color: #333;      /* 背景颜色为深灰色 */
padding: 20px;               /* 内部填充20px */
border-radius: 10px;         /* 边角圆滑度为10px */
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 设置阴影，模拟浮动效果 */
z-index: 1000;               /* 高层级，确保覆盖其他内容 */
`;
const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px; // space between items
`;
const Overlay = styled.div`
position: fixed;             /* 固定位置，覆盖整个视口 */
top: 0;                      /* 顶部对齐 */
left: 0;                     /* 左侧对齐 */
width: 100vw;                /* 宽度为100%的视口宽度 */
height: 100vh;               /* 高度为100%的视口高度 */
background-color: rgba(0, 0, 0, 0.5); /* 半透明黑色背景 */
z-index: 999;                /* 确保在内容之上，但在弹窗下面 */
`
const RateText = styled.span`
color: #F5C518;
`
function RatePopup() {
    const dispatch = useDispatch();
    const isOpen = useSelector(selectIsOpen);
    const selectedMovie = useSelector(selectSelectedMovie)
    const MovieID = selectedMovie?.id
    const HoverRate = useSelector(selectHoverRate)
    const ratingArr = useSelector(selectRating);
    let rating = 0;
    ratingArr.forEach((item) => {
        if(item.id === MovieID){
            rating = item.rate
        }
    }
    )
    console.log(ratingArr)


    function setRate(value:number){
        dispatch(setRating({rate:value, id:MovieID}))
        dispatch(setHoverRate(0))
        dispatch(closePopup())
    }
    function handleRate(){
      dispatch(setRating({rate:HoverRate, id:MovieID}))
      dispatch(setHoverRate(0))
      dispatch(closePopup())
    }
    function isBtnDisabled(){
      if(!HoverRate ){
        return true
      }

   
    }
    return (
      <>
        {isOpen && selectedMovie ? (
          <>
            <Overlay onClick={() => dispatch(closePopup())} />
            <ModalBox>
              <Btn onClick={() => dispatch(closePopup())}>X</Btn>
              <ModalContainer>
                <RateText>RATE THIS</RateText>
                <h2>{selectedMovie.original_title}</h2>
                <StarRating id={selectedMovie.id} maxRating={10} color="#128BB5"/>
                <Btn disabled={isBtnDisabled()} isActive={true}  onClick={()=> {handleRate()}}>Rate</Btn>
                {rating !=0 &&<Btn isActive={false} onClick={() => setRate(0)}>Remove Rating</Btn>}
               
              </ModalContainer>
            </ModalBox>
          </>
        ): null}
      </>
    );
}
export default RatePopup;