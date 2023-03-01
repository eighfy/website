import React from "react"
import { useNavigate } from "react-router-dom"
import "./Home.scss"

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className="home-main no-select">
      <div className="page-container number-1">
        <div className="texts">
          <h1>Unlimited Space for Programmers</h1>
          <h3>Join to Our Community</h3>
          <button onClick={() => navigate("/community")}>
            Go To Community
          </button>
        </div>
        <img className="image" src="/assets/home-1.webp" alt="" />
      </div>
      <div className="page-container number-2">
        <img className="image" src="/assets/home-2.jpg" alt="" />
        <div className="texts">
          <h1>Free Documentation for Our Projects</h1>
          <h3>Programming Never Ends!</h3>
          <button onClick={() => navigate("/docs")}>Go To Docs</button>
        </div>
      </div>
      <div className="page-container number-3">
        <div className="texts">
          <h1>All Time Growing Team</h1>
          <h3>Join Us</h3>
          <button onClick={() => navigate("/team")}>Go To Team</button>
        </div>
        <img className="image" src="/assets/home-3.jpeg" alt="" />
      </div>
      <div className="page-container last">
        <span>Powered By Eighfy</span>
        <span>Copyright ©</span>
      </div>
    </div>
  )
}

export default Home
