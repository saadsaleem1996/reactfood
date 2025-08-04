const JSONAPISerializer = require('jsonapi-serializer').Serializer
module.exports = new JSONAPISerializer('products', {
  attributes: [
    'Id',
    'name',
    'description',
    'price',
    'categoryId',
    'createdAt',
    'comments'
  ],
  id: '_id',
  keyForAttribute: 'camelCase',
  typeForAttribute: (_id) => _id
})