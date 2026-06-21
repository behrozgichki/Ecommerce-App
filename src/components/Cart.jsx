import React from 'react'
import Navbar from './Navbar'
import { Box, Typography } from '@mui/material'

const Cart = () => {
  return (
    <>
     <Box>
        <Navbar/>
        <Typography variant='h1'>
            Cart
        </Typography>
    </Box>
    </>
  )
}

export default Cart