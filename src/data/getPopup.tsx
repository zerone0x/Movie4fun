import { createContext, useContext, useState } from 'react'
import { set } from '../store/movieSlice'
// delete file TODO
export const PopupContext = createContext({
  Popup: [],
  setPopup: () => {},
})
export const PopupProvider = ({ children }) => {
  const [Popup, setPopup] = useState()
  const [RateMovie, setRateMovie] = useState({})
  return (
    <PopupContext.Provider value={{ Popup, setPopup }}>
      {children}
    </PopupContext.Provider>
  )
}

export const usePopup = () => useContext(PopupContext)
