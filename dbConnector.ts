import { FastifyInstance } from 'fastify'
import fastifyMongo from '@fastify/mongodb'
import fastifyPlugin from 'fastify-plugin'

async function dbConnector(fastify: FastifyInstance, options: Object) {
  fastify.register(fastifyMongo, {
    url: 'mongodb://localhost:27017/test_database',
  })
}

// Wrapping a plugin function with fastify-plugin exposes the decorators
// and hooks, declared inside the plugin to the parent scope.
export default fastifyPlugin(dbConnector)
