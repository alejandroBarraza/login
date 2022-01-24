import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
export const PrivateScreen = () => {
    // If user access this page, but he is not logged in, redirect to login page
    const navigate = useNavigate()
    React.useEffect(() => {
        if (!localStorage.getItem('authToken')) {
            navigate('/login', { replace: true })
        }
    }, [navigate])

    const handleLogout = () => {
        localStorage.removeItem('authToken')
        navigate('/register', { replace: true })
    }

    return (
        <>
            <h1> estoy en unra ruta privada</h1>
            <Button variant='contained' fullWidth onClick={handleLogout}>
                Logout
            </Button>
        </>
    )
}
