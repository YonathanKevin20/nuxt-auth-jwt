import bcrypt from 'bcrypt'
import { eq } from 'drizzle-orm'
import jwt from 'jsonwebtoken'
import { db } from '~/server/database/connection'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { jwtSecret } = useRuntimeConfig(event)

  const items = await db.select({
    id: users.id,
    username: users.username,
    password: users.password,
    role: users.role,
  })
  .from(users)
  .where(eq(body.username, users.username))
  .limit(1)

  if (items.length === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: 'User not found',
    })
  }

  const user = items[0]

  const isPasswordValid = await bcrypt.compare(body.password, user.password)
  if (!isPasswordValid) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid credentials',
    })
  }

  const token = jwt.sign({
    id: user.id,
    username: user.username,
    role: user.role,
  }, jwtSecret, {
    expiresIn: 60 * 60 * 12, // 12 hours
  })

  return {
    data: {
      token
    }
  }
})
