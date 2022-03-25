import React from 'react'

// redux
import { useDispatch } from 'react-redux'
import { useRegisterUserMutation } from '../../app/services/auth'
import { setUser } from '../../features/auth/authSlice'

import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { GoogleLogin } from 'react-google-login'

import {
    Grid,
    Paper,
    TextField,
    Box,
    Typography,
    Alert,
    Divider,
    InputAdornment,
    IconButton,
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { grey } from '@mui/material/colors'

import { Errorform } from '../../componets/utils/Errorform'
import { styles } from './registerStyle'
export const RegisterScreen = () => {
    // mutations
    const [registerUser, { isLoading }] = useRegisterUserMutation()
    const [showPassword, setShowPassword] = React.useState(false)
    // const [loginGoogle] = useLoginGoogleMutation()
    const dispatch = useDispatch()

    // if user still has token , he cant reaccess this page at least he logged out.
    const navigate = useNavigate()
    React.useEffect(() => {
        if (localStorage.getItem('authToken')) {
            navigate('/')
        }
    })

    const [errorForm, setErrorForm] = React.useState('')
    const { handleSubmit, register, formState } = useForm({ mode: 'onChange' })

    // submit Form
    const onSubmit = async (data, e) => {
        e.preventDefault()
        try {
            const { userData } = await registerUser(data).unwrap()
            dispatch(setUser({ username: userData.username }))
            localStorage.setItem('authToken', userData.token)
            e.target.reset()
            navigate('/', { replace: true })
        } catch (error) {
            setErrorForm(error.data.error)
            setTimeout(() => {
                setErrorForm('')
            }, 5000)
        }
    }

    const onGoogleSuccess = async (googleData) => {
        const { tokenId } = googleData
        try {
            // const { userData } = await loginGoogle(tokenId).unwrap()
            // console.log(userData)
            const res = await fetch('/api/auth/login/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    tokenId,
                }),
            })
            const { dataUser } = await res.json()
            dispatch(setUser({ username: dataUser.username }))
            localStorage.setItem('authToken', dataUser.token)
            navigate('/', { replace: true })
        } catch (error) {
            setErrorForm(error)
        }
    }

    const onGoogleFailure = async (response) => {
        console.log(response)
    }

    // show hide/passwords
    const handleTogglePassword = () => {
        setShowPassword(!showPassword)
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault()
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
                        <Typography variant='h4' color={grey[500]}>
                            Register
                        </Typography>
                    </Box>
                    {errorForm && (
                        <Alert severity='warning' variant='outlined' sx={{ mt: 4, ml: 4 }}>
                            {errorForm}
                        </Alert>
                    )}
                    <Grid item>
                        <TextField
                            id='username'
                            label='Username'
                            variant='standard'
                            fullWidth
                            {...register('username', { required: true })}
                        />
                        {formState.errors.username && <Errorform error={'Username is required'} />}
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
                        {formState.errors.email && (
                            <Errorform error={formState.errors.email.message} />
                        )}
                    </Grid>
                    <Grid item>
                        <TextField
                            label='Password'
                            id='password'
                            variant='standard'
                            type={showPassword ? 'text' : 'password'}
                            fullWidth
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        <IconButton
                                            onClick={handleTogglePassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword ? (
                                                <VisibilityOffIcon />
                                            ) : (
                                                <VisibilityIcon />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
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
                        <LoadingButton
                            type='submit'
                            variant='contained'
                            fullWidth
                            loading={isLoading}
                        >
                            Register
                        </LoadingButton>
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
                    <Box sx={{ pl: 4, pt: 4 }}>
                        <Divider>
                            <Typography variant='body2' align='center' color={grey[600]}>
                                OR
                            </Typography>
                        </Divider>
                        <Box sx={{ display: 'flex', justifyContent: 'center', pt: 2.5 }}>
                            <GoogleLogin
                                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                                buttonText='Sign up with Google'
                                onSuccess={onGoogleSuccess}
                                onFailure={onGoogleFailure}
                                cookiePolicy={'single_host_origin'}
                                className='google-login'
                            />
                        </Box>
                    </Box>
                </Grid>
            </Paper>
        </Box>
    )
}
