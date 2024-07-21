import { Button } from '@/components/button'
import { Modal } from '@/components/modal'

export function EditAvatarModal({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <Modal.Title>修改头像</Modal.Title>

      <div className="flex flex-col gap-2 text-justify text-gray-600">
        <p>ePass 使用您的 Gravatar 头像。</p>
        <p>
          Gravatar
          允许您在互联网上创建一个全局统一的头像。您可以通过注册一个与电子邮箱关联的账号，在支持
          Gravatar 的各种网站和应用中自动显示您的自定义头像。
        </p>
        <p>如果需要修改，请前往 Gravatar 修改对应邮箱的头像。</p>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <Modal.Close>
          <Button variant="ghost">取消</Button>
        </Modal.Close>
        <Modal.Close>
          <Button
            onClick={() => window.open('https://gravatar.com/profile/avatars')}
          >
            前往 Gravatar
          </Button>
        </Modal.Close>
      </div>
    </Modal>
  )
}
