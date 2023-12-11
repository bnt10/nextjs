import axios from 'axios'

import type { CreateUserType, LoginUserType } from '@/types/users'
import axiosInstance from '@/utils/axios'

export const createUser = async (userData: CreateUserType) => {
  try {
    const response = await axiosInstance.post('/api/user', {
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
    const response = await axiosInstance.post('/api/user/login', {
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

export const logoutUser = async () => {
  try {
    const response = await axiosInstance.post('/api/user/logout')
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

export const validateAccessToken = async (accessToken: string | null) => {
  try {
    if (!accessToken) return false

    const response = await axios.post('/api//auth/validate-access-token', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!response.data) throw new Error('Token validation failed')

    const { isValid } = response.data
    return isValid
  } catch (error) {
    return false
  }
}

export const getUserInfo = async () => {
  try {
    const response = await axiosInstance.get('/api/user')

    if (response.status === 200) {
      return response.data
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
