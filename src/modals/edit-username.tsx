import { username } from '#/_utils/schema'
import { useUserTokenInfo } from '@/atoms/token'
import { Button } from '@/components/button'
import { FormError } from '@/components/form-error'
import { Modal } from '@/components/modal'
import { Spinner } from '@/components/spinner'
import { TextInput } from '@/components/text-input'
import { useUpdateProfileMutation } from '@/hooks/use-update-profile-mutation'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconUser } from '@tabler/icons-react'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  newUsername: username,
})

export function EditUsernameModal({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      newUsername: '',
    },
  })

  useEffect(() => {
    open && form.reset()
  }, [form, open])

  const queryClient = useQueryClient()
  const tokenInfo = useUserTokenInfo()
  const mutation = useUpdateProfileMutation({
    onSuccess() {
      onOpenChange(false)
      queryClient.invalidateQueries({
        queryKey: ['user-profile', tokenInfo.loggedIn && tokenInfo.userId],
      })
    },
    onError(e) {
      if (e.message === 'Duplicated username') {
        form.setError('newUsername', {
          message: '用户名重复，换一个吧',
        })
      }
    },
  })

  function handleUpdate(v: z.infer<typeof schema>) {
    mutation.mutate(v)
  }

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <Modal.Title>修改用户名</Modal.Title>

      <TextInput
        icon={<IconUser stroke={1.5} size={18} />}
        placeholder="新用户名"
        {...form.register('newUsername')}
      />
      <FormError error={form.formState.errors.newUsername} />

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
