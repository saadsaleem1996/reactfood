const JSONAPISerializer = require('jsonapi-serializer').Serializer
module.exports = new JSONAPISerializer('products', {
  attributes: [
    'Id',
    'name',
    'description',
    'price',
    'imageUrl',
    'categoryId',
    'createdAt',
  ],
  id: '_id',
  keyForAttribute: 'camelCase',
  typeForAttribute: (_id) => _id
})