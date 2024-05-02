import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isOpen: false,
  selectedMovie: null,
  hoverRate: 0,
}

const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    openPopup(state, action) {
      state.isOpen = true
      state.selectedMovie = action.payload
    },
    closePopup(state) {
      state.isOpen = false
      state.selectedMovie = null
    },
    setHoverRate(state, action) {
      state.hoverRate = action.payload
    },
  },
})

interface selectedMovieProp {
  original_title?: string
  original_name?: string
  id: number
}

interface State {
  popup: {
    isOpen: boolean
    selectedMovie: null | selectedMovieProp
    hoverRate: number
  }
}

export const { openPopup, closePopup, setHoverRate } = popupSlice.actions
export const selectIsOpen = (state: State) => state.popup.isOpen
export const selectSelectedMovie = (state: State) => state.popup.selectedMovie
export const selectHoverRate = (state: State) => state.popup.hoverRate

export default popupSlice.reducer
