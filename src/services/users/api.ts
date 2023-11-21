import axios from 'axios'

import type { CreateUserType, LoginUserType } from '@/types/users'

export const createUser = async (userData: CreateUserType) => {
  try {
    const response = await axios.post('/api/user', {
      userData,
    })
    if (response.status === 200) {
      return {
        status: 200,
        data: response.data,
      }
    }
    return {
      status: 500,
      data: 'Internal Server Error',
    }
  } catch (error: any) {
    if (error.response) {
      return error.response
    }
    return {
      status: 500,
      data: 'Internal Server Error',
    }
  }
}

export const loginUser = async (userData: LoginUserType) => {
  try {
    const response = await axios.post('/api/user/login', {
      userData,
    })
    if (response.status === 200) {
      return {
        status: 200,
        data: response.data,
      }
    }
    return {
      status: 500,
      data: 'Internal Server Error',
    }
  } catch (error: any) {
    if (error.response) {
      return error.response
    }
    return {
      status: 500,
      data: 'Internal Server Error',
    }
  }
}
