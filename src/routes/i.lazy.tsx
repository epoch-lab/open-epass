import { getUserTokenInfo } from '@/atoms/token'
import { AppLogo } from '@/components/app-logo'
import { Avatar } from '@/components/avatar'
import { Title } from '@/components/title'
import { useUserProfile } from '@/hooks/use-user-info'
import { EditAvatarModal } from '@/modals/edit-avatar-modal'
import { EditDisplayNameModal } from '@/modals/edit-display-name-modal'
import { EditEmailModal } from '@/modals/edit-email'
import { EditPasswordModal } from '@/modals/edit-password'
import { EditUsernameModal } from '@/modals/edit-username'
import { cn } from '@/utils/cn'
import { IconEdit } from '@tabler/icons-react'
import { createLazyFileRoute, Navigate } from '@tanstack/react-router'
import { ReactNode, useState } from 'react'

export const Route = createLazyFileRoute('/i')({
  component: Page,
})

function Field({
  children,
  className,
  title,
  editable = true,
  onEdit,
}: {
  children?: ReactNode
  className?: string
  title: string
  editable?: boolean
  onEdit?: () => void
}) {
  return (
    <div className="group relative px-3 py-2">
      <div className={cn('text-sm opacity-50', className)}>{title}</div>
      <div className="overflow-hidden text-ellipsis whitespace-nowrap">
        {children}
      </div>
      {editable && (
        <EditButton
          onClick={onEdit}
          className="absolute right-3 top-1/2 -translate-y-1/2 group-hover:opacity-100"
        />
      )}
    </div>
  )
}

function EditButton({
  className,
  onClick,
}: {
  className?: string
  onClick?: () => void
}) {
  return (
    <button
      className={cn(
        'grid h-8 w-8 place-items-center rounded-full bg-blue-500 text-white opacity-0 transition hover:bg-blue-600 hover:opacity-100',
        className,
      )}
      onClick={onClick}
    >
      <IconEdit size={16} />
    </button>
  )
}

function Page() {
  const { data, isSuccess } = useUserProfile()
  const [editAvatarModalOpen, setEditAvatarModalOpen] = useState(false)
  const [editDisplayNameModalOpen, setEditDisplayNameModalOpen] =
    useState(false)
  const [editUsernameModalOpen, setEditUsernameModalOpen] = useState(false)
  const [editEmailModalOpen, setEditEmailModalOpen] = useState(false)
  const [editPasswordModalOpen, setEditPasswordModalOpen] = useState(false)

  if (!getUserTokenInfo().loggedIn) {
    return (
      <Navigate
        to="/connect/$appName/signin"
        params={{ appName: 'i' }}
        replace
      />
    )
  }

  return (
    <div className="flex min-h-[100svh] flex-col items-center bg-gray-50 px-2">
      <Title>我的</Title>
      <div className="mt-[10vh] flex h-[600px] w-full max-w-[400px] flex-col overflow-hidden rounded-lg bg-white shadow-xl">
        <div className="flex items-center border-b px-4 text-lg">
          <div>我的通行证</div>
          <AppLogo className="my-4 ml-auto" />
        </div>

        {isSuccess && (
          <div className="px-4">
            <div className="relative mx-auto my-8 h-24 w-24">
              <Avatar email={data.email} className="peer h-full w-full" />
              <EditButton
                className="absolute -bottom-1 -right-1 peer-hover:opacity-100"
                onClick={() => setEditAvatarModalOpen(true)}
              />
            </div>

            <div className="mx-auto flex max-w-[250px] flex-col divide-y rounded-md border">
              <Field
                title="展示名称"
                onEdit={() => setEditDisplayNameModalOpen(true)}
              >
                {data.displayName}
              </Field>
              <Field
                title="用户名"
                onEdit={() => setEditUsernameModalOpen(true)}
              >
                {data.username}
              </Field>
              <Field title="用户 ID" editable={false}>
                {data.userId}
              </Field>
              <Field
                title="邮箱地址"
                onEdit={() => setEditEmailModalOpen(true)}
              >
                {data.email}
              </Field>
              <Field title="密码" onEdit={() => setEditPasswordModalOpen(true)}>
                ••••••
              </Field>
            </div>
          </div>
        )}
      </div>

      <EditAvatarModal
        open={editAvatarModalOpen}
        onOpenChange={setEditAvatarModalOpen}
      />
      <EditDisplayNameModal
        open={editDisplayNameModalOpen}
        onOpenChange={setEditDisplayNameModalOpen}
      />
      <EditUsernameModal
        open={editUsernameModalOpen}
        onOpenChange={setEditUsernameModalOpen}
      />
      <EditEmailModal
        open={editEmailModalOpen}
        onOpenChange={setEditEmailModalOpen}
      />
      <EditPasswordModal
        open={editPasswordModalOpen}
        onOpenChange={setEditPasswordModalOpen}
      />
    </div>
  )
}
