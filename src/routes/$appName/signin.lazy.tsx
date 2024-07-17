import { signinEmailSchema } from '#/api/v1/signin-email'
import { signinUsernameSchema } from '#/api/v1/signin-username'
import { Button } from '@/components/button'
import { Checkbox } from '@/components/checkbox'
import { FormError } from '@/components/form-error'
import { HeroTitle } from '@/components/hero-title'
import { Link } from '@/components/link'
import { TextInput } from '@/components/text-input'
import { $fetch } from '@/utils/fetch'
import { getValidTokenPayload, setToken } from '@/utils/token'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconArrowRight, IconLock, IconUser } from '@tabler/icons-react'
import { useMutation } from '@tanstack/react-query'
import { createLazyFileRoute } from '@tanstack/react-router'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

export const Route = createLazyFileRoute('/$appName/signin')({
  component: Page,
})

const schema = z.object({
  identity: z.string().min(1, '账号不能为空'),
  password: z.string().min(1, '密码不能为空'),
  longer: z.boolean(),
})

type Fields = z.infer<typeof schema>

function Page() {
  const { appName } = Route.useParams()

  const form = useForm<Fields>({
    defaultValues: {
      longer: true,
    },
    resolver: zodResolver(
      z.object({
        identity: z.string().min(1, '账号不能为空'),
        password: z.string().min(1, '密码不能为空'),
        longer: z.boolean(),
      })
    ),
  })

  function handleSignup(v: Fields) {
    const isEmail = z.string().email().safeParse(v.identity).success

    if (isEmail) {
      signinEmailMutatuion.mutate({
        email: v.identity,
        password: v.password,
        longer: v.longer,
      })
    } else {
      signinUsernameMutatuion.mutate({
        username: v.identity,
        password: v.password,
        longer: v.longer,
      })
    }
  }

  const signinUsernameMutatuion = useMutation({
    mutationFn: (v: z.infer<typeof signinUsernameSchema>) =>
      $fetch<string>('/api/v1/signin-username', {
        method: 'post',
        body: JSON.stringify(v),
      }),
    onSuccess: handleSigninSuccess,
    onError: handleSigninError,
  })
  const signinEmailMutatuion = useMutation({
    mutationFn: (v: z.infer<typeof signinEmailSchema>) =>
      $fetch<string>('/api/v1/signin-email', {
        method: 'post',
        body: JSON.stringify(v),
      }),
    onSuccess: handleSigninSuccess,
    onError: handleSigninError,
  })

  function handleSigninSuccess(token: string) {
    setToken(token)
    alert('登陆成功，你的 ID 是：' + getValidTokenPayload().userId)
  }

  function handleSigninError() {
    form.resetField('password')
    form.setError('password', { message: '账号或密码不正确' })
  }

  return (
    <>
      <HeroTitle>登录</HeroTitle>

      <div className="px-12 text-sm leading-loose">
        <span className="opacity-50">没有回声通行证？</span>
        <Link to="/$appName/signup" params={{ appName }}>
          前往注册
        </Link>
      </div>

      <form onSubmit={form.handleSubmit(handleSignup)}>
        <div className="px-12 mt-16 flex flex-col">
          <TextInput
            icon={<IconUser stroke={1.5} size={18} />}
            placeholder="用户名 / 邮箱"
            {...form.register('identity')}
          />
          <FormError error={form.formState.errors.identity} />

          <TextInput
            icon={<IconLock stroke={1.5} size={18} />}
            type="password"
            placeholder="密码"
            {...form.register('password')}
          />
          <FormError error={form.formState.errors.password} />

          <label className="flex gap-2 items-center text-sm self-start cursor-pointer">
            <Controller
              name="longer"
              control={form.control}
              render={({ field: { value, onChange, ...fields } }) => (
                <Checkbox
                  checked={value}
                  onCheckedChange={(v) => onChange(v)}
                  {...fields}
                />
              )}
            />
            记住我
          </label>
        </div>

        <div className="mt-8 flex flex-col items-center px-12 gap-2">
          <Button className="w-full" type="submit">
            <IconArrowRight />
          </Button>
          <Link
            to="/$appName/recovery"
            params={{ appName }}
            className="text-sm"
          >
            忘记密码
          </Link>
        </div>
      </form>
    </>
  )
}
