import { isValidPassword, passwordRegex } from './constants'

describe('Password validation tests', () => {
  // 유효한 비밀번호 테스트
  test('Valid password with mixed characters should pass', () => {
    const password = 'Abc123!@#'
    expect(isValidPassword(password, passwordRegex)).toBe(true)
  })

  // 길이 관련 테스트
  test('Password shorter than 8 characters should fail', () => {
    const password = 'Abc1!'
    expect(isValidPassword(password, passwordRegex)).toBe(false)
  })

  test('Password longer than 32 characters should fail', () => {
    const password = `${'A'.repeat(33)}1bC!`
    expect(isValidPassword(password, passwordRegex)).toBe(false)
  })

  // 문자 유형 관련 테스트
  test('Password without special characters should fail', () => {
    const password = 'Abcdefgh123'
    expect(isValidPassword(password, passwordRegex)).toBe(false)
  })

  test('Password without digits should fail', () => {
    const password = 'Abcdefgh!@#'
    expect(isValidPassword(password, passwordRegex)).toBe(false)
  })

  test('Password without alphabets should fail', () => {
    const password = '123456!@#'
    expect(isValidPassword(password, passwordRegex)).toBe(false)
  })

  // 연속된 문자 관련 테스트
  test('Password with consecutive repeating characters should fail', () => {
    const password = 'Aaa12345!'
    expect(isValidPassword(password, passwordRegex)).toBe(false)
  })

  test('Password with consecutive repeating numbers should fail', () => {
    const password = 'Abc123333!'
    expect(isValidPassword(password, passwordRegex)).toBe(false)
  })

  // 추가 정규식 테스트
  test('Different regex pattern - Only alphabets and numbers', () => {
    const newRegex = /^[A-Za-z\d]{8,32}$/
    const password = 'Abcdefgh123'
    expect(isValidPassword(password, newRegex)).toBe(true)
  })
})
