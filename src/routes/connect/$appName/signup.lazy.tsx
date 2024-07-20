import { signupSchema } from '#/api/v1/signup'
import { signupVerifySchema } from '#/api/v1/signup-verify'
import { Button } from '@/components/button'
import { FormError } from '@/components/form-error'
import { HeroTitle } from '@/components/hero-title'
import { Link } from '@/components/link'
import { Spinner } from '@/components/spinner'
import { TextInput } from '@/components/text-input'
import { CLOUDFLARE_TURNSTILE_SITE_KEY } from '@/configs'
import { $fetch } from '@/utils/fetch'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  IconCheck,
  IconLock,
  IconMail,
  IconMailCheck,
  IconUser,
  IconUserStar,
} from '@tabler/icons-react'
import { useMutation } from '@tanstack/react-query'
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Turnstile from 'react-turnstile'
import { z } from 'zod'

export const Route = createLazyFileRoute('/connect/$appName/signup')({
  component: Page,
})

type VerifyFields = z.infer<typeof signupVerifySchema>
type SignupFields = z.infer<typeof signupSchema>

function Page() {
  const [stage, setStage] = useState<'verify' | 'signup' | 'done'>('verify')

  const navigate = useNavigate()

  const verifyForm = useForm<VerifyFields>({
    resolver: zodResolver(signupVerifySchema),
    defaultValues: {
      turnstile: '',
    },
  })
  const signupForm = useForm<SignupFields>({
    resolver: zodResolver(signupSchema),
  })

  const verifyMutation = useMutation({
    mutationFn: (v: VerifyFields) =>
      $fetch('/api/v1/signup-verify', {
        method: 'post',
        body: JSON.stringify(v),
      }),
    onSuccess() {
      signupForm.setValue('email', verifyForm.getValues().email)
      setStage('signup')
    },
    onError(e) {
      if (e.message === 'Invalid Turnstile token') {
        verifyForm.setError('turnstile', { message: '验证无效，请重试' })
      }
    },
  })
  const signupMutation = useMutation({
    mutationFn: (v: SignupFields) =>
      $fetch('/api/v1/signup', {
        method: 'post',
        body: JSON.stringify(v),
      }),
    onSuccess() {
      setStage('done')
    },
    onError(e) {
      if (e.message === 'Duplicated username') {
        signupForm.setError('username', { message: '用户名重复，换一个吧' })
      }
      if (e.message === 'Invalid email code') {
        signupForm.setError('emailCode', { message: '邮箱验证码不正确' })
      }
    },
  })

  const { appName } = Route.useParams()

  function handleEmailVerify(v: VerifyFields) {
    verifyMutation.mutate(v)
  }
  function handleSignup(v: SignupFields) {
    signupMutation.mutate(v)
  }
  function handleTurnstileVerify(token: string) {
    verifyForm.setValue('turnstile', token)
    verifyForm.clearErrors('turnstile')
  }

  return (
    <>
      <HeroTitle>注册</HeroTitle>

      <div className="px-12 text-sm leading-loose">
        <span className="opacity-50">已有回声通行证？</span>
        <Link to="/connect/$appName/signin" params={{ appName }}>
          前往登录
        </Link>
      </div>

      <div className="mt-3 flex flex-col px-12">
        {stage === 'verify' && (
          <>
            <TextInput
              icon={<IconMail stroke={1.5} size={18} />}
              placeholder="邮箱"
              {...verifyForm.register('email')}
            />
            <FormError error={verifyForm.formState.errors.email} />

            <Turnstile
              className="self-center bg-[#fafafa]"
              sitekey={CLOUDFLARE_TURNSTILE_SITE_KEY}
              refreshExpired="auto"
              retry="never"
              fixedSize
              onVerify={handleTurnstileVerify}
            />
            <FormError error={verifyForm.formState.errors.turnstile} />

            <Button
              onClick={verifyForm.handleSubmit(handleEmailVerify)}
              disabled={verifyMutation.isPending}
              className="mt-4"
            >
              {verifyMutation.isPending ? <Spinner /> : '发送验证码'}
            </Button>
          </>
        )}

        {stage === 'signup' && (
          <>
            <TextInput
              icon={<IconMail stroke={1.5} size={18} />}
              placeholder="邮箱"
              disabled
              {...signupForm.register('email')}
            />
            <FormError error={signupForm.formState.errors.email} />

            <TextInput
              icon={<IconMailCheck stroke={1.5} size={18} />}
              placeholder="邮箱验证码"
              {...signupForm.register('emailCode')}
            />
            <FormError error={signupForm.formState.errors.emailCode} />

            <TextInput
              icon={<IconUser stroke={1.5} size={18} />}
              placeholder="用户名"
              {...signupForm.register('username')}
            />
            <FormError error={signupForm.formState.errors.username} />

            <TextInput
              icon={<IconUserStar stroke={1.5} size={18} />}
              placeholder="展示名称"
              {...signupForm.register('displayName')}
            />
            <FormError error={signupForm.formState.errors.displayName} />

            <TextInput
              icon={<IconLock stroke={1.5} size={18} />}
              placeholder="密码"
              type="password"
              {...signupForm.register('password')}
            />
            <FormError error={signupForm.formState.errors.password} />

            <Button
              onClick={signupForm.handleSubmit(handleSignup)}
              disabled={signupMutation.isPending}
              className="mt-2"
            >
              {signupMutation.isPending ? <Spinner /> : '注册'}
            </Button>
            <button
              className="mt-2 self-center text-sm opacity-50 transition hover:opacity-100"
              onClick={verifyForm.handleSubmit(() => {
                setStage('verify')
              })}
              disabled={signupMutation.isPending}
            >
              返回
            </button>
          </>
        )}

        {stage === 'done' && (
          <>
            <IconCheck
              stroke={1}
              size={72}
              className="mt-12 self-center text-blue-500"
            />
            <p className="mt-4 text-center text-sm opacity-75">
              注册成功 (&ang;・&omega;&lt; )⌒☆
            </p>

            <Button
              onClick={() =>
                navigate({
                  to: '/connect/$appName/signin',
                  params: { appName },
                })
              }
              className="mt-8"
            >
              前往登录
            </Button>
          </>
        )}
      </div>
    </>
  )
}
