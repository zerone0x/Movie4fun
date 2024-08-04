import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import styled from 'styled-components'
import RatePopup from '../components/RatePopup'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setQuery } from '../store/querySlice'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"

const Main = styled.main`
  background-color: white;
  color: white;
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 100vh;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  // max-width: 1300px;
  // margin: 0 auto;
  // align-items: stretch;
  flex: 1;
  // height: 100%;

  width: 100%;
`

function AppLayout() {
  const location = useLocation()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setQuery(''))
  }, [location, dispatch])

  return (
    <Main>
      <Header></Header>
      <Content>
        <Outlet />
      </Content>
      <RatePopup />

      <Footer></Footer>
      <Analytics />
          <SpeedInsights />
    </Main>
  )
}

export default AppLayout
