const dbSchema = {
  type: 'object',
  required: ['DB_PASSWORD', 'DB_USERNAME'],
  properties: {
    DB_PASSWORD: {
      type: 'string',
    },
    DB_USERNAME: {
      type: 'string',
    },
  },
}

export { dbSchema }
