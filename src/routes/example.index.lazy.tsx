import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/example/')({
  component: Page,
})

function Page() {
  function handleSignUp() {
    alert('TODO')
  }

  return (
    <div>
      <button onClick={handleSignUp}>登录</button>
    </div>
  )
}
