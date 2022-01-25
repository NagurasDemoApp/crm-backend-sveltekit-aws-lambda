import { checkToken } from '$lib/token-service'
export async function handle({ event, resolve }) {
  let response;
  const start = Date.now()
  const init = {
    status: 200,
    statusText: 'OK',
    headers: {
      "X-Type": "normal",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "content-type, Authorization"
    }
  }
  if (event.request.method === 'OPTIONS') {
    init.headers["X-Type"] = "options"
    return new Response(null, init)
  } else {
    // Check if there is and Authorization header with a token
    // and if that token is valid. Else return 401
    const url = new URL(event.request.url)
    const path = url.pathname
    if (!path.includes('/login') && !path.includes('/register') && path !== '/') {
      const token = event.request.headers.get('Authorization')
      if (token) {
        const tokenResult = await checkToken(token)
        if (!tokenResult) {
          init.status = 401
          init.statusText = 'Unauthorized'
          init.headers["X-Type"] = "invalid"
          return new Response('Bad token, maybe expired', init)
        }
      } else {
        init.status = 401
        init.statusText = 'Unauthorized'
        init.headers["X-Type"] = "no-token"
        return new Response('No Authorization header found', init)
      }
    }
  }
  response = await resolve(event);
  const duration = Date.now() - start
  response.headers.set('X-Duration', duration.toString())
  response.headers.set("X-Type", "true");
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Headers", "content-type, Authorization");
  response.headers.set("Access-Control-Expose-Headers", "X-Duration")
  return response;
}
