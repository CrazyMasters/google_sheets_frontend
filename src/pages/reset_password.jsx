import React from 'react';
import {Alert, Box, Button, Collapse, IconButton, InputAdornment, TextField} from "@mui/material";
import {useFormik} from "formik";
import * as Yup from "yup";
import {API} from "@/utils/API";
import Router from "next/router";
import {useEnqueueSnackbar} from "@/components/hooks/useSnackbar";
import ContainerLayouts from "@/components/layouts/ContainerLayouts";
import LoadingProgress from "@/components/blocks/LoadingProgress";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AuthHeader from "@/components/blocks/AuthHeader";

const ResetPassword = () => {
    const [isLoading, setIsLoading] = React.useState(false)
    const [isVisiblePassword, setIsVisiblePassword] = React.useState(false)
    const {openSnackbar} = useEnqueueSnackbar()
    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            password: Yup
                .string()
                .required('Данное поле обязательно'),
            confirmPassword: Yup
                .string()
                .oneOf([Yup.ref('password'), null], 'Пароли не равны')
                .required('Данное поле обязательно'),
        }),
        onSubmit: () => {
            (async () => {
                try {
                    const {email, password} = formik.values
                    setIsLoading(true)
                    const response = await API.post('user/login/', {
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
                    <AuthHeader title='Восстановление пароля' withButton/>

                    <TextField
                        fullWidth
                        label="Пароль"
                        name="password"
                        onBlur={formik.handleBlur}
                        error={Boolean(formik.errors.password)}
                        onChange={formik.handleChange}
                        type={isVisiblePassword ? 'text' : 'password'}
                        value={formik.values.password}
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

                        variant="outlined"
                    />
                    <Collapse in={Boolean(formik.errors.password)} unmountOnExit>
                        <Alert severity="error">{formik.errors.password}</Alert>
                    </Collapse>
                    <TextField
                        fullWidth
                        label="Повторите пароль"
                        name="confirmPassword"
                        onBlur={formik.handleBlur}
                        error={Boolean(formik.errors.confirmPassword)}
                        onChange={formik.handleChange}
                        type={isVisiblePassword ? 'text' : 'password'}

                        value={formik.values.confirmPassword}
                        variant="outlined"
                    />
                    <Collapse in={Boolean(formik.errors.confirmPassword)} unmountOnExit>
                        <Alert severity="error">{formik.errors.confirmPassword}</Alert>
                    </Collapse>
                    <Button disabled={isLoading} type='submit' variant='contained'>
                        <LoadingProgress isLoading={isLoading} title='Восстановить пароль'/>
                    </Button>
                </Box>
            </ContainerLayouts>
        </form>

    );
};

export default ResetPassword;