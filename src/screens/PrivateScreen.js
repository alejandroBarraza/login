import React from 'react'

// redux
import { useSelector, useDispatch } from 'react-redux'
import { selectUser, removeUser } from '../features/auth/authSlice'

import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'

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
            <h1>estoy en unra ruta privada, bienvenido {username}</h1>
            <Button variant='contained' fullWidth onClick={handleLogout}>
                Logout
            </Button>
        </>
    )
}
