import { ValidatorInput } from "@onlydann/react-validator"
import { Validator, ValidatorForm } from "@onlydann/validator-form"
import React, { useState } from "react"
import { useAppDispatch } from "../../app/hooks"
import { addMessage } from "../../features/message/messageSlice"
import "./Auth.sass"

const validator = new ValidatorForm({
  username: new Validator("", [
    Validator.required,
    Validator.minLength(4),
    Validator.maxLength(32),
    Validator.pattern(/[a-z_.]/g),
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

  function confirm() {
    const sendErr = (content: string) =>
      dispatch(addMessage({ time: 3000, content, type: "error" }))
    if (!validator.valid && !loginMode) {
      if (validator.errors.email) {
        sendErr("Email must contain latin letters and ._@")
      } else if (validator.errors.username) {
        sendErr("Username must contain length 4-16 symbols, _. and a-z")
      } else if (validator.errors.password) {
        sendErr(
          "Password must contain minimum length 4 symbols, lowercase and uppercase letters and numbers"
        )
      }
      return
    }

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
            <span>Username</span>
            <ValidatorInput
              placeholder="dann_the_dann"
              validator={validator.fields.username}
              type="text"
            />
          </div>
          {!loginMode && (
            <div className="container">
              <span>Email</span>
              <ValidatorInput
                placeholder="example@gmail.com"
                validator={validator.fields.email}
                type="email"
              />
            </div>
          )}
          <div className="container">
            <span>Password</span>
            <ValidatorInput
              placeholder="secret.."
              validator={validator.fields.password}
              type="password"
            />
          </div>
        </div>
        <div className="main-container-child buttons">
          <button onClick={(e) => confirm()}>Confirm</button>
          <span className="clickable">Forgot your Password?</span>
        </div>
      </div>
    </div>
  )
}

export default Auth
