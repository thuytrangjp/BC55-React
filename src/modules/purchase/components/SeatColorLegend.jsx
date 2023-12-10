import React from 'react';
import Grid from "@mui/material/Unstable_Grid2";
import {Button} from "@mui/material";
import Typography from "@mui/material/Typography";

function SeatColorLegend(props) {
    return (
        <Grid id="seat-list" display="flex" justifyContent="center" gap={4}>
            <Grid display="flex" flexDirection="column" alignItems="center" gap={2}>
                <Button style={{maxWidth: '35px', minWidth: '35px', maxHeight: '35px', minHeight: '35px'}}
                        variant="contained" disabled
                        sx={{
                            "&.Mui-disabled": {
                                background: "#7c7c7c",
                                color: "#000"
                            }
                        }}
                >X
                </Button>
                <Typography>Đã đặt</Typography>
            </Grid>
            <Grid display="flex" flexDirection="column" alignItems="center" gap={2}>
                <Button style={{maxWidth: '35px', minWidth: '35px', maxHeight: '35px', minHeight: '35px'}}
                        variant="contained"
                        color="lightGray"
                >
                </Button>
                <Typography>Thường</Typography>
            </Grid>
            <Grid display="flex" flexDirection="column" alignItems="center" gap={2}>
                <Button style={{maxWidth: '35px', minWidth: '35px', maxHeight: '35px', minHeight: '35px'}}
                        variant="contained"
                        color='orange'
                >
                </Button>
                <Typography>Vip</Typography>
            </Grid>
        </Grid>
    );
}

export default SeatColorLegend;