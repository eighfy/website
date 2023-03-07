declare interface TeamMember {
  name: string
  role: string
  image: string
  social: Array<{
    type: "instagram" | "facebook" | "github" | "youtube"
    url: string
  }>
}

declare class TokenDto {
  readonly user_id: string

  readonly access_token: string

  readonly access_token_expired_in: number

  readonly refresh_token: string
}

declare class NewAccessTokenDto {
  readonly access_token: string

  readonly access_token_expired_in: number
}
