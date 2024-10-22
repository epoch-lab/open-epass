import { displayName } from '#/_utils/schema'
import { useUserTokenInfo } from '@/atoms/token'
import { Button } from '@/components/button'
import { FormError } from '@/components/form-error'
import { Modal } from '@/components/modal'
import { Spinner } from '@/components/spinner'
import { TextInput } from '@/components/text-input'
import { useUpdateProfileMutation } from '@/hooks/use-update-profile-mutation'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconUserStar } from '@tabler/icons-react'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  newDisplayName: displayName,
})

export function EditDisplayNameModal({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      newDisplayName: '',
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
  })

  function handleUpdate(v: z.infer<typeof schema>) {
    mutation.mutate(v)
  }

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <Modal.Title>修改展示名称</Modal.Title>

      <TextInput
        icon={<IconUserStar stroke={1.5} size={18} />}
        placeholder="新展示名称"
        {...form.register('newDisplayName')}
      />
      <FormError error={form.formState.errors.newDisplayName} />

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
