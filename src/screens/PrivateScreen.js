import React from 'react'

// redux
import { useSelector, useDispatch } from 'react-redux'
import { selectUser, removeUser } from '../features/auth/authSlice'

import { useNavigate } from 'react-router-dom'
import { Button, Grid } from '@mui/material'

export const PrivateScreen = () => {
    const dispatch = useDispatch()
    const username = useSelector(selectUser)
    // If user access this page, but he is not logged in, redirect to login page
    const navigate = useNavigate()
    React.useEffect(() => {
        if (!localStorage.getItem('authToken')) {
            navigate('/login', { replace: true })
        }
    }, [navigate])

    const handleLogout = () => {
        localStorage.removeItem('authToken')
        dispatch(removeUser())
        navigate('/register', { replace: true })
    }

    return (
        <>
            <Grid
                container
                spacing={2}
                direction='column'
                alignItems='center'
                justifyContent='center'
                style={{ minHeight: '100vh' }}
            >
                <Grid item xs={1} alignItems='center' spacing={1} justifyContent='center'>
                    <h1> Hi! 👋 {username}</h1>
                    <p>this is a demo for an authentication project</p>
                </Grid>
                <Grid item xs={3}>
                    <Button variant='contained' fullWidth onClick={handleLogout}>
                        Logout
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}
// ;<Grid
//     container
//     spacing={0}
//     direction='column'
//     alignItems='center'
//     justifyContent='center'
//     style={{ minHeight: '100vh' }}
// >
//     <Grid item xs={3}>
//         <LoginForm />
//     </Grid>
// </Grid>
