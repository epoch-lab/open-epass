import { signupSchema } from '#/api/v1/signup'
import { signupVerifySchema } from '#/api/v1/signup-verify'
import { Button } from '@/components/button'
import { FormError } from '@/components/form-error'
import { HeroTitle } from '@/components/hero-title'
import { Link } from '@/components/link'
import { Spinner } from '@/components/spinner'
import { TextInput } from '@/components/text-input'
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
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export const Route = createFileRoute('/$appName/signup')({
  component: Page,
})

type VerifyFields = z.infer<typeof signupVerifySchema>
type SignupFields = z.infer<typeof signupSchema>

function Page() {
  const [stage, setStage] = useState<'verify' | 'signup' | 'done'>('verify')

  const navigate = useNavigate()

  const verifyForm = useForm<VerifyFields>({
    resolver: zodResolver(signupVerifySchema),
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
    },
  })

  const { appName } = Route.useParams()

  function handleEmailVerify(v: VerifyFields) {
    verifyMutation.mutate(v)
  }
  function handleSignup(v: SignupFields) {
    signupMutation.mutate(v)
  }

  return (
    <>
      <HeroTitle>注册</HeroTitle>

      <div className="px-12 text-sm leading-loose">
        <span className="opacity-50">已有回声通行证？</span>
        <Link to="/$appName/signin" params={{ appName }}>
          前往登录
        </Link>
      </div>

      <div className="px-12 mt-5 flex flex-col">
        {stage === 'verify' && (
          <>
            <TextInput
              icon={<IconMail stroke={1.5} size={18} />}
              placeholder="邮箱"
              {...verifyForm.register('email')}
            />
            <FormError error={verifyForm.formState.errors.email} />

            <Button
              onClick={verifyForm.handleSubmit(handleEmailVerify)}
              disabled={verifyMutation.isPending}
              className="mt-4"
            >
              {verifyMutation.isPending ? <Spinner /> : '发送验证码'}
            </Button>
            <button
              className="opacity-50 transition hover:opacity-100 text-sm self-center mt-2"
              onClick={verifyForm.handleSubmit(() => {
                signupForm.setValue('email', verifyForm.getValues().email)
                setStage('signup')
              })}
              disabled={verifyMutation.isPending}
            >
              已有验证码
            </button>
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
              className="mt-4"
            >
              {signupMutation.isPending ? <Spinner /> : '注册'}
            </Button>
          </>
        )}

        {stage === 'done' && (
          <>
            <IconCheck
              stroke={1}
              size={72}
              className="text-blue-500 self-center mt-12"
            />
            <p className="text-center text-sm mt-4 opacity-75">
              注册成功 (&ang;・&omega;&lt; )⌒☆
            </p>

            <Button
              onClick={() =>
                navigate({ to: '/$appName/signin', params: { appName } })
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
