import axios from 'axios'
import { useQuery } from 'react-query'

export default function Todo() {
  const fetchUser = async () => {
    const { data } = await axios.get('/api/account/user')

    return data
  }

  const { isLoading, error, data } = useQuery('user', fetchUser)

  if (isLoading) return 'Loading...'

  if (error) return `An error has occurred: ${error}`

  return (
    <div>
      <h1>User ID: {data.user?.id}</h1>
    </div>
  )
}
