import React from 'react'
import { Grid, Paper, TextField, Box, Button, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { useForm } from 'react-hook-form'
import { Errorform } from '../componets/utils/Errorform'
import { useNavigate } from 'react-router-dom'

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
    },

    paper: {
        width: { xs: '80%', md: '60%', lg: '30%' },
        margin: 'auto',
        padding: '40px',
        pt: 6,
    },
    title: {
        fontSize: '1.5rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAling: 'start',
    },
    titleForgot: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
}

export const ForgotPasswordScreen = () => {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = (data, e) => {
        e.preventDefault()
        console.log(data)
        console.log(e.target)
        e.target.reset()

        navigate('/login')
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
