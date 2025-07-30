const { createClient } = require('redis')

const client = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  },
  password: process.env.REDIS_PASSWORD,
  username: process.env.REDIS_USERNAME
})
client.connect().catch(console.error)

module.exports = {
  show: async (userId) => await client.get(userId),
  create: async (userId, token) => {
    await client.set(userId, token)
  },
  delete: async (userId) => {
    await client.del(userId)
  },
  client: () => client
}