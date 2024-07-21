import { Button } from '@/components/button'
import { FormError } from '@/components/form-error'
import { Modal } from '@/components/modal'
import { TextInput } from '@/components/text-input'
import { IconUserStar } from '@tabler/icons-react'

export function EditDisplayNameModal({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <Modal.Title>修改展示名称</Modal.Title>

      <TextInput
        icon={<IconUserStar stroke={1.5} size={18} />}
        placeholder="新展示名称"
      />
      <FormError />

      <div className="mt-6 flex justify-end gap-3">
        <Modal.Close>
          <Button variant="ghost">取消</Button>
        </Modal.Close>
        <Button>更新</Button>
      </div>
    </Modal>
  )
}
