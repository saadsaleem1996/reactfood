const JSONAPISerializer = require('jsonapi-serializer').Serializer
module.exports = new JSONAPISerializer('Order', {
  attributes: [
    'Id',
    'products',
    'totalPrice',
    'quantity',
    "cart",
    'createdAt',
    'comments'
  ],
  id: '_id',
  keyForAttribute: 'camelCase',
  typeForAttribute: (_id) => _id
})