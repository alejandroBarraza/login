import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { ForgotPasswordScreen } from '../screens/ForgotPasswordScreen'
import { LoginScreen } from '../screens/LoginScreen'
import { NotFound } from '../screens/NotFound'
import { RegisterScreen } from '../screens/RegisterScreen'
import { ResetPasswordScreen } from '../screens/ResetPasswordScreen'
import { PrivateRoutes } from './PrivateRoutes'
import { PrivateScreen } from '../screens/PrivateScreen'
// import { PrivateRoutes } from './PrivateRoutes'

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
