import React, { useState } from 'react'
import Navbar from './Navbar'
import { Box, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import Button from '@mui/material/Button'
import { increaseQuantity, decreaseQuantity } from '../config/reduxconfig/reducers/CartSlice'

const Cart = () => {
  const selector = useSelector(selector => selector.cart)
  const dispatch = useDispatch()
  const total = selector.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  return (
    <>
      <Box>
        <Navbar />
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
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
                <Button variant="outlined" onClick={() => dispatch(decreaseQuantity({ id: item.id }))}>-</Button>

                <Typography>{item.quantity}</Typography>

                <Button variant="outlined" onClick={() => dispatch(increaseQuantity({ id: item.id }))}>+</Button>
              </Box>

            </Box>
          </Box>
        ))}
        <Typography
          variant="h4"
          sx={{ mt: 4, textAlign: "right" }}
        >
          Total: ${total.toFixed(2)}
        </Typography>
      </Box>
    </>
  )
}

export default Cart