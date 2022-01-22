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

export const ResetPasswordScreen = () => {
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
                            Reset Password
                        </Typography>
                    </Box>
                    <Box sx={styles.titleForgot}>
                        <Typography variant='subtitle1' color={grey[500]} sx={{ pb: 1, pt: 2 }}>
                            Create a new password for your account.
                        </Typography>
                    </Box>
                    <Grid item>
                        <TextField
                            label='Password'
                            id='password'
                            variant='standard'
                            type='password'
                            fullWidth
                            {...register('password', {
                                required: 'You must specify a password',
                                minLength: {
                                    value: 6,
                                    message: 'Password must have at least 6 characters',
                                },
                            })}
                        />
                        {errors.password && <Errorform error={errors.email.password} />}
                    </Grid>
                    <Grid item>
                        <TextField
                            label='Confirm Password'
                            id='passwordConfirm'
                            variant='standard'
                            type='password'
                            fullWidth
                            {...register('password2', {
                                required: 'You must specify a password',
                                minLength: {
                                    value: 6,
                                    message: 'Password must have at least 6 characters',
                                },
                            })}
                        />
                        {errors.password2 && <Errorform error={errors.email.password2} />}
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
