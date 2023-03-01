import { Typography } from "@mui/material"
import React, { FC } from "react"
import GitHubIcon from "@mui/icons-material/GitHub"
import FacebookIcon from "@mui/icons-material/Facebook"
import InstagramIcon from "@mui/icons-material/Instagram"
import YouTubeIcon from "@mui/icons-material/YouTube"
import "./Card.scss"

const Card: FC<{ member: TeamMember }> = ({ member }) => {
  return (
    <div className="card">
      <img src={member.image} alt={member.name} className="avatar" />
      <div className="container">
        <Typography variant="h3" className="name">
          {member.name}
        </Typography>
        <Typography color="grey" className="name">
          {member.role}
        </Typography>
        <div className="social">
          {member.social.map((social) => {
            const Icon = getIcon(social.type)
            return (
              <Icon
                onClick={() => window.open(social.url)}
                className="clickable"
                key={social.type}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Card

function getIcon(type: string) {
  switch (type) {
    case "instagram":
      return InstagramIcon

    case "youtube":
      return YouTubeIcon

    case "github":
      return GitHubIcon

    case "facebook":
      return FacebookIcon
  }
}
