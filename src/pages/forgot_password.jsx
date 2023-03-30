import React from 'react';
import {Alert, Box, Button, Collapse, TextField} from "@mui/material";
import {useFormik} from "formik";
import * as Yup from "yup";
import {server} from "@/utils/API";
import Router from "next/router";
import {useEnqueueSnackbar} from "@/components/hooks/useSnackbar";
import ContainerLayouts from "@/components/layouts/ContainerLayouts";
import LoadingProgress from "@/components/blocks/LoadingProgress";
import AuthHeader from "@/components/blocks/AuthHeader";

const ForgotPassword = () => {
    const [isLoading, setIsLoading] = React.useState(false)
    const {openSnackbar} = useEnqueueSnackbar()
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object({
            email: Yup
                .string()
                .email('Не является почтой')
                .required('Данное поле обязательно'),

        }),
        onSubmit: () => {
            (async () => {
                try {
                    const {email, password} = formik.values
                    setIsLoading(true)
                    const response = await server.post('user/login/', {
                        email,
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
                        label="Почта"
                        name="email"
                        onBlur={formik.handleBlur}
                        error={Boolean(formik.errors.email)}
                        onChange={formik.handleChange}
                        type='text'
                        value={formik.values.email}
                        variant="outlined"
                    />
                    <Collapse in={Boolean(formik.errors.email)} unmountOnExit>
                        <Alert severity="error">{formik.errors.email}</Alert>
                    </Collapse>
                    <Button disabled={isLoading} type='submit' variant='contained'>
                        <LoadingProgress isLoading={isLoading} title='Восстановить пароль'/>
                    </Button>
                </Box>
            </ContainerLayouts>
        </form>

    );
};

export default ForgotPassword;