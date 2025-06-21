import { Command } from '@effect/cli'
import { userCommand } from './commands/user-command'
import { CliRuntime } from './lib/cli-runtime'

const command = Command.make('jobbo').pipe(
  Command.withDescription('A CLI tool for managing your Jobbo platform.'),
  Command.withSubcommands([userCommand])
)

const cli = Command.run(command, {
  name: 'Jobbo',
  version: '0.1.0'
})

await CliRuntime.runPromise(cli(process.argv))

await CliRuntime.dispose()
