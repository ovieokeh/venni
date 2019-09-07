export interface AuthCredentials {
  name?: string
  email: string
  password: string
}

export interface UserDetails {
  id: string
  name: string
  email: string
  password: string
  avatarUrl: string
  updatedAt: Date
  createdAt: Date
}
