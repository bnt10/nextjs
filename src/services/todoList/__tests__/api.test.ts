import axios from 'axios'
import moment from 'moment'

import { getTodoTask } from '../api'

jest.mock('axios')
jest.mock('moment')

const mockedAxios = axios as jest.Mocked<typeof axios>

const mockedMoment = moment as jest.MockedFunction<typeof moment>

describe('getTodoTask', () => {
  it('should return todo task when API call is successful', async () => {
    const mockData = {
      id: '1',
      userId: 'user1',
      title: 'Test Title',
      description: 'Test Description',
      categoryId: 'cat1',
      priority: 'high',
      isCompleted: false,
      targetDay: '2021-01-01T00:00:00Z',
    }
    mockedAxios.get.mockResolvedValueOnce({ data: mockData })
    mockedMoment.mockReturnValueOnce(moment('2021-01-01'))

    const result = await getTodoTask('1')

    expect(result).toEqual({
      id: '1',
      userId: 'user1',
      title: 'Test Title',
      description: 'Test Description',
      categoryId: 'cat1',
      priority: 'high',
      isCompleted: false,
      targetDay: '2021-01-01',
    })
  })

  it('should throw an error when API call fails', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('API call failed'))

    await expect(getTodoTask('1')).rejects.toThrow('API call failed')
  })

  it('should throw an error when no data is returned', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: null })

    await expect(getTodoTask('1')).rejects.toThrow('No data available')
  })
})
