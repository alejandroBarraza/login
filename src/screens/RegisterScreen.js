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
    const [checked, setChecked] = React.useState(false)

    const handleCheckbox = (event) => {
        setChecked(event.target.checked)
    }

    return (
        <Box sx={styles.container} component='form'>
            <Paper elevation={3} sx={styles.paper}>
                <Grid container direction={'column'} spacing={4}>
                    <Box sx={styles.title}>
                        <Typography variant='h4' color={grey[600]}>
                            Register
                        </Typography>
                    </Box>
                    <Grid item>
                        <TextField id='username' label='Username' variant='standard' fullWidth />
                    </Grid>
                    <Grid item>
                        <TextField label='Email' id='email' variant='standard' fullWidth />
                    </Grid>
                    <Grid item>
                        <TextField label='Password' id='password' variant='standard' fullWidth />
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
                        <Button variant='contained' fullWidth>
                            Register
                        </Button>
                    </Grid>
                    <Box sx={styles.hasAccount}>
                        <Typography variant='body2' align='end' color={grey[600]}>
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
