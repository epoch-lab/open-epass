import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/')({
  component: Page,
})

function Page() {
  return <p>hello world</p>
}
