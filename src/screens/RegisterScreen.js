import React from 'react'
import { Grid, Paper, TextField, Box, Button, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Errorform } from '../componets/utils/Errorform'
import { PostRegister } from '../api/apiRequest'
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
    hasAccount: {
        display: 'flex',
        justifyContent: 'flex-end',
        pt: 1.5,
    },
}

export const RegisterScreen = () => {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data, e) => {
        e.preventDefault()
        const userData = await PostRegister(data)
        localStorage.setItem('authToken', userData.token)
        e.target.reset()
        navigate('/', { replace: true })
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
                            Register
                        </Typography>
                    </Box>
                    <Grid item>
                        <TextField
                            id='username'
                            label='Username'
                            variant='standard'
                            fullWidth
                            {...register('username', { required: true })}
                            // helperText={errors.username && 'name is required'}
                        />
                        {errors.username && <Errorform error={'Username is required'} />}
                    </Grid>
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
                        {errors.password && <Errorform error={errors.passwrod.message} />}
                    </Grid>
                    <Grid item>
                        <Button type='submit' variant='contained' fullWidth>
                            Register
                        </Button>
                    </Grid>
                    <Box sx={styles.hasAccount}>
                        <Typography variant='body2' align='right' color={grey[600]}>
                            Already have an account?
                        </Typography>
                        <Link
                            to={'/login'}
                            style={{ padding: '0 .5rem', color: '#1565c0', cursor: 'pointer' }}
                        >
                            Login
                        </Link>
                    </Box>
                </Grid>
            </Paper>
        </Box>
    )
}