import Button from '../common/Button'

const GitHubLoginButton = () => {
  const handler = async () => {
    window.open(
      'https://github.com/login/oauth/authorize?client_id=0326995a3b4e83d18660?redirect_uri=""'
    )
  }
  return (
    <li className="flex list-none justify-center">
      <Button
        className={'text-center'}
        title={'GitHub Login'}
        handler={handler}
      />
    </li>
  )
}

export default GitHubLoginButton
