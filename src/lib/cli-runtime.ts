import { CliConfig } from '@effect/cli'
import { BunContext } from '@effect/platform-bun'
import { Layer, ManagedRuntime } from 'effect'
import { DatabaseLive } from '~/database/database'
import { AuthService } from '~/services/auth-service'

const ConfigLive = CliConfig.layer({
  showBuiltIns: false
})

const MainLayer = Layer.mergeAll(
  ConfigLive,
  DatabaseLive,
  AuthService.Default,
  BunContext.layer
)

export const CliRuntime = ManagedRuntime.make(MainLayer)
