import React from 'react'
import axios from 'axios'
import {
    Grid,
    Paper,
    TextField,
    Box,
    Button,
    Typography,
    // Checkbox,
    // FormGroup,
    // FormControlLabel,
    Alert,
} from '@mui/material'
import { grey } from '@mui/material/colors'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Errorform } from '../componets/utils/Errorform'

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

export const LoginScreen = () => {
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

        // Axios config.
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        //  Save authToken to localStorage.
        try {
            const response = await axios.post('api/auth/login', data, config)
            localStorage.setItem('authToken', response.data.userData.token)
            navigate('/', { replace: true })
            e.target.reset()

            // if request failed.
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
                        <Button type='submit' variant='contained' fullWidth>
                            Login
                        </Button>
                    </Grid>
                    <Box sx={styles.hasAccount}>
                        <Link
                            to={'/forgot-password'}
                            style={{
                                padding: '0 .5rem',
                                color: '#1565c0',
                                cursor: 'pointer',
                                fontSize: '0.8rem',
                            }}
                        >
                            Forgot your password?
                        </Link>
                    </Box>
                </Grid>
            </Paper>
        </Box>
    )
}
