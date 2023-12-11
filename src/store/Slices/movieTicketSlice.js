import { createSlice } from "@reduxjs/toolkit";

const movieTicketSlice = createSlice({
    name: 'movieTickets',
    initialState: {
        selectedTickets: [],
        totalPrice: 0
    },
    reducers: {
        selectSeat: (state, action) => {
            const { payload } = action;
            return addTempBooking(payload, state);
        },
        unselectSeat: (state, action) => {
            const { payload } = action;
            return removeTempBooking(payload, state);
        },
        toggleSelectSeat: (state, action) => {
            const { payload } = action;
            return updateTempBooking(payload, state);
        }
    }
})

export const
    {   selectSeat,
        unselectSeat,
        toggleSelectSeat
    } = movieTicketSlice.actions;

export default movieTicketSlice.reducer;

const addTempBooking = (currentTicket, state) => {
    let selectedTickets = [...state.selectedTickets];
    let totalPrice = state.totalPrice;
    selectedTickets.push(currentTicket);
    totalPrice += currentTicket.giaVe;
    return { ...state, selectedTickets, totalPrice }
}

const removeTempBooking = (currentTicket, state) => {
    let selectedTickets = [...state.selectedTickets];
    let totalPrice = state.totalPrice;
    let targetIndex = !currentTicket ? undefined :
        selectedTickets.findIndex(item => item.maGhe === currentTicket.maGhe);
    selectedTickets.splice(targetIndex, 1);
    totalPrice -= currentTicket.giaVe;
    return { ...state, selectedTickets, totalPrice }
}

const updateTempBooking = (currentTicket, state) => {
    let selectedTickets = [...state.selectedTickets];
    let targetIndex = !currentTicket ? undefined :
        selectedTickets.findIndex(item => item.maGhe === currentTicket.maGhe);
    return { ...state, ...targetIndex > -1 ?
                        removeTempBooking(currentTicket, state) :
                        addTempBooking(currentTicket, state) };
}