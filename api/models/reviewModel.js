const db = require('../data/dbConfig');

// find all reviews
exports.find = async () =>
  await db('reviews as r')
    .join('users as u', 'r.tenantId', 'u.id')
    .select(
      'r.id',
      'r.rating',
      'r.comment',
      'r.created_at',
      'u.firstName',
      'u.lastName',
      'u.email',
      'u.phone',
      'u.imageUrl',
      'u.state',
      'u.city',
      'u.address',
    );

// find reviews by id
exports.findById = async id =>
  await db('reviews as r')
    .where('r.id', id)
    .join('users as u', 'r.tenantId', 'u.id')
    .select(
      'r.id',
      'r.rating',
      'r.comment',
      'r.created_at',
      'u.firstName',
      'u.lastName',
      'u.email',
      'u.phone',
      'u.imageUrl',
      'u.state',
      'u.city',
      'u.address',
    );

// add reviews
exports.create = async review => {
  const [id] = await db('reviews').insert(review);
  return this.findById(id);
};

// update reviews
exports.findByIdandUpdate = async (id, changes) => {
  await db('reviews').where('id', id).update(changes);
  return this.findById(id);
};

// delete reviews
exports.findByIdandDelete = async id => {
  await db('reviews').where('id', id).del();
  return this.findById(id);
};

// property get reviews
exports.findReviewsByPropertyId = async id =>
  await db('reviews as r')
    .where('r.propertyId', id)
    .join('users as u', 'r.tenantId', 'u.id')
    .select(
      'r.id',
      'r.rating',
      'r.comment',
      'r.created_at',
      'u.firstName',
      'u.lastName',
      'u.email',
      'u.phone',
      'u.imageUrl',
      'u.state',
      'u.city',
      'u.address',
    );
