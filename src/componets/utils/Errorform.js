import { Typography } from '@mui/material'
import React from 'react'

export const Errorform = ({ error }) => {
    return (
        <Typography variant='subtitle1' color={'error'}>
            {error}
        </Typography>
    )
}
