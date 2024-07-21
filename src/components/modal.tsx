import * as Dialog from '@radix-ui/react-dialog'
import { IconX } from '@tabler/icons-react'
import { ReactNode } from '@tanstack/react-router'

Modal.Title = function ModalTitle({ children }: { children: ReactNode }) {
  return <div className="mb-6 text-lg leading-none">{children}</div>
}

Modal.Close = Dialog.Close

function Modal({
  open,
  onOpenChange,
  children,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: ReactNode
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in fixed inset-0 z-50 bg-black/75" />
        <Dialog.Content className="data-[state=open]:animate-modal-in data-[state=closed]:animate-modal-out fixed left-1/2 top-1/2 z-50 w-full max-w-[500px] -translate-x-1/2 -translate-y-1/2 bg-white p-6 shadow-lg [@media(width>500px)]:rounded-lg">
          {children}
          <Modal.Close asChild>
            <button
              className="absolute right-4 top-4 opacity-50 transition hover:opacity-100"
              aria-label="Close"
            >
              <IconX size={18} />
            </button>
          </Modal.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export { Modal }
