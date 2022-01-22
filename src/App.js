import React from 'react'

import { AppRouter } from '../src/routers/AppRouter'
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles'

let theme = createTheme({
    typography: {
        fontFamily: 'Public Sans',
    },
})

// automatically change font size
theme = responsiveFontSizes(theme)

function App() {
    return (
        <ThemeProvider theme={theme}>
            <AppRouter />
        </ThemeProvider>
    )
}

export default App
