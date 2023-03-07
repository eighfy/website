import { VisibilityOff, Visibility, ErrorSharp } from "@mui/icons-material"
import {
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormControl,
  TextField,
} from "@mui/material"
import { Validator, ValidatorForm } from "@onlydann/validator-form"
import { AxiosResponse } from "axios"
import { MuiOtpInput } from "mui-one-time-password-input"
import React, { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  fetchCurrentUser,
  selectAuth,
  setTokens,
} from "../../features/auth/authSlice"
import { addMessage } from "../../features/message/messageSlice"
import useFetch from "../../hooks/useFetch"
import "./ResetPassword.scss"

const validator = new ValidatorForm({
  email: new Validator("", [Validator.email]),
  password: new Validator("", [
    Validator.password(4, { bothCases: false, numbers: false, symbols: false }),
  ]),
})

const ResetPassword = () => {
  const navigate = useNavigate()
  const [confirm, setConfirm] = useState(false)
  const auth = useAppSelector(selectAuth)
  const dispatch = useAppDispatch()
  const request = useFetch()
  const [email, setEmail] = useState<$string>($(""))
  const [password, setPassword] = useState<$string>($(""))
  const [otp, setOtp] = useState("")
  const [showPassword, setShowPassword] = React.useState(false)
  const [focusPassword, setFocusPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  const emailError = !$(validator.errors.email || {}).$empty()

  function requestReset() {
    console.log(email)
    request(
      {
        endpoint: "/api/auth/reset/password/email",
        onSuccess() {
          setConfirm(true)
        },
        onError() {
          dispatch(
            addMessage({
              type: "error",
              content: "Account not found",
              time: 2000,
            })
          )
        },
      },
      { query: { email } }
    )
  }

  function verifyPassword() {
    if (otp.length !== 6)
      return dispatch(
        addMessage({
          type: "error",
          content: "Invalid code",
          time: 2000,
        })
      )

    console.log(validator.errors.password)
    if (!$(validator.errors.password || {}).$empty())
      return dispatch(
        addMessage({
          type: "error",
          content: "Minimum password length is 4 symbols",
          time: 2000,
        })
      )

    request(
      {
        endpoint: "/api/auth/reset/password/email",
        onSuccess() {
          dispatch(
            addMessage({
              type: "success",
              content: "New Password successfully created",
              time: 2000,
              onClose() {
                navigate("/auth")
              },
            })
          )
        },
        onError(reason) {
          dispatch(
            addMessage({
              type: "error",
              content: "Invalid code",
              time: 2000,
            })
          )
        },
      },
      { method: "PUT", body: { password, email, safe_code: otp } }
    )
  }

  return (
    <div className="rp-bg">
      <div className="main-container">
        <div className="main-container-child logos">
          <span>Eighfy</span>
          <span>Password Recovery</span>
        </div>
        <div className="main-container-child inputs">
          {confirm ? (
            <>
              <span>
                We have sent you 6-digits code to your email {email.shorten(6)}
              </span>
              <MuiOtpInput
                length={6}
                value={otp}
                onChange={(val) => {
                  setOtp(val)
                }}
                onComplete={() => {
                  setFocusPassword(true)
                }}
                validateChar={(char, i) => !isNaN(+char)}
              />
              <span>Now enter your new password</span>
              <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  ref={(input: any) => input && focusPassword && input.focus()}
                  value={password}
                  onChange={(e) => {
                    validator.change("password", e.target.value)
                    setPassword($(e.target.value))
                  }}
                  color="secondary"
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
            </>
          ) : (
            <>
              <span>Please, enter the email of your account</span>
              <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
                <TextField
                  value={email}
                  error={emailError}
                  helperText={emailError && "Incorrect email"}
                  onChange={(e) => {
                    validator.change("email", e.target.value)
                    setEmail($(e.target.value))
                  }}
                  color="secondary"
                  id="outlined-adornment-email"
                  type="email"
                  label="Email"
                />
              </FormControl>
            </>
          )}
        </div>
        <div className="main-container-child buttons">
          {confirm ? (
            <>
              <button onClick={() => verifyPassword()}>Verify Password</button>
              <span className="clickable">Didn't get the code? Send new!</span>
            </>
          ) : (
            <>
              <button onClick={() => requestReset()}>Reset Password</button>
              <span className="clickable" onClick={() => navigate("/auth")}>
                Go back to Login
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
