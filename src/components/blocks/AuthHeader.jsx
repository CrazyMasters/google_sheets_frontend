import React from 'react';
import {Box, Button, Typography} from "@mui/material";
import Image from "next/image";
import logo from "../../../public/logo.svg";
import Link from "next/link";
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

const AuthHeader = ({title, withButton = false}) => {
    return (
        <>
            <Box mb='15px' display='flex' alignItems='center' justifyContent='center'>
                <Image src={logo} width={100} height={100} alt='Логотип'/>
            </Box>
            <Box display='flex' justifyContent='space-between'>
                <Typography component='h1' fontSize='1.5rem'>{title}</Typography>
                {withButton && (
                    <Link href='/login'>
                        <Button endIcon={<ArrowForwardIosRoundedIcon/>}>
                            Вернуться обратно
                        </Button>
                    </Link>
                )}
            </Box>
        </>
    );
};

export default AuthHeader;