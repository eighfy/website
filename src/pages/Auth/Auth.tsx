import { VisibilityOff, Visibility } from "@mui/icons-material"
import {
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormControl,
  TextField,
} from "@mui/material"
import { Validator, ValidatorForm } from "@onlydann/validator-form"
import React, { useEffect, useState } from "react"
import { useAppDispatch } from "../../app/hooks"
import { addMessage } from "../../features/message/messageSlice"
import "./Auth.scss"

const validator = new ValidatorForm({
  username: new Validator("", [
    Validator.required,
    Validator.minLength(4),
    Validator.maxLength(32),
  ]),
  email: new Validator("", [Validator.email]),
  password: new Validator("", [
    Validator.required,
    Validator.password(4, { bothCases: true, numbers: true }),
  ]),
})

const Auth = () => {
  const [loginMode, setLoginMode] = useState(true)
  const dispatch = useAppDispatch()

  const [showPassword, setShowPassword] = React.useState(false)
  const [typeField, setTypeField] = useState<string>()

  const [errors, setErrors] = useState({
    username: null,
    password: null,
    email: null,
  })

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  useEffect(() => {
    if (!loginMode) {
      const _errors = { ...errors }
      const type = typeField?.split("-")[0]
      const vErrors = validator.errors
      switch (type) {
        case "email": {
          if (vErrors.email && Object.values(vErrors.email).length) {
            _errors.email = "Email must contain latin letters and ._@"
          } else _errors.email = null
          break
        }

        case "password": {
          if (vErrors.password && Object.values(vErrors.password).length) {
            _errors.password =
              "Password must contain minimum length 4 symbols, lowercase and uppercase letters and numbers"
          } else _errors.password = null
          break
        }

        case "username": {
          if (vErrors.username && Object.values(vErrors.username).length) {
            _errors.username =
              "Username must contain length 4-32 symbols, _. and a-z"
          } else _errors.username = null
          break
        }

        default:
          break
      }

      setErrors(_errors)
    }
  }, [typeField])

  function confirm() {
    const sendErr = (content: string) =>
      dispatch(addMessage({ time: 3000, content, type: "error" }))

    dispatch(
      addMessage({
        time: 3000,
        content: "Redirecting",
        type: "success",
      })
    )
  }
  return (
    <div className="auth-bg">
      <div className="main-container">
        <div className="main-container-child logos">
          <span>Eighfy</span>
          <span>
            {loginMode ? (
              "Sign In"
            ) : (
              <strong onClick={() => setLoginMode(true)} className="clickable">
                Sign In
              </strong>
            )}{" "}
            |{" "}
            {loginMode ? (
              <strong onClick={() => setLoginMode(false)} className="clickable">
                Sign Up
              </strong>
            ) : (
              "Sign Up"
            )}
          </span>
        </div>
        <div className="main-container-child inputs">
          <div className="container">
            <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
              <TextField
                value={validator.fields.username.currentValue}
                error={!!errors.username && !loginMode}
                helperText={errors.username ? errors.username : ""}
                onChange={(e) => {
                  if (e.target.value.replaceAll(/^[a-z._]+$/g, "").length) {
                    e.preventDefault()
                    return
                  }
                  validator.change("username", e.target.value)
                  setTypeField("username-" + Math.random())
                }}
                color="secondary"
                id="outlined-adornment-username"
                type="text"
                label="Username"
              />
            </FormControl>
          </div>
          {!loginMode && (
            <div className="container">
              <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
                <TextField
                  value={validator.fields.email.currentValue}
                  error={!!errors.email && !loginMode}
                  helperText={errors.email}
                  onChange={(e) => {
                    validator.change("email", e.target.value)
                    setTypeField("email-" + Math.random())
                  }}
                  color="secondary"
                  id="outlined-adornment-email"
                  type="email"
                  label="Email"
                />
              </FormControl>
            </div>
          )}
          <div className="container">
            <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                value={validator.fields.password.currentValue}
                onChange={(e) => {
                  validator.change("password", e.target.value)
                  setTypeField("password-" + Math.random())
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
          </div>
        </div>
        <div className="main-container-child buttons">
          <button onClick={() => confirm()}>Confirm</button>
          <span className="clickable">Forgot your Password?</span>
        </div>
      </div>
    </div>
  )
}

export default Auth
