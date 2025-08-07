const JSONAPISerializer = require('jsonapi-serializer').Serializer
module.exports = new JSONAPISerializer('Roles', {
  attributes: [
    'Id',
    'role_name',
  ],
  id: '_id',
  keyForAttribute: 'camelCase',
  typeForAttribute: (_id) => _id
})
