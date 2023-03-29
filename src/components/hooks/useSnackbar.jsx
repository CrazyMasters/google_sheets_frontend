import React from 'react';
import {useSnackbar} from 'notistack';
import {IconButton} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export const useEnqueueSnackbar = () => {
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();

    const openSnackbar = ({message, variant = 'default'}) => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar(message, {variant});
    };
    return {openSnackbar, closeSnackbar};
};

export const SnackbarCloseButton = ({snackbarKey}) => {
    const {closeSnackbar} = useEnqueueSnackbar();

    return (
        <IconButton onClick={() => closeSnackbar(snackbarKey)}>
            <CloseIcon sx={{color: 'white'}}/>
        </IconButton>
    );
};