declare interface TeamMember {
  name: string
  role: string
  image: string
  social: Array<{
    type: "instagram" | "facebook" | "github" | "youtube"
    url: string
  }>
}
