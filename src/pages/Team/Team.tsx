import React from "react"
import Card from "./Card/Card"
import "./Team.sass"

const TeamMembers: TeamMember[] = [
  {
    name: "Dann",
    role: "Web Developer",
    social: [
      { type: "facebook", url: "" },
      { type: "github", url: "" },
      { type: "youtube", url: "" },
      { type: "instagram", url: "" },
    ],
    image:
      "https://img1.goodfon.ru/original/1280x1024/1/94/gadkiy-ya-despicable-me-2.jpg",
  },
  {
    name: "Aren",
    role: "Web Developer",
    social: [],
    image:
      "https://media.baamboozle.com/uploads/images/80257/1594912379_113588",
  },
]

const Team = () => {
  return (
    <div className="team-main">
      {TeamMembers.map((member) => (
        <Card member={member} key={member.name} />
      ))}
    </div>
  )
}

export default Team
