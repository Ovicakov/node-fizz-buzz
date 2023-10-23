import Fastify from 'fastify'

import dbConnector from './dbConnector'
import { routes } from './routes'

const server = Fastify({
  logger: true,
})

server.register(dbConnector)
server.register(routes)

server.listen({ port: 3000 }, (error, address) => {
  if (error) {
    server.log.error(error)
    console.log(
      `❌ Fail running on \x1b[34m${address} \x1b[0mbecause of \x1b[31m${error}`
    )
    process.exit(1)
  }

  console.log(`✅ Server is now listening on \x1b[34m${address}`)
})
