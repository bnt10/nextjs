export type UserType = {
  id: string
  userName: string
  password: string
}

export type CreateUserType = Omit<UserType, 'id'> & {
  confirmPassword: string
}

export type LoginUserType = Omit<UserType, 'id'>
