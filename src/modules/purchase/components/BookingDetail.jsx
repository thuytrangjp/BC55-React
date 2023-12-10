import React from 'react';
import Grid from "@mui/material/Unstable_Grid2";
import { useSelector } from "react-redux";
import Typography from '@mui/material/Typography';
import {Divider} from "@mui/material";
import InfoDetail from "./InfoDetail";

function BookingDetail({movieInfo}) {
    const movieTicketsState = useSelector(state => {
        return state.movieTickets;
    });
    const { selectedTickets, totalPrice } = movieTicketsState;
    let { maLichChieu, hinhAnh, ngayChieu, gioChieu, ...dataset} = movieInfo;
    dataset = {...dataset, ngayGioChieu: ngayChieu + " " + gioChieu };
    const fields = ["Cụm Rạp", "Địa Chỉ", "Rạp", "Ngày Giờ Chiếu", "Tên Phim"];
    const selectSeatNames = selectedTickets.map(item => item.tenGhe).join(", Ghế ");

    return (
        <Grid id="booking-detail" sx={{
            boxShadow: 2,
            height: '100%',
            color: (theme) =>
                theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
            p: 1,
            m: 1,
            borderRadius: 2,
            textAlign: 'center',
            fontSize: '0.875rem',
            fontWeight: '700',
        }}>
            <Typography variant='h4' color="green.main">
                <strong>
                    {new Intl.NumberFormat("us-EN", ).format(totalPrice) + " VND"}
                </strong>
            </Typography>
            <Divider></Divider>
            <InfoDetail/>
            {
                Object.keys(dataset).map((key, index) => {
                    return (
                        <div key={index}>
                            <InfoDetail field={fields[index]} data={dataset[key]} />
                            <Divider variant='middle'></Divider>
                        </div>
                    )
                })
            }
            <InfoDetail field="Chọn" data={selectSeatNames ? "Ghế " + selectSeatNames : ""} />
        </Grid>
    );
}

export default BookingDetail;