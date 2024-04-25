import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
    selectedMovie: null,
    hoverRate: 0
}

const popupSlice = createSlice({
    name: "popup",
    initialState,
    reducers: {
        openPopup(state, action) {
            state.isOpen = true;
            state.selectedMovie = action.payload;
        },
        closePopup(state) {
            state.isOpen = false;
            state.selectedMovie = null;
        },
        setHoverRate(state, action){
            state.hoverRate = action.payload
        }

    }
});

export const { openPopup, closePopup, setHoverRate } = popupSlice.actions;
export const selectIsOpen = (state) => state.popup.isOpen;
export const selectSelectedMovie = (state) => state.popup.selectedMovie;
export const selectHoverRate = (state) => state.popup.hoverRate;

export default popupSlice.reducer;