import 'dotenv/config'
import { RetoolRPC } from "retoolrpc"
import { copilotApi } from 'copilot-node-sdk'

const rpc = new RetoolRPC({
  apiToken: process.env.API_TOKEN,
  host: process.env.HOST,
  resourceId: process.env.RESOURCE_ID,
  environmentName: 'production',
  pollingIntervalMs: 1000,
  version: '0.0.1', // optional version number for functions schemas
  logLevel: 'info', // use 'debug' for more verbose logging
})

const getTokenPayload = async (token) => {
  
  const copilot = copilotApi({
    apiKey: process.env.COPILOT_API_KEY,
    token,
  });

  return copilot.getTokenPayload?.();
}

rpc.register({
  name: 'getTokenPayload',
  arguments: {
    token: { type: 'string', description: 'token from url params. Use {{ urlparams.token }}', required: true },
  },
  implementation: async (args) => {
    const payload = await getTokenPayload(args.token);
    return payload;
  },
})

rpc.listen()