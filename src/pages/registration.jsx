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
import {IMaskInput} from "react-imask";
import AuthHeader from "@/components/blocks/AuthHeader";

const TextMaskCustom = React.forwardRef(
    function TextMaskCustom(props, ref) {
        const {onChange, ...other} = props;
        return (
            <IMaskInput
                {...other}
                mask="+#(000) 000-0000"
                definitions={{
                    '#': /[1-9]/,
                }}
                inputRef={ref}
                onAccept={(value) => onChange({target: {name: props.name, value}})}
            />
        );
    },
);


const Registration = () => {
    const [isLoading, setIsLoading] = React.useState(false)
    const [isVisiblePassword, setIsVisiblePassword] = React.useState(false)
    const {openSnackbar} = useEnqueueSnackbar()
    const formik = useFormik({
        initialValues: {
            email: '',
            nickname: '',
            name: '',
            phone: '',
            password: '',
            confirmPassword: '',
        },
        validateOnChange: false,
        validateOnBlur: false,
        validationSchema: Yup.object({
            email: Yup
                .string()
                .email('Не является почтой')
                .max(35)
                .required('Данное поле обязательно'),
            nickname: Yup
                .string()
                .required('Данное поле обязательно'),
            name: Yup
                .string()
                .required('Данное поле обязательно'),
            phone: Yup
                .string()
                .required('Данное поле обязательно'),
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
                    const {email, password, name, nickname, phone} = formik.values
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
                    <AuthHeader title='Регистрация' withButton/>
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


                    <TextField
                        fullWidth
                        label="Имя пользователя"
                        name="name"
                        onBlur={formik.handleBlur}
                        error={Boolean(formik.errors.name)}
                        onChange={formik.handleChange}
                        type='text'
                        value={formik.values.name}
                        variant="outlined"
                    />
                    <Collapse in={Boolean(formik.errors.name)} unmountOnExit>
                        <Alert severity="error">{formik.errors.name}</Alert>
                    </Collapse>


                    <TextField
                        fullWidth
                        label="Nickname"
                        name="nickname"
                        onBlur={formik.handleBlur}
                        error={Boolean(formik.errors.nickname)}
                        onChange={formik.handleChange}
                        type='text'
                        value={formik.values.nickname}
                        variant="outlined"
                    />
                    <Collapse in={Boolean(formik.errors.nickname)} unmountOnExit>
                        <Alert severity="error">{formik.errors.nickname}</Alert>
                    </Collapse>


                    <TextField
                        fullWidth
                        label="Телефон"
                        name="phone"
                        onBlur={formik.handleBlur}
                        error={Boolean(formik.errors.phone)}
                        onChange={formik.handleChange}
                        type='text'
                        value={formik.values.phone}
                        variant="outlined"
                        InputProps={{
                            inputComponent: TextMaskCustom
                        }}
                    />
                    <Collapse in={Boolean(formik.errors.phone)} unmountOnExit>
                        <Alert severity="error">{formik.errors.phone}</Alert>
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
                        <LoadingProgress isLoading={isLoading} title='Зарегистрироваться'/>
                    </Button>
                </Box>
            </ContainerLayouts>
        </form>

    );
};

export default Registration;