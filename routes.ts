import { FastifyInstance } from 'fastify'

async function routes(fastify: FastifyInstance, options: Object) {
  fastify.get('/', async (request, reply) => {
    return { hello: 'world' }
  })
}

export { routes }
