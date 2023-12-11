import { MOVIE_TICKET_ACTION} from "../Constants/movieTicketConstant";

export const toggleSelectSeat = (seat) => {
    return {
        type: MOVIE_TICKET_ACTION.TOGGLE_SEAT,
        payload: seat
    }
}

export const selectSeat = (seat) => {
    return {
        type: MOVIE_TICKET_ACTION.ADD_SEAT,
        payload: seat
    }
}

export const unselectSeat = (seat) => {
    return {
        type: MOVIE_TICKET_ACTION.REMOVE_SEAT,
        payload: seat
    }
}