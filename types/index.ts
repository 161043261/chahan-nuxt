import type { JWTPayload } from 'jose'

export interface AuthPayload extends JWTPayload {
  email?: string
}

export interface User {
  username: string
  password: string
}
