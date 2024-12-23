import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'

const { databaseUrl } = useRuntimeConfig()

const client = postgres(databaseUrl)

export const db = drizzle(client)
