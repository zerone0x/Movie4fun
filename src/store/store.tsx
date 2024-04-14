import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./movieSlice";
import watchList from "../pages/WatchList";
import watchListReducer from "./watchListSlice";

export default configureStore({
    reducer:{
        movie: movieReducer,
        watchList: watchListReducer,
    }
})