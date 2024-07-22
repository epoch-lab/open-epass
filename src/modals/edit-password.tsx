import { userUpdatePasswordSchema } from '#/api/v1/user/update-password'
import { Button } from '@/components/button'
import { FormError } from '@/components/form-error'
import { Modal } from '@/components/modal'
import { Spinner } from '@/components/spinner'
import { TextInput } from '@/components/text-input'
import { $fetch, $userAuthHeader } from '@/utils/fetch'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconLock } from '@tabler/icons-react'
import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export function EditPasswordModal({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const form = useForm<z.infer<typeof userUpdatePasswordSchema>>({
    resolver: zodResolver(userUpdatePasswordSchema),
    defaultValues: {
      newPassword: '',
    },
  })

  useEffect(() => {
    open && form.reset()
  }, [form, open])

  const mutation = useMutation({
    mutationFn: (v: z.infer<typeof userUpdatePasswordSchema>) =>
      $fetch('/api/v1/user/update-password', {
        method: 'post',
        headers: $userAuthHeader(),
        body: JSON.stringify(v),
      }),
    onSuccess() {
      onOpenChange(false)
    },
  })

  function handleUpdate(v: z.infer<typeof userUpdatePasswordSchema>) {
    mutation.mutate(v)
  }

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <Modal.Title>修改密码</Modal.Title>

      <TextInput
        type="password"
        icon={<IconLock stroke={1.5} size={18} />}
        placeholder="新密码"
        {...form.register('newPassword')}
      />
      <FormError error={form.formState.errors.newPassword} />

      <div className="mt-6 flex justify-end gap-3">
        <Modal.Close asChild>
          <Button variant="ghost">取消</Button>
        </Modal.Close>
        <Button onClick={form.handleSubmit(handleUpdate)}>
          {mutation.isPending ? <Spinner /> : '更新'}
        </Button>
      </div>
    </Modal>
  )
}
