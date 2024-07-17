import { signupVerifySchema } from '#/api/v1/signup-verify'
import { Button } from '@/components/button'
import { FormError } from '@/components/form-error'
import { HeroTitle } from '@/components/hero-title'
import { Link } from '@/components/link'
import { TextInput } from '@/components/text-input'
import { $fetch } from '@/utils/fetch'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconMail } from '@tabler/icons-react'
import { useMutation } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export const Route = createFileRoute('/$appName/signup')({
  component: Page,
})

type Fields = z.infer<typeof signupVerifySchema>

function Page() {
  const verifyForm = useForm<Fields>({
    resolver: zodResolver(signupVerifySchema),
  })

  const verifyMutation = useMutation({
    mutationFn: (v: Fields) =>
      $fetch('/api/v1/signup-verify', {
        method: 'post',
        body: JSON.stringify(v),
      }),
    onSuccess: () => {
      console.log('233')
    },
  })

  const { appName } = Route.useParams()

  function handleEmailVerify(v: Fields) {
    verifyMutation.mutate(v)
  }

  return (
    <>
      <HeroTitle>注册</HeroTitle>

      <div className="px-12 text-sm leading-loose">
        <span className="opacity-50">已有回声通行证？</span>
        <Link to="/$appName/signin" params={{ appName }}>
          前往登录
        </Link>
      </div>

      <div className="px-12 mt-16 flex flex-col">
        <TextInput
          icon={<IconMail stroke={1.5} size={18} />}
          placeholder="邮箱"
          {...verifyForm.register('email')}
        />
        <FormError error={verifyForm.formState.errors.email} />

        <Button onClick={verifyForm.handleSubmit(handleEmailVerify)}>
          发送验证码
        </Button>
      </div>
    </>
  )
}
