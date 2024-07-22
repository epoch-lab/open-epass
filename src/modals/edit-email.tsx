import { userUpdateEmailSchema } from '#/api/v1/user/update-email'
import { userUpdateEmailVerifySchema } from '#/api/v1/user/update-email-verify'
import { useUserTokenInfo } from '@/atoms/token'
import { Button } from '@/components/button'
import { FormError } from '@/components/form-error'
import { Modal } from '@/components/modal'
import { Spinner } from '@/components/spinner'
import { TextInput } from '@/components/text-input'
import { Turnstile } from '@/components/turnstile'
import { $fetch, $userAuthHeader } from '@/utils/fetch'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconMail, IconMailCheck } from '@tabler/icons-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTurnstile } from 'react-turnstile'
import { z } from 'zod'

export function EditEmailModal({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [stage, setStage] = useState<'verify' | 'update'>('verify')

  const turnstile = useTurnstile()
  const queryClient = useQueryClient()
  const tokenInfo = useUserTokenInfo()

  const verifyForm = useForm<z.infer<typeof userUpdateEmailVerifySchema>>({
    resolver: zodResolver(userUpdateEmailVerifySchema),
    defaultValues: {
      newEmail: '',
      turnstile: '',
    },
  })
  const updateForm = useForm<z.infer<typeof userUpdateEmailSchema>>({
    resolver: zodResolver(userUpdateEmailSchema),
    defaultValues: {
      newEmail: '',
      newEmailCode: '',
    },
  })

  useEffect(() => {
    if (open) {
      setStage('verify')
      verifyForm.reset()
      updateForm.reset()
    }
  }, [open, updateForm, verifyForm])

  const verifyMutation = useMutation({
    mutationFn: (v: z.infer<typeof userUpdateEmailVerifySchema>) =>
      $fetch('/api/v1/user/update-email-verify', {
        method: 'post',
        headers: $userAuthHeader(),
        body: JSON.stringify(v),
      }),
    onSuccess() {
      updateForm.setValue('newEmail', verifyForm.getValues().newEmail)
      setStage('update')
    },
    onError(e) {
      turnstile.reset()
      verifyForm.setValue('turnstile', '')

      if (e.message === 'Invalid Turnstile token') {
        verifyForm.setError('turnstile', { message: '验证无效，请重试' })
      }
    },
  })
  const updateMutation = useMutation({
    mutationFn: (v: z.infer<typeof userUpdateEmailSchema>) =>
      $fetch('/api/v1/user/update-email', {
        method: 'post',
        headers: $userAuthHeader(),
        body: JSON.stringify(v),
      }),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['user-profile', tokenInfo.loggedIn && tokenInfo.userId],
      })
      onOpenChange(false)
    },
    onError(e) {
      if (e.message === 'Invalid email code') {
        updateForm.setError('newEmailCode', { message: '邮箱验证码不正确' })
      }
    },
  })

  function handleTurnstileVerify(token: string) {
    verifyForm.setValue('turnstile', token)
    verifyForm.clearErrors('turnstile')
  }
  function handleVerify(v: z.infer<typeof userUpdateEmailVerifySchema>) {
    verifyMutation.mutate(v)
  }
  function handleUpdate(v: z.infer<typeof userUpdateEmailSchema>) {
    updateMutation.mutate(v)
  }

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <Modal.Title>修改邮箱</Modal.Title>

      {stage === 'verify' && (
        <>
          <TextInput
            icon={<IconMail stroke={1.5} size={18} />}
            placeholder="新邮箱"
            {...verifyForm.register('newEmail')}
          />
          <FormError error={verifyForm.formState.errors.newEmail} />

          <Turnstile onVerify={handleTurnstileVerify} />
          <FormError error={verifyForm.formState.errors.turnstile} />
        </>
      )}

      {stage === 'update' && (
        <>
          <TextInput
            icon={<IconMail stroke={1.5} size={18} />}
            placeholder="新邮箱"
            {...updateForm.register('newEmail')}
            disabled
          />
          <FormError error={updateForm.formState.errors.newEmail} />

          <TextInput
            icon={<IconMailCheck stroke={1.5} size={18} />}
            placeholder="邮箱验证码"
            {...updateForm.register('newEmailCode')}
          />
          <FormError error={updateForm.formState.errors.newEmailCode} />
        </>
      )}

      <div className="mt-6 flex justify-end gap-3">
        <Modal.Close asChild>
          <Button variant="ghost">取消</Button>
        </Modal.Close>
        {stage === 'verify' && (
          <Button onClick={verifyForm.handleSubmit(handleVerify)}>
            {verifyMutation.isPending ? <Spinner /> : '发送验证码'}
          </Button>
        )}
        {stage === 'update' && (
          <Button onClick={updateForm.handleSubmit(handleUpdate)}>
            {updateMutation.isPending ? <Spinner /> : '更新'}
          </Button>
        )}
      </div>
    </Modal>
  )
}
