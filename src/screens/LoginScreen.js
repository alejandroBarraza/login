import React from 'react'
import {
    Grid,
    Paper,
    TextField,
    Box,
    Button,
    Typography,
    Checkbox,
    FormGroup,
    FormControlLabel,
} from '@mui/material'
import { grey } from '@mui/material/colors'
import { Link } from 'react-router-dom'
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
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const [checked, setChecked] = React.useState(false)

    const handleCheckbox = (event) => {
        setChecked(event.target.checked)
    }

    const onSubmit = (data, e) => {
        e.preventDefault()
        console.log(data)
        console.log(e.target)
        e.target.reset()
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
                    </Grid>
                    <Grid item>
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
                    </Grid>
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
