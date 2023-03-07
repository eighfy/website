import React, { FC } from "react"
import { useAppSelector } from "../../app/hooks"
import { selectAuth } from "../../features/auth/authSlice"

const Authorizated: FC<{ children?: any; insteadOf?: any }> = ({
  children,
  insteadOf,
}) => {
  const auth = useAppSelector(selectAuth)
  return !!auth.authorizated ? children : insteadOf || <></>
}

export default Authorizated
