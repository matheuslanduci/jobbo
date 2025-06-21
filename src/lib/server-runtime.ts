import { Layer, ManagedRuntime } from 'effect'
import { DatabaseLive } from '~/database/database'

const MainLayer = Layer.mergeAll(DatabaseLive)

export const ServerRuntime = ManagedRuntime.make(MainLayer)
