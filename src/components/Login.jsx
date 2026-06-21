import { useState } from 'react'
import { Link as RouterLink } from "react-router";
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Link from '@mui/material/Link'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import Navbar from './Navbar'

function EyeIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function EyeOffIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <path d="m14.12 14.12a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  )
}

function LockIcon() {
  return (
    <Box
      sx={{
        width: 48,
        height: 48,
        borderRadius: '50%',
        bgcolor: 'primary.main',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mb: 2,
      }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    </Box>
  )
}

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  function validate() {
    const next = {}

    if (!email.trim()) {
      next.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = 'Enter a valid email address'
    }

    if (!password) {
      next.password = 'Password is required'
    } else if (password.length < 6) {
      next.password = 'Password must be at least 6 characters'
    }

    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (!validate()) return

    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
       
      console.log({ email, password, rememberMe })
    }, 1500)
  }

  return (
    <>
    <Navbar />
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        background: 'linear-gradient(135deg, #eef2ff 0%, #fdf2f8 50%, #f8fafc 100%)',
      }}
    >
      <Card sx={{ width: '100%', maxWidth: 420 }}>
        <CardContent sx={{ p: { xs: 3, sm: 5 } }}>
          <Stack alignItems="center" sx={{ mb: 1 }}>
            <LockIcon />
            <Typography variant="h4" component="h1" sx={{ mb: 0.5 }}>
              Welcome back
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Enter your credentials to sign in to your account
            </Typography>
          </Stack>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 4 }}>
            <Stack spacing={2.5}>
              <TextField
                label="Email address"
                type="email"
                fullWidth
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (errors.email) setErrors((p) => ({ ...p, email: undefined }))
                }}
                error={Boolean(errors.email)}
                helperText={errors.email}
                slotProps={{
                  htmlInput: { 'aria-label': 'Email address' },
                }}
              />

              <TextField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  if (errors.password) setErrors((p) => ({ ...p, password: undefined }))
                }}
                error={Boolean(errors.password)}
                helperText={errors.password}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                          onClick={() => setShowPassword((p) => !p)}
                          edge="end"
                          size="small"
                        >
                          {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                  htmlInput: { 'aria-label': 'Password' },
                }}
              />
            </Stack>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ mt: 1, mb: 3 }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    size="small"
                    sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                  />
                }
                label={
                  <Typography variant="body2" color="text.secondary">
                    Remember me
                  </Typography>
                }
              />
              <Link
                href="#"
                variant="body2"
                underline="hover"
                sx={{ fontWeight: 500, cursor: 'pointer' }}
                onClick={(e) => e.preventDefault()}
              >
                Forgot password?
              </Link>
            </Stack>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              loading={loading}
              sx={{ py: 1.5, fontSize: '1rem' }}
            >
              Sign in
            </Button>

            <Divider sx={{ my: 3 }}>
              <Typography variant="caption" color="text.secondary" sx={{ px: 1 }}>
                or
              </Typography>
            </Divider>

            <Typography variant="body2" color="text.secondary" textAlign="center">
              Don&apos;t have an account?{' '}
              <Link
                component={RouterLink}
                to='/register'
                underline="hover"
                sx={{ fontWeight: 600, cursor: 'pointer' }}
                
              >
                Sign up for free
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
    </>
  )
}
