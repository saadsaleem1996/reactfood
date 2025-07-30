const JSONAPISerializer = require('jsonapi-serializer').Serializer
module.exports = new JSONAPISerializer('user', {
  attributes: [
    'authToken',
    'firstName',
    'lastName',
    'email',
    'profileImage',
    '_id',
    'isDeleted',
    'verified',
    'socialAccounts',
    'notificationEnabale',
    'emailEnabale',
    'updatedAt',
    'createdAt',
    'authCode',
    'codeCreatedAt',
    'createdBy'
  ],
  id: '_id',
  keyForAttribute: 'camelCase',
  typeForAttribute: (_id) => _id
})
