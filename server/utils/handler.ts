import type { EventHandler, EventHandlerRequest } from 'h3'

export const defineWrappedResponseHandler = <T extends EventHandlerRequest, D>(
  handler: EventHandler<T, D>,
): EventHandler<T, D> =>
  defineEventHandler<T>(async (event) => {
    try {
      console.log('server/utils/handler:', Object.keys(event))
      const response = await handler(event)
      console.log('server/utils/handler:', Object.keys(event))
      return { response }
    } catch (err) {
      return { err }
    }
  })
