import { z } from 'zod'

export const username = z
  .string()
  .regex(/^[a-z0-9_-]*$/, '用户名只能包含小写字母、数字、-、_')
  .min(3, '用户名至少 3 个字符')
  .max(16, '用户名最长 16 个字符')

export const password = z
  .string()
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, '密码需要包含大小写字母与数字')
  .min(6, '密码最短为 6 位')
  .max(64, '密码最长为 64 位')

export const email = z.string().min(1, '邮箱不能为空').email('邮箱格式不正确')

export const displayName = z.string().min(1, '展示名称不能为空')

export const emailCode = z.string().min(1, '邮箱验证码不能为空')

export const turnstile = z.string().min(1, '请完成人机验证')
