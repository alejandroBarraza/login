import React from 'react'

import { Outlet } from 'react-router-dom'
import { LoginScreen } from '../screens/LoginScreen'

export const PrivateRoutes = () => {
    const auth = localStorage.getItem('authToken')
    return typeof auth === 'undefined' ? <LoginScreen /> : <Outlet />
}
