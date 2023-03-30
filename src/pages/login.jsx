import React from 'react';
import {useFormik} from "formik";
import * as Yup from 'yup'
import Router from 'next/router';
import {useEnqueueSnackbar} from "@/components/hooks/useSnackbar";
import {server} from "@/utils/API";
import {Box, Button, TextField, Alert, Collapse, Typography, InputAdornment, IconButton} from "@mui/material";
import ContainerLayouts from "@/components/layouts/ContainerLayouts";
import LoadingProgress from "@/components/blocks/LoadingProgress";
import Link from 'next/link'
import AuthHeader from "@/components/blocks/AuthHeader";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Login = () => {
    const [isLoading, setIsLoading] = React.useState(false)
    const [isVisiblePassword, setIsVisiblePassword] = React.useState(false)
    const {openSnackbar} = useEnqueueSnackbar()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validateOnChange: false,
        validateOnBlur: false,
        validationSchema: Yup.object({
            email: Yup
                .string()
                .email('Не является почтой')
                .max(35)
                .required('Данное поле обязательно'),
            password: Yup
                .string()
                .required('Данное поле обязательно'),
        }),
        onSubmit: () => {
            (async () => {
                try {
                    const {email, password} = formik.values
                    setIsLoading(true)
                    const response = await server.post('user/login/', {
                        email,
                        password
                    })
                    if (response.status === 200) {
                        Cookies.set('Token', response.data.token)
                        await Router.push('/')
                        formik.handleReset()
                    }
                } catch (e) {
                    openSnackbar({
                        message: e?.response?.data?.detail ? e.response.data.detail : e.message,
                        variant: 'error'
                    })
                    formik.handleReset()
                } finally {
                    setIsLoading(false)
                }
            })()
        }
    });


    return (
        <form onSubmit={formik.handleSubmit}>
            <ContainerLayouts maxWidth='600px' justifyContent='center' alignItems='center'>
                <Box width='100%' display='flex' flexDirection='column' gap='10px'>
                    <AuthHeader title='Авторизация'/>
                    <TextField
                        fullWidth
                        label="Почта"
                        name="email"
                        onBlur={formik.handleBlur}
                        error={Boolean(formik.errors.email)}
                        onChange={formik.handleChange}
                        type="text"
                        value={formik.values.email}
                        variant="outlined"
                    />
                    <Collapse in={Boolean(formik.errors.email)} unmountOnExit>
                        <Alert severity="error">{formik.errors.email}</Alert>
                    </Collapse>
                    <TextField
                        fullWidth
                        label="Пароль"
                        name="password"
                        onBlur={formik.handleBlur}
                        error={Boolean(formik.errors.password)}
                        onChange={formik.handleChange}
                        type={isVisiblePassword ? 'text' : 'password'}
                        value={formik.values.password}
                        variant="outlined"
                        InputProps={{
                            endAdornment: <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setIsVisiblePassword(!isVisiblePassword)}
                                    edge="end"
                                >
                                    {isVisiblePassword ? <Visibility/> : <VisibilityOff/>}
                                </IconButton>
                            </InputAdornment>
                        }}
                    />
                    <Collapse in={Boolean(formik.errors.password)} unmountOnExit>
                        <Alert severity="error">{formik.errors.password}</Alert>
                    </Collapse>
                    <Box display='flex' justifyContent='flex-end' width='100%'>
                        <Link href='/forgot_password'>
                            <Typography color='primary'>Забыли пароль?</Typography>
                        </Link>
                    </Box>
                    <Button disabled={isLoading} type='submit' variant='contained'>
                        <LoadingProgress isLoading={isLoading} title='Войти'/>
                    </Button>
                    <Box display='flex' justifyContent='flex-end' width='100%'>
                        <Link href='/registration'>
                            <Typography color='primary'>Не имеете аккаунта?</Typography>
                        </Link>
                    </Box>
                </Box>
            </ContainerLayouts>
        </form>
    );
};

export default Login;