import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { NotFound } from '../screens/NotFound'
import { RegisterScreen } from '../screens/register/RegisterScreen'
import { PrivateRoutes } from './PrivateRoutes'
import { PrivateScreen } from '../screens/PrivateScreen'
import { LoginScreen } from '../screens/login/LoginScreen'
import { ForgotPasswordScreen } from '../screens/forgotPassword/ForgotPasswordScreen'
import { ResetPasswordScreen } from '../screens/resetPassword/ResetPasswordScreen'

export const AppRouter = () => {
    return (
        <Router>
            <Routes>
                {/* All privated routes go below, react-router-dom v6 */}
                <Route element={<PrivateRoutes />}>
                    <Route path='/' element={<PrivateScreen />} />
                </Route>
                <Route path='register' element={<RegisterScreen />} />
                <Route path='login' element={<LoginScreen />} />
                <Route path='forgot-password' element={<ForgotPasswordScreen />} />
                <Route path='reset-password/:token' element={<ResetPasswordScreen />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </Router>
    )
}
