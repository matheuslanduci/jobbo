import { Layer, ManagedRuntime } from 'effect'
import { DatabaseLive } from '~/database/database'
import { AuthService } from '~/services/auth-service'
import { UserService } from '~/services/user-service'

const MainLayer = Layer.mergeAll(
  DatabaseLive,
  AuthService.Default,
  UserService.Default
)

export const ServerRuntime = ManagedRuntime.make(MainLayer)
