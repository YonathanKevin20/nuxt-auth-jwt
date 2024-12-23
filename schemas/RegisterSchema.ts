import { z } from 'zod'

export const RegisterSchema = z.object({
  username: z.string().min(1, 'Please enter a username').regex(/^[a-zA-Z0-9_]+$/, 'Username must not contain whitespaces'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  confirm_password: z.string()
}).refine((data) => data.password === data.confirm_password, {
  message: 'Passwords do not match',
  path: ['confirm_password']
})

export type Register = z.output<typeof RegisterSchema>
