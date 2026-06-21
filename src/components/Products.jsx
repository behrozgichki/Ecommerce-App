import { useState, useEffect } from 'react'
import axios from 'axios'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Skeleton from '@mui/material/Skeleton'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import ProductCard from './components/ProductsCard'
import Navbar from './Navbar'

function ProductCardSkeleton() {
  return (
    <Card sx={{ width: '100%', maxWidth: 320 }}>
      <Skeleton variant="rectangular" sx={{ pt: '75%' }} />

      <CardContent sx={{ px: 2.5, pt: 2, pb: 0 }}>
        <Skeleton variant="text" width="80%" sx={{ fontSize: '1.1rem', mb: 0.5 }} />
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="60%" sx={{ mb: 1.5 }} />
        <Skeleton variant="text" width="55%" height={24} sx={{ mb: 1.5 }} />
        <Skeleton variant="text" width="35%" sx={{ fontSize: '1.5rem', mb: 1 }} />
      </CardContent>
      <Box sx={{ px: 2.5, pb: 2 }}>
        <Skeleton variant="rounded" height={44} />
      </Box>
    </Card>
  )
}

export default function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchProducts = () => {
    setLoading(true)
    setError(null)

    axios('https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/products.json')
      .then((res) => {
        setProducts(res.data)
      })
      .catch((err) => {
        setError(err.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  console.log(products)
  useEffect(() => {
    fetchProducts()
  }, [])

  function renderContent() {
    if (error) {
      return (
        <>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Alert
            severity="error"
            action={
              <Button color="inherit" size="small" onClick={fetchProducts}>
                Retry
              </Button>
            }
            sx={{ maxWidth: 480, width: '100%' }}
            >
            {error}
          </Alert>
        </Box>
      </>
      )
    }

    if (!loading && products.length === 0) {
      return (
        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
            No products found
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Check back later for new arrivals.
          </Typography>
        </Box>
      )
    }

    if (loading) {
      return (
        <Grid container spacing={3} justifyContent="center">
          {Array.from({ length: 6 }).map((_, i) => (
            <Grid key={i}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <ProductCardSkeleton />
              </Box>
            </Grid>
          ))}
        </Grid>
      )
    }

    return (
      <Grid container spacing={3} justifyContent="center">
        {products.map((product) => (
          <Grid key={product.id}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <ProductCard
                product={product}
                onAddToCart={(p) =>
                  console.log('Added to cart:', p.title || p.name)
                }
                onToggleWishlist={(p, active) =>
                  console.log(
                    active ? 'Wishlisted' : 'Removed from wishlist',
                    p.title || p.name
                  )
                }
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    )
  }

  return (
    <>
    <Navbar/>
    <Box
    sx={{
      minHeight: '100vh',
      background:
      'linear-gradient(135deg, #eef2ff 0%, #fdf2f8 50%, #f8fafc 100%)',
      py: { xs: 4, md: 8 },
    }}
    
    >
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          component="h1"
          textAlign="center"
          sx={{ mb: 1 }}
          >
          Featured Products
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          textAlign="center"
          sx={{ mb: 5, maxWidth: 480, mx: 'auto' }}
          >
          Handpicked favorites from our latest collection. Free shipping on
          orders over $50.
        </Typography>

        {renderContent()}
      </Container>
    </Box>
          </>
  )
}