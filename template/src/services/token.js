import { currentAccount } from './user'

const getToken = async () => {
  const response = await currentAccount()
  // console.log('response', response.ma)
  if (response) {
    return response.ma
  }
  return null
}

export default getToken
