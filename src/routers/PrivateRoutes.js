import React from 'react'

import { LoginScreen } from '../screens/LoginScreen'

export const PrivateRoutes = ({ component: Component, ...rest }) => {
    return localStorage.getItem('authToken') ? <Component {...rest} /> : <LoginScreen />
}
