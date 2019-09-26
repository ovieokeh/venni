export interface ErrorMatcher {
  [x: string]: string
}

// signup error codes
export const AUTH_INVALID_EMAIL = 'auth/invalid-email'
export const AUTH_CONFLICTING_EMAIL = 'auth/email-already-in-use'
export const AUTH_WEAK_PASSWORD = 'auth/weak-password'

// signin error codes
export const AUTH_USER_DISABLED = 'auth/user-disabled'
export const AUTH_USER_NOT_FOUND = 'auth/user-not-found'
export const AUTH_USER_WRONG_PASSWORD = 'auth/wrong-password'
