import { RetoolRPC } from "retoolrpc"

const rpc = new RetoolRPC({
  apiToken: 'your-api-token-here',
  host: 'https://portaltechnologies.retool.com',
  resourceId: 'a29261fb-c099-4bc6-8c24-9e0b9dfb884d',
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