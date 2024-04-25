import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
    selectedMovie: null
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
        }
    }
});

export const { openPopup, closePopup } = popupSlice.actions;
export const selectIsOpen = (state) => state.popup.isOpen;
export const selectSelectedMovie = (state) => state.popup.selectedMovie;

export default popupSlice.reducer;