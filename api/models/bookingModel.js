const db = require('../data/dbConfig');
const { findByDriverId, findByIdandUpdate } = require('./carModel');

// find all booking
exports.find = async () =>
  await db('booking as b')
    .select(
      'b.id as id',
      'tenantId',
      'propertyId',
      'startDate',
      'endDate',
      'rentAmount',
      'securityDeposit',
    )
    .join('properties as p', 'b.propertyId', 'p.id');

// find booking by id
exports.findById = async id =>
  await db.select().from('booking').where('id', id);

exports.findByUserId = async id => await db('booking').where('userId', id);

exports.findBookingsByUserId = async id => {
  return db('booking as s').where('tenantId', id);
};

// create booking
exports.create = async data => {
  const [id] = await db('booking').insert(data);
  return this.findById(id);
};

// update booking
exports.findByIdandUpdate = async (id, changes) => {
  await db('booking').update(changes).where('id', id);
  return this.findById(id);
};

// delete booking
exports.findByIdandDelete = async id => db('booking').where('id', id).del();

// unBooking
exports.unBooking = async id => {
  return db('booking').where('id', id).del();
};
