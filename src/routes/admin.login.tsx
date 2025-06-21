import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { createFileRoute, Navigate } from '@tanstack/react-router'
import { Schema } from 'effect'
import { standardSchemaV1 } from 'effect/Schema'
import { Loader2Icon } from 'lucide-react'
import { toast } from 'sonner'
import { useAuth } from '~/components/auth-provider'
import { FieldInfo } from '~/components/field-info'
import { Button } from '~/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { signIn } from '~/lib/client-auth'

export const Route = createFileRoute('/admin/login')({
  component: RouteComponent
})

const loginSchema = Schema.Struct({
  email: Schema.String,
  password: Schema.String.pipe(Schema.minLength(8), Schema.maxLength(128))
})

function RouteComponent() {
  const { isFetching, isAuthenticated } = useAuth()
  const navigate = Route.useNavigate()
  const { queryClient } = Route.useRouteContext()
  const form = useForm({
    defaultValues: {
      email: '',
      password: ''
    } as typeof loginSchema.Type,
    validators: {
      onSubmit: standardSchemaV1(loginSchema)
    },
    onSubmit: (data) => mutation.mutate(data.value)
  })
  const mutation = useMutation({
    mutationFn: async (payload: typeof loginSchema.Type) => {
      const { error } = await signIn.email({
        email: payload.email,
        password: payload.password
      })

      if (error) throw error
    },
    onSuccess: async () => {
      toast.success('Login successful!')

      await queryClient.invalidateQueries({
        queryKey: ['currentSession']
      })

      return navigate({ to: '/admin' })
    },
    onError: (error) => {
      console.error(error)
      toast.error(
        error.message || 'Oops! Something went wrong. Please try again.'
      )
    }
  })

  if (isFetching) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Loader2Icon className="animate-spin size-4" />
      </div>
    )
  }

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Login to your account</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  e.stopPropagation()

                  form.handleSubmit()
                }}
              >
                <div className="flex flex-col gap-6">
                  <form.Field name="email">
                    {(field) => (
                      <div className="grid gap-3">
                        <Label htmlFor={field.name}>Email</Label>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          type="email"
                          autoComplete="email"
                          autoFocus
                          placeholder="Your email address"
                          required
                        />
                        <FieldInfo field={field} />
                      </div>
                    )}
                  </form.Field>

                  <form.Field name="password">
                    {(field) => (
                      <div className="grid gap-3">
                        <div className="flex items-center">
                          <Label htmlFor={field.name}>Password</Label>
                          <button
                            type="button"
                            className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                            onClick={() => {
                              toast.info(
                                'Contact the administrator to reset your password.'
                              )
                            }}
                          >
                            Forgot your password?
                          </button>
                        </div>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="Your password"
                          autoComplete="current-password"
                          type="password"
                          required
                        />
                        <FieldInfo field={field} />
                      </div>
                    )}
                  </form.Field>
                  <div className="flex flex-col gap-3">
                    <Button type="submit" className="w-full">
                      Login
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
