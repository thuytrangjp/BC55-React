import { configureStore } from "@reduxjs/toolkit";

const movieTicketsInitState = {
    selectedTickets: [],
    totalPrice: 0
}
const movieTicketsReducer = (state = movieTicketsInitState, action) => {
    const { type, payload } = action;
    let modifiedList = [...state.selectedTickets];
    let totalPrice = state.totalPrice;
    let targetIndex = !payload ? undefined :
                                            modifiedList.findIndex(item => item.maGhe === payload.maGhe);

    const addTempBooking = () => {
        modifiedList.push(payload);
        totalPrice += payload.giaVe;
        return { selectedTickets: modifiedList, totalPrice }
    }
    const removeTempBooking = () => {
        modifiedList.splice(targetIndex, 1);
        totalPrice -= payload.giaVe;
        return { selectedTickets: modifiedList, totalPrice }
    }

    switch (type) {
        case "movieTicket/addTempBooking":
            return { ...state, ...addTempBooking() };
        case "movieTicket/removeTempBooking":
            return { ...state, ...removeTempBooking() };
        case "movieTicket/updateTempBooking":
            return { ...state, ...targetIndex > -1 ? removeTempBooking() : addTempBooking() };
        default:
            return state;
    }
}

const store = configureStore({
    reducer: {
        movieTickets: movieTicketsReducer
    }
})

// store.subscribe(() =>{
//     console.log(store.getState());
// })

export default store;