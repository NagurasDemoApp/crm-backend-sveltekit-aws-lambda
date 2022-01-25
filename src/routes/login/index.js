import { createToken } from '$lib/token-service'
import dayjs from 'dayjs'

export async function post({ request }) {
  const body = await request.json() // or request.formData();
  console.log(body)
  const { email, password } = body
  let loginResult
  if (email === 'bob@inter.net' && password === '12345') {
    loginResult = {
      email,
      firstName: 'Bob',
      lastName: 'Agent',
      role: 'agent',
      _id: '0001'
    }
  }

  loginResult.token = await createToken(loginResult.role, loginResult.email, loginResult._id)
  loginResult.expiry = dayjs().add(12, 'hours').valueOf()

  return {
    // headers: {
    //   "Access-Control-Allow-Origin": "*",
    // },
    body: loginResult
  }
}
