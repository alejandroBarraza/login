import React from 'react'
import axios from 'axios'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Grid, Paper, TextField, Box, Button, Typography, Alert } from '@mui/material'
import { grey } from '@mui/material/colors'
import { useForm } from 'react-hook-form'
import { Errorform } from '../../componets/utils/Errorform'
import { useParams, useNavigate } from 'react-router-dom'
import { styles } from './resetStyle'

export const ResetPasswordScreen = () => {
    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters'),
        confirmPassword: Yup.string()
            .required('Confirm Password is required')
            .oneOf([Yup.ref('password')], 'Passwords must match'),
    })
    const formOptions = { resolver: yupResolver(validationSchema) }

    const params = useParams()
    const navigate = useNavigate()
    const [errorForm, setErrorForm] = React.useState('')
    const { handleSubmit, register, formState } = useForm({ mode: 'onChange', ...formOptions })

    const onSubmit = async (data, e) => {
        e.preventDefault()
        const config = {
            header: {
                'Content-Type': 'application/json',
            },
        }
        try {
            const response = await axios.put(
                `/api/auth/reset-password/${params.token}`,
                data,
                config
            )
            console.log(response)
            navigate('/login')
        } catch (error) {
            setErrorForm(error.response.data.error)
            setTimeout(() => {
                setErrorForm('')
            }, 5000)
        }
    }

    return (
        <Box
            sx={styles.container}
            component='form'
            onSubmit={handleSubmit(onSubmit)}
            autoComplete='off'
        >
            <Paper elevation={3} sx={styles.paper}>
                <Grid container direction={'column'} spacing={4}>
                    <Box sx={styles.title}>
                        <Typography variant='h4' color={grey[600]}>
                            Reset Password
                        </Typography>
                    </Box>
                    <Box sx={styles.titleForgot}>
                        <Typography variant='subtitle1' color={grey[500]} sx={{ pb: 1, pt: 2 }}>
                            Create a new password for your account.
                        </Typography>
                    </Box>
                    {errorForm && (
                        <Alert severity='warning' variant='outlined' sx={{ mt: 4, ml: 4 }}>
                            {errorForm}
                        </Alert>
                    )}
                    <Grid item>
                        <TextField
                            label='Password'
                            id='password'
                            variant='standard'
                            type='password'
                            fullWidth
                            {...register('password', {
                                required: {
                                    value: true,
                                    message: 'Password is required',
                                },
                                minLength: {
                                    value: 6,
                                    message: 'Password must have at least 6 characters',
                                },
                            })}
                        />
                        {formState.errors.password && (
                            <Errorform error={formState.errors.password.message} />
                        )}
                    </Grid>
                    <Grid item>
                        <TextField
                            label='Password'
                            id='confirmPassword'
                            variant='standard'
                            type='password'
                            fullWidth
                            {...register('confirmPassword', {
                                required: {
                                    value: true,
                                    message: 'Password is required',
                                },
                                minLength: {
                                    value: 6,
                                    message: 'Password must have at least 6 characters',
                                },
                            })}
                        />
                        {formState.errors.confirmPassword && (
                            <Errorform error={formState.errors.confirmPassword.message} />
                        )}
                    </Grid>
                    <Grid item>
                        <Button type='submit' variant='contained' fullWidth>
                            Send
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    )
}
