import { Helmet } from 'react-helmet-async'

export function Title({ children }: { children: string }) {
  return (
    <Helmet>
      <title>{children} | 回声通行证</title>
    </Helmet>
  )
}
