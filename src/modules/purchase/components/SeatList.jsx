import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import movieBookingInfo from '../mockup/ticketMockup.json';
import SeatItemRow from "./SeatItemRow";


function SeatList({seatList}) {
    const ONE_ROW_AMOUNT = 16;
    const rows = [];
    const rowAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWYZ';

    for (let i = 0; i < seatList.length; i++){
        let row = Math.floor(i / ONE_ROW_AMOUNT );
        if (!Array.isArray(rows[row])) rows[row] = [];
        rows[row].push(seatList[i]);
    }

    return (
        <Grid id="seat-list" display="flex" justifyContent="center">
            <Grid container xs={10} justifyContent="center" gap={1}>
                { rows.map((row, rowIndex) => {
                    return (
                        <SeatItemRow key={rowIndex} seats={row} rowIndex={rowAlphabet[rowIndex]}/>
                    )}
                ) }
            </Grid>
        </Grid>
    );
}

export default SeatList;