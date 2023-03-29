import React from 'react';
import {CircularProgress} from "@mui/material";

const LoadingProgress = ({isLoading, title}) => {
    return (
        <>
            {isLoading ? <CircularProgress size={20} color='primary'/> : title}
        </>
    );
};

export default LoadingProgress;