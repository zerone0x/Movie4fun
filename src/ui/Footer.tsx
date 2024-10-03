import { Github } from 'lucide-react'
import { memo } from 'react'
import styled from 'styled-components'

const FooterCopy = styled.p`
  font-size: 16px;
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
  display: flex;
  // flex:1;
  // flex-direction: column;
  justify-content: center;
  align-items: center;
  // gap: 1rem;
  background-color: black;
  text-align: center;
  padding: 1rem;
  z-index: 1;
  height: 100px;
  position: sticker;
  bottom: 0;
  min-width: 100%;
`
const FooterLink = styled.a`
  color: #f5c518;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`

function Footer() {
  return (
    <FooterBox>
      {/* <FooterList>
        <FooterItem>Help SiteIndex Movie4Fun Box</FooterItem>
        <FooterItem>Office Mojo Movie4Fun Developer Press Room</FooterItem>
      </FooterList> */}
      <FooterCopy>
        Made by{' '}
        <FooterLink href="https://github.com/zerone0x" target="_blank">
          zerone0x
        </FooterLink>{' '}
        all rights reserved 💚
      </FooterCopy>
      {/* <Github size={20} /> */}
    </FooterBox>
  )
}

export default memo(Footer)
