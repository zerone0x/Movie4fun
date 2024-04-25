import styled from "styled-components";
import StarRating from "../components/starRating";

const ModalBox = styled.div`

`
const ModalContainer = styled.div`
`

function RatePopup({movie, setIsOpen}) {
    // TODO add css for the popup 
  return (
<ModalBox >
    <button onClick={()=>setIsOpen(false)}>X</button>
    <h1>Rating</h1>

<ModalContainer>
<StarRating id={movie.id} />
<button>Remove Rating</button>
</ModalContainer>
</ModalBox>

  );
}

export default RatePopup;