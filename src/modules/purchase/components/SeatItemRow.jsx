import React from 'react';
import Grid from "@mui/material/Unstable_Grid2";
import SeatItem from "./SeatItem";
import { useSelector } from "react-redux";

function SeatItemRow({seats, rowIndex}) {
    const selectedList = useSelector(state => {
        return state.movieTickets.selectedTickets;
    });
    return (
        <Grid id={"row-" + rowIndex} display="flex" gap={2}
              alignItems="center">
            <div style={{width: 30}}><strong>{rowIndex}</strong></div>
            <Grid display="flex" gap={1} flexWrap="wrap" justifyContent="space-evently" >
                {
                    seats.map(seat => {
                        const tempBooked = !!selectedList.find(item => item.maGhe === seat.maGhe);
                        return (
                            <Grid key={seat.maGhe} display="flex">
                                <SeatItem seat={seat} tempBooked={tempBooked}></SeatItem>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </Grid>
    );
}

export default SeatItemRow;