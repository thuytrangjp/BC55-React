import React from 'react';
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Grid from "@mui/material/Unstable_Grid2";

function MainLayout() {
    return (
        <div>
            <Header/>
            <Grid container justifyContent="center" sx={{marginBottom: "20px"}}>
                <Grid xs={11} >
                    <Outlet />
                </Grid>
            </Grid>
            <Footer />
        </div>
    );
}

export default MainLayout;