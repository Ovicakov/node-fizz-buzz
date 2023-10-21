import Fastify from 'fastify'
import { routes } from './routes'

const server = Fastify({
  logger: true,
})

server.register(routes)

server.listen({ port: 3000 }, (err, address) => {
  if (err) {
    server.log.error(err)
    process.exit(1)
  }

  console.log(`✅ Server is now listening on \x1b[34m${address}`)
})
