import * as React from 'react';
import { AppBar } from 'react-admin';
import Typography from '@mui/material/Typography';

const CustomBar = (props) => (
    <AppBar
        sx={{
            "& .RaAppBar-title": {
                flex: 1,
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
            },
        }}
        {...props}
    >
        <img src = {"https://www.aura.services/wp-content/uploads/2021/02/aura-main-logo-notagline.svg"} height = {40}  width = {150}/>
        <Typography
            variant="h6"
            color="inherit"
            id="react-admin-title"
        />
    </AppBar>
);

export default CustomBar;