import React from 'react'
import axios from 'axios'
import { Grid, Paper, TextField, Box, Button, Typography, Alert } from '@mui/material'
import { grey } from '@mui/material/colors'
import { useForm } from 'react-hook-form'
import { Errorform } from '../../componets/utils/Errorform'
import { useNavigate } from 'react-router-dom'
import { styles } from './forgotStyle'

export const ForgotPasswordScreen = () => {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const [errorForm, setErrorForm] = React.useState('')

    const onSubmit = async (data, e) => {
        e.preventDefault()
        const config = {
            header: {
                'Content-Type': 'application/json',
            },
        }

        try {
            const response = await axios.post('api/auth/forgot-password/', data, config)
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
                            Forgot Password
                        </Typography>
                    </Box>
                    {errorForm && (
                        <Alert severity='error' variant='outlined'>
                            {errorForm}
                        </Alert>
                    )}
                    <Box sx={styles.titleForgot}>
                        <Typography variant='subtitle1' color={grey[700]} sx={{ pb: 1, pt: 2 }}>
                            Enter the email address associated with your account
                        </Typography>
                        <Typography variant='subtitle2' color={grey[500]}>
                            We will send you a link to reset your password
                        </Typography>
                    </Box>
                    <Grid item>
                        <TextField
                            label='Email'
                            id='email'
                            variant='standard'
                            fullWidth
                            {...register('email', {
                                required: {
                                    value: true,
                                    message: 'Email is required',
                                },
                                pattern: {
                                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    message: 'Must be a valid email',
                                },
                            })}
                        />
                        {errors.email && <Errorform error={errors.email.message} />}
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
