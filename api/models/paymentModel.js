const db = require('../data/dbConfig');

// find all payments
exports.find = async () => await db('payments as p').select('*');

// find payment by id
exports.findById = async id =>
  await db('payments as p').where('p.id', id).select('*');

// add payment
exports.create = async payment => {
  const [id] = await db('payments').insert(payment);
  return this.findById(id);
};

// update payment
exports.findByIdandUpdate = async (id, changes) => {
  const updated_at = new Date().toISOString();
  changes = { ...changes, updated_at };
  await db('payments').where('id', id).update(changes);
  return this.findById(id);
};

// delete payment
exports.findByIdandDelete = async id => {
  await db('payments').where('id', id).del();
  return this.findById(id);
};

// find by landlord id
exports.findByLandlordId = async landlordId =>
  await db('payments as p')
    .join('booking as b', 'p.bookingId', 'b.id')
    .join('properties as pr', 'b.propertyId', 'pr.id')
    .select(
      'p.id as id ',
      'b.id as bookingId',
      'pr.landLordId as landLordId',
      'pr.id as propertyId',
      'p.amount as amount',
      'p.status',
      'p.paymentMethod',
      'p.transactionId',
      'p.paidAt',
      'p.created_at',
    )
    .where('pr.landlordId', landlordId);
