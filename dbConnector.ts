import { FastifyInstance } from 'fastify'
import fastifyMongo from '@fastify/mongodb'
import fastifyPlugin from 'fastify-plugin'
import fastifyEnv from '@fastify/env'

import { dbSchema as schema } from './.env-schema'

const envOptions = {
  configKey: 'config',
  schema,
  dotenv: true,
  data: process.env,
}

async function dbConnector(fastify: FastifyInstance) {
  fastify.register(fastifyEnv, envOptions)
  await fastify.after()

  fastify.register(fastifyMongo, {
    url: `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.sbcmk6b.mongodb.net/fizzbuzz`,
  })
}

// Wrapping a plugin function with fastify-plugin exposes the decorators
// and hooks, declared inside the plugin to the parent scope.
export default fastifyPlugin(dbConnector)
