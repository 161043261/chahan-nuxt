import type { JWTPayload } from 'jose'

export interface AuthPayload extends JWTPayload {
  // iss?: string            // JWT Issuer
  // sub?: string            // JWT Subject
  // aud?: string | string[] // JWT Audience
  // jti?: string            // JWT ID
  // nbf?: number            // JWT Not Before
  // exp?: number            // JWT Expiration Time
  // iat?: number            // JWT Issued At
  username?: string
}
