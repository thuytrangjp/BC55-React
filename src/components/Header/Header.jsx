import React from 'react';
import Typography from "@mui/material/Typography";

function Header() {
    return (
        <Typography variant="h3" textAlign="center"
                    sx={{marginBottom: "20px", p: 2}} >
            <strong>Đặt vé phim</strong>
        </Typography>
    );
}

export default Header;