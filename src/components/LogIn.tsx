import React, { useState } from "react"
import { auth } from "../firebase/firebase"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth"
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import "../styles/Login.scss"

interface AuthFormProps {
  onAuthSuccess: (user: any) => void
}

const AuthForm: React.FC<AuthFormProps> = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [resetMsg, setResetMsg] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    try {
      let userCredential
      if (isLogin) {
        userCredential = await signInWithEmailAndPassword(auth, email, password)
      } else {
        userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        )
        if (auth.currentUser && username) {
          await updateProfile(auth.currentUser, { displayName: username })
        }
      }
      onAuthSuccess(userCredential.user)
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handlePasswordReset = async () => {
    setError("")
    setResetMsg("")
    if (!email) {
      setError("Please enter your email to reset password.")
      return
    }
    try {
      await sendPasswordResetEmail(auth, email)
      setResetMsg("Password reset email sent!")
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <Box className="auth-form">
      <Typography variant="h5" className="auth-title">
        {isLogin ? "Login" : "Sign Up"}
      </Typography>

      <form onSubmit={handleSubmit} className="auth-form-fields">
        {!isLogin && (
          <TextField
            label="Username"
            variant="filled"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="auth-input"
          />
        )}

        <TextField
          label="Email"
          variant="filled"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="auth-input"
        />

        <TextField
          label="Password"
          variant="filled"
          type={showPassword ? "text" : "password"}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="auth-input"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {error && <Typography className="auth-error">{error}</Typography>}
        {resetMsg && (
          <Typography className="auth-success">{resetMsg}</Typography>
        )}

        <Button type="submit" variant="contained" className="auth-submit">
          {isLogin ? "Login" : "Sign Up"}
        </Button>
      </form>

      {isLogin && (
        <Button onClick={handlePasswordReset} className="auth-reset">
          Forgot my password?
        </Button>
      )}

      <Box className="auth-toggle">
        <Button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Create an account" : "Already have an account?"}
        </Button>
      </Box>
    </Box>
  )
}

export default AuthForm
