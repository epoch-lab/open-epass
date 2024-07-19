import { signinEmailSchema } from '#/api/v1/signin-email'
import { signinUsernameSchema } from '#/api/v1/signin-username'
import { setUserToken } from '@/atoms/token'
import { Button } from '@/components/button'
import { Checkbox } from '@/components/checkbox'
import { FormError } from '@/components/form-error'
import { HeroTitle } from '@/components/hero-title'
import { Link } from '@/components/link'
import { Spinner } from '@/components/spinner'
import { TextInput } from '@/components/text-input'
import { CLOUDFLARE_TURNSTILE_SITE_KEY } from '@/configs'
import { useConnectAppMutation } from '@/hooks/use-connect-app-mutation'
import { $fetch } from '@/utils/fetch'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconArrowRight, IconLock, IconUser } from '@tabler/icons-react'
import { useMutation } from '@tanstack/react-query'
import { createLazyFileRoute } from '@tanstack/react-router'
import { Controller, useForm } from 'react-hook-form'
import Turnstile, { useTurnstile } from 'react-turnstile'
import { z } from 'zod'

export const Route = createLazyFileRoute('/$appName/signin')({
  component: Page,
})

const schema = z.object({
  identity: z.string().min(1, '账号不能为空'),
  password: z.string().min(1, '密码不能为空'),
  longer: z.boolean(),
  turnstile: z.string().min(1, '请完成人机验证'),
})

type Fields = z.infer<typeof schema>

function Page() {
  const { appName } = Route.useParams()

  const turnstile = useTurnstile()

  const { isRedirecting, ...connectMutation } = useConnectAppMutation()

  const form = useForm<Fields>({
    defaultValues: {
      identity: '',
      password: '',
      longer: true,
      turnstile: '',
    },
    resolver: zodResolver(schema),
  })

  function handleSignup(v: Fields) {
    const isEmail = z.string().email().safeParse(v.identity).success

    if (isEmail) {
      signinEmailMutatuion.mutate({
        email: v.identity,
        password: v.password,
        longer: v.longer,
        turnstile: v.turnstile,
      })
    } else {
      signinUsernameMutatuion.mutate({
        username: v.identity,
        password: v.password,
        longer: v.longer,
        turnstile: v.turnstile,
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

  const isLoading =
    signinEmailMutatuion.isPending ||
    signinUsernameMutatuion.isPending ||
    connectMutation.isPending ||
    isRedirecting

  function handleSigninSuccess(token: string) {
    setUserToken(token)
    connectMutation.mutate({ appName })
  }

  function handleSigninError(error: Error) {
    turnstile.reset()
    form.setValue('turnstile', '')
    form.resetField('password')

    if (error.message === 'Invalid username or password') {
      form.setError('password', { message: '账号或密码不正确' })
    }
    if (error.message === 'Invalid Turnstile token') {
      form.setError('turnstile', { message: '验证无效，请重试' })
    }
  }

  function handleTurnstileVerify(token: string) {
    form.setValue('turnstile', token)
    form.clearErrors('turnstile')
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
        <div className="mt-10 flex flex-col px-12">
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

          <label className="flex cursor-pointer items-center gap-2 self-start text-sm">
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

          <Turnstile
            className="mt-4 self-center bg-[#fafafa]"
            sitekey={CLOUDFLARE_TURNSTILE_SITE_KEY}
            refreshExpired="auto"
            retry="never"
            fixedSize
            onVerify={handleTurnstileVerify}
          />
          <FormError error={form.formState.errors.turnstile} />
        </div>

        <div className="mt-4 flex flex-col items-center gap-2 px-12">
          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading ? <Spinner /> : <IconArrowRight />}
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
