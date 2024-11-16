import { error } from 'console'
import { FastifyInstance } from 'fastify'

interface TQuerystring {
  int1: number
  int2: number
  limit: number
  str1: string
  str2: string
}

const queryStringSchema = {
  schema: {
    querystring: {
      type: 'object',
      properties: {
        int1: { type: 'number' },
        int2: { type: 'number' },
        limit: { type: 'number' },
        str1: { type: 'string' },
        str2: { type: 'string' },
      },
    },
  },
}

// Example: curl http://127.0.0.1:3000/fizzbuzz\?int1\=13\&int2\=4\&limit\=100\&str1\=fizz\&str2\=buzz

async function routes(fastify: FastifyInstance) {
  fastify.get<{ Querystring: TQuerystring }>(
    '/fizzbuzz',
    queryStringSchema,
    (request, reply) => {
      const { int1, int2, limit, str1, str2 } = request.query

      switch (true) {
        case int1 == null:
        case int2 == null:
        case limit == null:
        case str1 == null || str1 == '':
        case str2 == null || str2 == '':
          reply.status(404).send('Wrong parameter')
        default:
      }

      const output: (number | string)[] = []

      for (let i = 1; i <= limit; i++) {
        if (i % int1 === 0 && i % int2 === 0) {
          output.push(str1 + str2)
        } else if (i % int2 === 0) {
          output.push(str2)
        } else if (i % int1 === 0) {
          output.push(str1)
        } else output.push(i)
      }

      reply.send({ output })
    }
  )
}

export { routes }
