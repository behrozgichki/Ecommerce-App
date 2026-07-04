import React, { useState } from 'react'
import Navbar from './Navbar'
import { Box, Typography } from '@mui/material'
import { useSelector } from 'react-redux'

const Cart = () => {
  const selector = useSelector(selector => selector.cart)
  return (
    <>
     <Box>
        <Navbar/>
        <Typography variant='h1'>
            Cart 
        </Typography>
        {selector.map((item) => (
  <Box
    key={item.id}
    sx={{
      border: "1px solid #ddd",
      borderRadius: 2,
      p: 2,
      mb: 2,
      display: "flex",
      gap: 2,
      alignItems: "center",
    }}
  >
    <img
      src={item.thumbnail}
      alt={item.title}
      width={80}
      height={80}
    />

    <Box>
      <Typography variant="h6">
        {item.title}
      </Typography>

      <Typography color="text.secondary">
        ${item.price}
      </Typography>
    </Box>
  </Box>
))}
    </Box>
    </>
  )
}

export default Cart