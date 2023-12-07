import jwt from 'jsonwebtoken'

export const generateAccessToken = (userName: string) => {
  return jwt.sign({ userName }, process.env.ACCESS_TOKEN_SECRET as string, {
    expiresIn: '15m',
  })
}

export const generateRefreshToken = (userName: string) => {
  return jwt.sign({ userName }, process.env.REFRESH_TOKEN_SECRET as string, {
    expiresIn: '7d',
  })
}
export const verifyRefreshToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET as string)
  } catch (error) {
    return null
  }
}

export const refreshAccessToken = (refreshToken: string) => {
  const userData = verifyRefreshToken(refreshToken)
  if (userData) {
    // userData에서 userName 추출
    const { userName } = userData as any // 적절한 타입 캐스팅 적용

    // 새 액세스 토큰 생성
    const newAccessToken = generateAccessToken(userName)
    return newAccessToken
  }
  // 리프레시 토큰이 유효하지 않은 경우
  return null
}
