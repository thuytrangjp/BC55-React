// import { configureStore } from "@reduxjs/toolkit";
// import movieTicketReducer from "./Reducers/movieTicketReducer";
// import axios from "axios";
//
// const asyncMiddleware = (store) => (next) => (action) => {
//     if (typeof action === "function")
//         return action(store.dispatch, store.getState);
//     console.log("asyncMiddleware", action);
//     return next(action);
// }
//
// const store = configureStore({
//     reducer: {
//         movieTickets: movieTicketReducer
//     },
//     middleware: (getDefaultMiddleware) => [
//         ...getDefaultMiddleware(),
//         // asyncMiddleware //=== redux-thunk
//     ]
// })
//
// export default store;
// const asyncAction = () => {
//     return async (dispatch, getState) => {
//         const { data } = await axios.get("https://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=46117")
//         dispatch({ type: "GET_SEATS", payload: data })
//     }
// }
//
// store.dispatch(asyncAction());