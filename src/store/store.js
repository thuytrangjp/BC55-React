import { configureStore } from "@reduxjs/toolkit";
import movieTicketReducer from "./Slices/movieTicketSlice";
import axios from "axios";

const useLoggerMiddleware = false;

const loggerMiddleware = (store) => (next) => (action) => {
    if (!useLoggerMiddleware) return next(action);
    if (typeof action === "function") return action(store.dispatch, store.getState);
    console.log("loggerMiddleware", action.payload);
    return next(action);
}

const store = configureStore({
    reducer: {
        movieTickets: movieTicketReducer
    },
    middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware(),
        loggerMiddleware
    ]
})

export default store;