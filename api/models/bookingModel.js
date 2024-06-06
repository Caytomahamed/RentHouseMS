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
    )
    .where('b.id', id);

exports.findByUserId = async id => {
  return await db('booking').where('tenantId', id);
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
      'cancellationRequestedAt',
      'cancellationStatus',
      'u.createdAt as landLordCreatedAt',
      'imageUrls',
    )
    .where('tenantId', id);
};

// create booking
exports.create = async data => {
  const book = {
    tenantId: data.tenantId,
    propertyId: data.propertyId,
    startDate: data.startDate,
    endDate: data.endDate,
    securityDeposit: data.securityDeposit,
  };

  const [id] = await db('booking').insert(book);
  await db('properties')
    .update({ available: false })
    .where('id', data.propertyId);

  await db('payments').insert({
    bookingId: id,
    status: data.status,
    paymentMethod: data.paymentMethod,
    transactionId: data.transactionId,
    paidAt: data.paidAt,
  });
  return this.findById(id);
};

exports.payRent = async data => {
  const propertyId = data.propertyId;
  const bookingId = data.bookingId;

  const changes = {
    endDate: data.endDate,
  };

  await db('booking').update(changes).where('id', propertyId);

  await db('payments').insert({
    bookingId: bookingId,
    status: data.status,
    paymentMethod: data.paymentMethod,
    transactionId: data.transactionId,
    amount: data.amount,
    paidAt: data.paidAt,
  });

  console.log('bkd', bookingId);
  return this.findById(bookingId);
};

// update booking
exports.findByIdandUpdate = async (id, changes) => {
  await db('booking').update(changes).where('id', id);
  return this.findById(id);
};

// request cancellation
exports.requestCancellation = async id => {
  return db('booking').where('id', id).update({
    cancellationRequestedAt: db.fn.now(),
    cancellationStatus: 'requested',
  });
};

// Function to delete bookings marked for cancellation 7 days ago
exports.deleteOldCancellations = async () => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  await db('booking')
    .where('cancellationRequestedAt', '<=', sevenDaysAgo)
    .del();
};

// update cancellation process
exports.updateCancellationProcess = async () => {
  const today = new Date();

  const statusUpdates = [
    { days: 1, status: 'in_progress' },
    { days: 2, status: 'in_progress' },
    { days: 3, status: 'in_progress' },
    { days: 4, status: 'in_progress' },
    { days: 5, status: 'finalizing' },
    { days: 6, status: 'finalizing' },
    { days: 7, status: 'completed' },
  ];

  for (let update of statusUpdates) {
    const targetDate = new Date();
    targetDate.setDate(today.getDate() - update.days);

    await db('booking')
      .where('cancellationRequestedAt', '<=', targetDate)
      .where('cancellationStatus', '<>', 'completed')
      .update({
        cancellationStatus: update.status,
      });
  }

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(today.getDate() - 7);

  await db('booking')
    .where('cancellationRequestedAt', '<=', sevenDaysAgo)
    .where('cancellationStatus', 'completed')
    .del();
};

// delete booking
exports.findByIdandDelete = async id => db('booking').where('id', id).del();

// unBooking
exports.unBooking = async id => {
  return db('booking').where('id', id).del();
};
