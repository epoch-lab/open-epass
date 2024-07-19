import { recoverySchema } from '#/api/v1/recovery'
import { recoveryVerifySchema } from '#/api/v1/recovery-verify'
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
} from '@tabler/icons-react'
import { useMutation } from '@tanstack/react-query'
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Turnstile from 'react-turnstile'
import { z } from 'zod'

export const Route = createLazyFileRoute('/$appName/recovery')({
  component: Page,
})

type VerifyFields = z.infer<typeof recoveryVerifySchema>
type RecoveryFields = z.infer<typeof recoverySchema>

function Page() {
  const [stage, setStage] = useState<'verify' | 'recovery' | 'done'>('verify')

  const navigate = useNavigate()

  const verifyForm = useForm<VerifyFields>({
    resolver: zodResolver(recoveryVerifySchema),
    defaultValues: {
      turnstile: '',
    },
  })
  const recoveryForm = useForm<RecoveryFields>({
    resolver: zodResolver(recoverySchema),
  })

  const verifyMutation = useMutation({
    mutationFn: (v: VerifyFields) =>
      $fetch('/api/v1/recovery-verify', {
        method: 'post',
        body: JSON.stringify(v),
      }),
    onSuccess() {
      recoveryForm.setValue('email', verifyForm.getValues().email)
      setStage('recovery')
    },
    onError(e) {
      if (e.message === 'Invalid Turnstile token') {
        verifyForm.setError('turnstile', {
          message: '验证无效，请重试',
        })
      }
    },
  })
  const recoveryMutation = useMutation({
    mutationFn: (v: RecoveryFields) =>
      $fetch('/api/v1/recovery', {
        method: 'post',
        body: JSON.stringify(v),
      }),
    onSuccess() {
      setStage('done')
    },
    onError(e) {
      if (e.message === 'Invalid email code') {
        recoveryForm.setError('emailCode', { message: '邮箱验证码不正确' })
      }
    },
  })

  const { appName } = Route.useParams()

  function handleEmailVerify(v: VerifyFields) {
    verifyMutation.mutate(v)
  }
  function handleRecovery(v: RecoveryFields) {
    recoveryMutation.mutate(v)
  }
  function handleTurnstileVerify(token: string) {
    verifyForm.setValue('turnstile', token)
    verifyForm.clearErrors('turnstile')
  }

  return (
    <>
      <HeroTitle>重置密码</HeroTitle>

      <div className="px-12 text-sm leading-loose">
        <span className="opacity-50">想起来了？</span>
        <Link to="/$appName/signin" params={{ appName }}>
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

        {stage === 'recovery' && (
          <>
            <TextInput
              icon={<IconMail stroke={1.5} size={18} />}
              placeholder="邮箱"
              disabled
              {...recoveryForm.register('email')}
            />
            <FormError error={recoveryForm.formState.errors.email} />

            <TextInput
              icon={<IconMailCheck stroke={1.5} size={18} />}
              placeholder="邮箱验证码"
              {...recoveryForm.register('emailCode')}
            />
            <FormError error={recoveryForm.formState.errors.emailCode} />

            <TextInput
              icon={<IconLock stroke={1.5} size={18} />}
              placeholder="新密码"
              type="password"
              {...recoveryForm.register('newPassword')}
            />
            <FormError error={recoveryForm.formState.errors.newPassword} />

            <Button
              onClick={recoveryForm.handleSubmit(handleRecovery)}
              disabled={recoveryMutation.isPending}
              className="mt-2"
            >
              {recoveryMutation.isPending ? <Spinner /> : '重置'}
            </Button>
            <button
              className="mt-2 self-center text-sm opacity-50 transition hover:opacity-100"
              onClick={verifyForm.handleSubmit(() => {
                setStage('verify')
              })}
              disabled={recoveryMutation.isPending}
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
            <p className="mt-4 text-center text-sm opacity-75">密码重置成功</p>

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
