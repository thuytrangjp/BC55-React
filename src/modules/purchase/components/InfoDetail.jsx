import React from 'react';
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";

function InfoDetail({data, field}) {
    return (
        <Grid id={field}container sx={{p: 1, m: 1}} display="flex"
              justifyContent="space-between" alignItems="center">
            <Typography xs={6} variant='body1'><strong>{field}</strong></Typography>
            <Typography xs={6} variant='body1' textAlign="right">{data}</Typography>
        </Grid>
    );
}

export default InfoDetail;