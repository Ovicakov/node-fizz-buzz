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

async function routes(fastify: FastifyInstance) {
  fastify.get<{ Querystring: TQuerystring }>(
    '/fizzbuzz',
    queryStringSchema,
    (request, reply) => {
      const { int1, int2, limit, str1, str2 } = request.query

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

// fastify.get('/fizzbuzz', async () => {
// const collection = fastify.mongo.db?.collection('fizzbuzz')

//   const result = await collection?.find().toArray()

//   if (result?.length === 0) {
//     throw new Error('No documents found')
//   }

//   if (result === undefined) {
//     throw new Error('Result is undefined')
//   }
//   return result
// })

// const animalBodyJsonSchema = {
//   type: 'object',
//   required: ['number'],
//   properties: {
//     number: { type: 'number' },
//   },
// }

// const schema = {
//   body: animalBodyJsonSchema,
// }

// fastify.post(
//   '/fizzbuzz',
//   { schema },
//   async (request: FastifyRequest<{ Body: BodyOrParams }>, reply) => {
//     // we can use the `request.body` object to get the data sent by the client
//     const result = await collection?.insertOne({
//       number: request.body.number,
//     })

//     if (!result) {
//       console.log({ result })
//       throw new Error(`Issue on POST because of ${reply.log.error}`)
//     }

//     return result
//   }
// )
// }
