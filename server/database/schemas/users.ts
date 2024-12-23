import { sql } from 'drizzle-orm'
import { bigserial, pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const roleEnum = pgEnum('role', ['admin', 'user'])

export const users = pgTable('users', {
  id: bigserial({ mode: 'number' }).primaryKey(),
  created_at: timestamp({ withTimezone: true, mode: 'string' }).default(sql`(now() AT TIME ZONE 'utc'::text)`).notNull(),
  updated_at: timestamp({ withTimezone: true, mode: 'string' }),
  username: text().notNull(),
  password: text().notNull(),
  role: roleEnum().notNull().default('user'),
})
