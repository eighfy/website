import classNames from "classnames"
import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Authorizated from "../../shared/Authorizated/Authorizated"
import "./Navigator.scss"

const Navigator = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    window.onscroll = () => {
      if (
        document.body.scrollTop >= 70 ||
        document.documentElement.scrollTop >= 70
      ) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
  }, [])
  return (
    <div
      className={classNames(
        "navigator no-select",
        { scrolled },
        location.pathname.split("/").filter(Boolean)[0]
      )}
    >
      <div className="links">
        <span onClick={() => navigate("/")} className="logo clickable">
          Eighfy
        </span>
        <div className="nav-links">
          <div onClick={() => navigate("/community")} className="nav-link">
            <span>Community</span>
          </div>
          <div onClick={() => navigate("/docs")} className="nav-link">
            <span>Docs</span>
          </div>
          <div onClick={() => navigate("/team")} className="nav-link">
            <span>Team</span>
          </div>
        </div>
      </div>
      <div className="settings">
        <Authorizated
          insteadOf={<button onClick={() => navigate("/auth")}>Join</button>}
        ></Authorizated>
      </div>
    </div>
  )
}

export default Navigator
