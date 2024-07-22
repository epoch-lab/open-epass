import * as Dialog from '@radix-ui/react-dialog'
import { IconX } from '@tabler/icons-react'
import { ReactNode } from '@tanstack/react-router'

Modal.Title = function ModalTitle({ children }: { children: ReactNode }) {
  return (
    <Dialog.Title className="mb-6 text-lg leading-none">
      {children}
    </Dialog.Title>
  )
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
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/75 data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-50 w-full max-w-[500px] -translate-x-1/2 -translate-y-1/2 bg-white p-6 shadow-lg data-[state=closed]:animate-modal-out data-[state=open]:animate-modal-in [@media(width>500px)]:rounded-lg"
          aria-describedby={undefined}
        >
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
