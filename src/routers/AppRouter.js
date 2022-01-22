import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { ForgotPasswordScreen } from '../screens/ForgotPasswordScreen'
import { LoginScreen } from '../screens/LoginScreen'
import { NotFound } from '../screens/NotFound'
import { PrivateScreen } from '../screens/PrivateScreen'
import { RegisterScreen } from '../screens/RegisterScreen'
import { ResetPasswordScreen } from '../screens/ResetPasswordScreen'

export const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<PrivateScreen />} />
                <Route path='register' element={<RegisterScreen />} />
                <Route path='login' element={<LoginScreen />} />
                <Route path='forgot-password' element={<ForgotPasswordScreen />} />
                <Route path='reset-password' element={<ResetPasswordScreen />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </Router>
    )
}
