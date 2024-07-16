import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$appName/signup')({
  component: Page,
})

function Page() {
  const { appName } = Route.useParams()
  return <>233</>
}
