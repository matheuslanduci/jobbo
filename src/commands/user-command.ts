import { Args, Command } from '@effect/cli'
import { Console, Effect } from 'effect'
import { nanoid } from 'nanoid'
import { AuthService } from '~/services/auth-service'

const name = Args.text({ name: 'name' }).pipe(
  Args.withDescription('The name of the user to create.')
)
const email = Args.text({ name: 'email' }).pipe(
  Args.withDescription('The email of the user to create.')
)

const createUserCommand = Command.make(
  'create',
  {
    name,
    email
  },
  (payload) =>
    Effect.gen(function* () {
      const randomPassword = nanoid()

      const authSvc = yield* AuthService

      yield* authSvc.createUser({
        email: payload.email,
        name: payload.name,
        password: randomPassword,
        role: ['user', 'admin']
      })

      yield* Console.log(
        `User created successfully! The email is: ${payload.email} with the password: ${randomPassword}`
      )
    }).pipe(
      Effect.catchTags({
        BetterAuthError: (error) =>
          Console.error(error.message, {
            cause: error.cause
          })
      })
    )
)

export const userCommand = Command.make('user')
  .pipe(
    Command.withDescription('A command to manage users in the Jobbo platform.')
  )
  .pipe(Command.withSubcommands([createUserCommand]))
