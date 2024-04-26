import styled from 'styled-components'

const FooterCopy = styled.p`
  font-size: 12px;
`
const FooterList = styled.ul`
  font-size: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-items: center;
  gap: 1rem;
`
const FooterItem = styled.li`
  display: flex;
  gap: 1rem;
  flex: 1;
`
const FooterBox = styled.div`
  // display: flex;
  // flex:1;
  // flex-direction: column;
  // align-items: center;
  // gap: 1rem;
  background-color: black;
  text-align: center;
  padding: 1rem;
  // height: 100px;
  // position: fixed;
  // bottom: 0;
`

function Footer() {
  return (
    <FooterBox>
      <FooterList>
        <FooterItem>Help SiteIndex IMDBPro Box</FooterItem>
        <FooterItem>Office Mojo IMDb Developer Press Room</FooterItem>
      </FooterList>
      <FooterCopy>© 2024 by potato.com, Inc.</FooterCopy>
    </FooterBox>
  )
}

export default Footer
