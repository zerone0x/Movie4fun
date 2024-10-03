import { useEffect } from 'react'
import { X } from 'lucide-react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`

const SideBarContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000; /* Above the overlay */
  background-color: #000;
  font-size: 11rem;
  @media (max-width: 768px) {
    font-size: 7rem;
  }
`

const NavContainer = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`

const CloseBtn = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #fff;
`

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

const NavItem = styled.li`
  margin: 1rem 0;
`

const NavLink = styled(Link)`
  text-decoration: none;
  color: #fff;

  &:hover {
    color: #f5c518;
  }
`

function SideBar({
  isSideBarActive,
  setIsSideBarActive,
}: {
  isSideBarActive: boolean
  setIsSideBarActive: (isSideBarActive: boolean) => void
}) {
  useEffect(() => {
    if (isSideBarActive) {
      document.body.classList.add('no-scroll')
    } else {
      document.body.classList.remove('no-scroll')
    }

    return () => {
      document.body.classList.remove('no-scroll')
    }
  }, [isSideBarActive])

  return (
    <AnimatePresence>
      {isSideBarActive && (
        <>
          <Overlay
            onClick={() => setIsSideBarActive(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <SideBarContainer
            initial={{ x: '-100%' }}
            animate={{ x: '0%' }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween' }}
          >
            <CloseBtn onClick={() => setIsSideBarActive(false)}>
              <X />
            </CloseBtn>
            <NavContainer>
              <NavList>
                <NavItem>
                  <NavLink to="/" onClick={() => setIsSideBarActive(false)}>
                    Home
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    to="/watchlist"
                    onClick={() => setIsSideBarActive(false)}
                  >
                    Watch List
                  </NavLink>
                </NavItem>
              </NavList>
            </NavContainer>
          </SideBarContainer>
        </>
      )}
    </AnimatePresence>
  )
}

export default SideBar
