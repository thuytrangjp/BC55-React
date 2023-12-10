import React from 'react';
import Grid from "@mui/material/Unstable_Grid2";
import SeatList from "../components/SeatList";
import BookingDetail from "../components/BookingDetail";
import SeatColorLegend from "../components/SeatColorLegend";
import movieBookingInfo from '../mockup/ticketMockup.json';

function Purchase() {
    const { thongTinPhim: movieInfo, danhSachGhe: seatList } = movieBookingInfo;
    return (
        <Grid id="purchase-page" container>
            <Grid xs={8} display="flex" flexDirection="column" gap={4}>
                <SeatList seatList={seatList} />
                <SeatColorLegend />
            </Grid>
            <Grid xs={4} display="flex" flexDirection="column">
                <BookingDetail movieInfo={movieInfo} />
            </Grid>
        </Grid>
    );
}

export default Purchase;