import { RetoolRPC } from "retoolrpc"

const rpc = new RetoolRPC({
  apiToken: process.env.API_TOKEN,
  host: process.env.HOST,
  resourceId: process.env.RESOURCE_ID,
  environmentName: 'production',
  pollingIntervalMs: 1000,
  version: '0.0.1', // optional version number for functions schemas
  logLevel: 'info', // use 'debug' for more verbose logging
})

rpc.register({
  name: 'helloWorld',
  arguments: {
    name: { type: 'string', description: 'Your name', required: true },
  },
  implementation: async (args, context) => {
    return {
      message: `Hello ${args.name}`,
      context,
    }
  },
})

rpc.listen()