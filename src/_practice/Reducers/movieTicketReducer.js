import { MOVIE_TICKET_ACTION } from "../Constants/movieTicketConstant";

const movieTicketInitState = {
    selectedTickets: [],
    totalPrice: 0
}
const movieTicketReducer =
    (state = movieTicketInitState, action) => {
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
        case MOVIE_TICKET_ACTION.ADD_SEAT:
            return { ...state, ...addTempBooking() };
        case MOVIE_TICKET_ACTION.REMOVE_SEAT:
            return { ...state, ...removeTempBooking() };
        case MOVIE_TICKET_ACTION.TOGGLE_SEAT:
            return { ...state, ...targetIndex > -1 ? removeTempBooking() : addTempBooking() };
        default:
            return state;
    }
}

export default movieTicketReducer;