import { FastifyInstance } from 'fastify'
import fastifyMongo from '@fastify/mongodb'
import fastifyPlugin from 'fastify-plugin'

async function dbConnector(fastify: FastifyInstance) {
  fastify.register(fastifyMongo, {
    url: 'mongodb+srv://cluster0.ellkte1.mongodb.net/',
  })
}

// Wrapping a plugin function with fastify-plugin exposes the decorators
// and hooks, declared inside the plugin to the parent scope.
export default fastifyPlugin(dbConnector)
