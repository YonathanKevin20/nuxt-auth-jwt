import bcrypt from 'bcrypt'
import { db } from '~/server/database/connection'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  try {
    await db.insert(users)
    .values({
      username: body.username,
      password: await bcrypt.hash(body.password, 10),
    })

    setResponseStatus(event, 201)
    return {
      message: 'Successfully registered'
    }
  } catch (error: any) {
    console.error(error)
    throw createError({
      statusCode: error.status,
      statusMessage: error.message || error.data?.message || 'Internal Server Error',
    })
  }
})
