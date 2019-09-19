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
  createdAt: Date
  updatedAt: Date
  iat?: number
  dataValues?: UserDetails
}

export interface Invite {
  id: string
  email: string
  name: string
  avatarUrl: string
  dataValues?: any
}
