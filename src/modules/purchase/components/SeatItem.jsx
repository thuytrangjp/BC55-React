import React from 'react';
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
// import { toggleSelectSeat } from "../../../store/Actions/movieTicketAction";
import {toggleSelectSeat} from "../../../store/Slices/movieTicketSlice";

function SeatItem({seat, tempBooked}) {
    const { tenGhe: name, daDat: booked, loaiGhe: type} = seat;

    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(toggleSelectSeat(seat));
    }

    const getColor = () => {
        switch (true) {
            case booked:
                return 'darkGray';
            case tempBooked:
                return 'success';
            case type === 'Vip':
                return 'orange';
            default:
                return 'lightGray';
        }
    }

    return (
        <Button style={{maxWidth: '35px', minWidth: '35px', maxHeight: '35px', minHeight: '35px'}}
                variant="contained"
                color={getColor()}
                sx={{
                    "&.Mui-disabled": {
                        background: "#7c7c7c",
                        color: "#000"
                    }
                }}
                disabled={booked}
                onClick={() => handleClick(seat)}
        >
            {booked ? "X" : name}
        </Button>
    );
}

export default SeatItem;