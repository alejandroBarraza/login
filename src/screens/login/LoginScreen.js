import React from 'react'

import { setUser } from '../../features/auth/authSlice'
import { useDispatch } from 'react-redux'
import { useLoginUserMutation } from '../../app/services/auth'

import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { GoogleLogin } from 'react-google-login'

import LoadingButton from '@mui/lab/LoadingButton'
import { grey } from '@mui/material/colors'
import {
    Grid,
    Paper,
    TextField,
    Box,
    Typography,
    // Checkbox,
    // FormGroup,
    // FormControlLabel,
    Alert,
    Divider,
    IconButton,
    InputAdornment,
} from '@mui/material'

import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

import { Errorform } from '../../componets/utils/Errorform'
import { styles } from './loginStyle'

export const LoginScreen = () => {
    // mutations
    const [loginUser, { isLoading }] = useLoginUserMutation()
    const [showPassword, setShowPassword] = React.useState(false)
    const dispatch = useDispatch()

    // if user has token , he cant reaccess this page at least he logged out.
    const navigate = useNavigate()
    React.useEffect(() => {
        if (localStorage.getItem('authToken')) {
            navigate('/')
        }
    })
    const { handleSubmit, register, formState } = useForm({ mode: 'onChange' })
    // const [checked, setChecked] = React.useState(false)
    const [errorForm, setErrorForm] = React.useState('')

    // const handleCheckbox = (event) => {
    //     setChecked(event.target.checked)
    // }

    const onSubmit = async (data, e) => {
        e.preventDefault()
        try {
            const { userData } = await loginUser(data).unwrap()
            dispatch(setUser({ username: userData.username }))
            localStorage.setItem('authToken', userData.token)
            navigate('/', { replace: true })
            e.target.reset()

            // if request failed.
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
            const res = await fetch(`${process.env.REACT_APP_PUBLIC_URL}/api/auth/login/google`, {
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

    const handleTogglePassword = () => {
        setShowPassword(!showPassword)
    }
    const handleMouseDownPassword = (e) => {
        e.preventDefault()
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
                            Login
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
                    {/* <Grid item>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onChange={handleCheckbox}
                                        checked={checked}
                                        style={{ color: grey[600] }}
                                    />
                                }
                                label='Remember me'
                                style={{ color: grey[600] }}
                            />
                        </FormGroup>
                    </Grid> */}
                    <Grid item>
                        <LoadingButton
                            type='submit'
                            variant='contained'
                            fullWidth
                            loading={isLoading}
                        >
                            Login
                        </LoadingButton>
                    </Grid>
                    <Box sx={styles.hasAccount}>
                        <Link
                            to={'/forgot-password'}
                            style={{
                                paddingTop: '0rem',
                                color: '#1565c0',
                                cursor: 'pointer',
                                fontSize: '0.8rem',
                            }}
                        >
                            Forgot your password?
                        </Link>
                    </Box>
                    <Box
                        sx={{
                            pl: 4,
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        {/* <Divider /> */}
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                pt: 1,
                            }}
                        >
                            <Typography
                                variant='subtitle2'
                                color={grey[600]}
                                sx={{ marginLeft: 'auto' }}
                            >
                                Dont have an account?
                                <Link
                                    style={{
                                        color: '#1565c0',
                                        cursor: 'pointer',
                                        fontSize: '0.8rem',
                                        paddingLeft: '0.5rem',
                                    }}
                                    to={'/register'}
                                >
                                    Register
                                </Link>
                            </Typography>
                        </Box>
                        <Box sx={{ pt: 4 }}>
                            <Divider>
                                <Typography variant='body2' align='center' color={grey[600]}>
                                    OR
                                </Typography>
                            </Divider>
                            <Box sx={{ display: 'flex', justifyContent: 'center', pt: 2.5 }}>
                                <GoogleLogin
                                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                                    buttonText='Login with Google'
                                    onSuccess={onGoogleSuccess}
                                    onFailure={onGoogleFailure}
                                    cookiePolicy={'single_host_origin'}
                                    className='google-login'
                                />
                            </Box>
                        </Box>
                    </Box>
                </Grid>
            </Paper>
        </Box>
    )
}
