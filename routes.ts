import { FastifyInstance, RouteGenericInterface, FastifyRequest } from 'fastify'

interface BodyOrParams {
  animal: string
}

async function routes(fastify: FastifyInstance, options: Object) {
  const collection = fastify.mongo.db?.collection('test_collection')

  fastify.get('/', async () => {
    return { hello: 'world' }
  })

  fastify.get('/animals', async () => {
    const result = await collection?.find().toArray()
    if (result?.length === 0) {
      throw new Error('No documents found')
    }
    return result
  })

  fastify.get(
    '/animals/:animal',
    async (request: FastifyRequest<{ Params: BodyOrParams }>) => {
      const { animal } = request.params

      const result = await collection?.findOne({ animal })
      if (!result) {
        throw new Error('Invalid value')
      }
      return result
    }
  )

  const animalBodyJsonSchema = {
    type: 'object',
    required: ['animal'],
    properties: {
      animal: { type: 'string' },
    },
  }

  const schema = {
    body: animalBodyJsonSchema,
  }

  fastify.post(
    '/animals',
    { schema },
    async (request: FastifyRequest<{ Body: BodyOrParams }>) => {
      // we can use the `request.body` object to get the data sent by the client
      const result = await collection?.insertOne({
        animal: request.body.animal,
      })
      return result
    }
  )
}

export { routes }
