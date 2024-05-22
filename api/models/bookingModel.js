const db = require('../data/dbConfig');
const { findByDriverId, findByIdandUpdate } = require('./carModel');

// find all booking
exports.find = async () =>
  await db('booking as b')
    .join('users as u', 'p.landLordId', 'u.id')
    .join('properties as p', 'b.propertyId', 'p.id')
    .join('propertyTypes as pt', 'p.propertyTypeId', 'pt.id')
    .select(
      'b.id as id',
      'tenantId',
      'propertyId',
      'startDate',
      'endDate',
      'securityDeposit',
      'p.address as address',
      'p.city as city',
      'p.state as state',
      'maplink',
      'squareFootage',
      'bedrooms',
      'bathrooms',
      'rentAmount',
      'available',
      'description',
      'u.firstname as landLordFirstName',
      'u.id as landLordId',
      'u.lastname as landLordLastName',
      'u.email as landLordEmail',
      'u.phone as landLordPhone',
      'u.imageUrl as landLordImageUrl',
      'u.state as landLordState',
      'u.city as landLordCity',
      'u.address as landLordAddress',
      'pt.type as propertyType',
      'imageUrls',
    );

// find booking by id
exports.findById = async id =>
  await dbdb('booking as b')
    .join('users as u', 'p.landLordId', 'u.id')
    .join('properties as p', 'b.propertyId', 'p.id')
    .select(
      'b.id as id',
      'tenantId',
      'propertyId',
      'startDate',
      'endDate',
      'securityDeposit',
      'p.address as address',
      'p.city as city',
      'p.state as state',
      'maplink',
      'squareFootage',
      'bedrooms',
      'bathrooms',
      'rentAmount',
      'available',
      'description',
      'u.firstname as landLordFirstName',
      'u.id as landLordId',
      'u.lastname as landLordLastName',
      'u.email as landLordEmail',
      'u.phone as landLordPhone',
      'u.imageUrl as landLordImageUrl',
      'u.state as landLordState',
      'u.city as landLordCity',
      'u.address as landLordAddress',
      'pt.type as propertyType',
      'imageUrls',
    )
    .where('id', id);

exports.findByUserId = async id => {
  db('booking').where('userId', id);
};

exports.findBookingsByUserId = async id => {
  return db('booking as b')
    .join('users as u', 'p.landLordId', 'u.id')
    .join('properties as p', 'b.propertyId', 'p.id')
    .join('propertyTypes as pt', 'p.propertyTypeId', 'pt.id')
    .select(
      'b.id as id',
      'tenantId',
      'propertyId',
      'startDate',
      'endDate',
      'securityDeposit',
      'p.address as address',
      'p.city as city',
      'p.state as state',
      'maplink',
      'squareFootage',
      'bedrooms',
      'bathrooms',
      'rentAmount',
      'available',
      'description',
      'u.firstname as landLordFirstName',
      'u.id as landLordId',
      'u.lastname as landLordLastName',
      'u.email as landLordEmail',
      'u.phone as landLordPhone',
      'u.imageUrl as landLordImageUrl',
      'u.state as landLordState',
      'u.city as landLordCity',
      'u.address as landLordAddress',
      'pt.type as propertyType',
      'imageUrls',
    )
    .where('tenantId', id);
};

// create booking
exports.create = async data => {
  const [id] = await db('booking').insert(data);
  await db('properties')
    .update({ available: false })
    .where('id', data.propertyId);
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
