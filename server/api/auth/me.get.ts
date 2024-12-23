import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  const { jwtSecret } = useRuntimeConfig(event)

  const authorization = getRequestHeader(event, 'authorization')
  if (!authorization) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  const token = authorization.replace('Bearer ', '')

  const decoded = jwt.verify(token, jwtSecret)
  if (!decoded) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid token',
    })
  }

  return {
    data: decoded
  }
})
