// import jwt from 'jsonwebtoken'
import jwt from '@tsndr/cloudflare-worker-jwt'
const {sign, verify} = jwt
const jwtSecret = 'dgsrtehyjrty6agfr45g56yh'

const createToken = (role, username, id) => {
  return sign(
    {
      data: `crm,${role},${username},${id}`
    },
    jwtSecret,
    { expiresIn: '12h' }
  )
  // }, jwtSecret, {expiresIn: '12h'})
}

// Used in Admin app
const checkToken = (token) => {
  const tkn = token
  try {
    const decoded = verify(tkn, jwtSecret)
    return { payload: decoded, error: null }
  } catch (ex) {
    return { payload: null, error: ex.message }
  }
}

export {createToken, checkToken}
