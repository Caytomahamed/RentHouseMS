const db = require('../data/dbConfig');
const { capitalize } = require('../utils/timeHelpers');
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
  return await db('booking')
    .where('tenantId', id)
    .orderBy('created_at', 'desc')
    .first();
};

exports.findBookingsByUserId = async id => {
  let house = await db('booking as b')
    .join('users as u', 'p.landLordId', 'u.id')
    .join('propertyTypes as pt', 'p.propertyTypeId', 'pt.id')
    .join('properties as p', 'b.propertyId', 'p.id')
    .leftJoin('maintenanceRequests as m', 'b.tenantId', 'm.tenantId')
    .select(
      'b.id as id',
      'b.tenantId as tenantId',
      'b.propertyId as propertyId',
      db.raw('group_concat(m.type) as maintenanceTypes'),
      db.raw('group_concat(m.status) as maintenanceStatuses'),
      db.raw('group_concat(m.expectedDate) as maintenanceExpectedDates'),
      'm.id as maintenanceId',
      'm.isIssue as isIssue',
      'b.isMoveIn as isMoveIn',
      'b.isCanclellation as isCanclellation',
      'b.cancellationRequestedAt as cancellationRequestedAt',
      'b.isConfirm as isConfirm',
      'b.isReject as isReject',
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
      'p.description as description',
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
    .where('b.tenantId', id)
    // and where reject is false
    .where('b.isReject', false)
    .groupBy('b.id');

  house = house.map(booking => {
    const maintenanceTypes = booking.maintenanceTypes
      ? booking.maintenanceTypes.split(',')
      : [];
    const maintenanceStatuses = booking.maintenanceStatuses
      ? booking.maintenanceStatuses.split(',')
      : [];
    const maintenanceExpectedDates = booking.maintenanceExpectedDates
      ? booking.maintenanceExpectedDates.split(',')
      : [];

    const maintenanceRequests = maintenanceTypes.map((type, index) => ({
      type,
      status: maintenanceStatuses[index],
      expectedDate: maintenanceExpectedDates[index],
    }));

    return {
      ...booking,
      maintenanceRequests,
    };
  });

  return house;
};

// create booking
exports.create = async data => {
  const book = {
    tenantId: data.tenantId,
    propertyId: data.propertyId,
    startDate: data.startDate,
    endDate: data.endDate,
    securityDeposit: data.securityDeposit,
    // isMoveIn: true, confirm with landlord
  };

  const [id] = await db('booking').insert(book);
  await db('properties')
    .update({ available: false })
    .where('id', data.propertyId);

  if (!id) return null;

  // find users by tenantId
  const [tenant] = await db('users').where('id', data.tenantId);
  console.log('tenant', tenant);

  // find properties by propertyId
  const [property] = await db('properties').where('id', data.propertyId);

  const subject = 'Rental Application Received';
  const message = `${capitalize(
    tenant?.firstname,
  )}, upon receiving your complete application, our team will give it a thorough review (approx. 1 business days). We understand finding a new home is important & appreciate your patience. We'll reach out by phone/email with an update.`;

  if (!tenant || !property) return null;

  await db('inbox').insert({
    senderId: property.landLordId,
    receiverId: data.tenantId,
    FromOrTo: 'owner',
    subject,
    message,
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
  await db('booking').where('id', id).update({
    cancellationRequestedAt: db.fn.now(),
    cancellationStatus: 'requested',
    isCanclellation: true,
  });

  // send inbox message to landlord and tenant
  const [booking] = await db('booking').where('id', id);
  if (!booking) return null;

  const [property] = await db('properties').where('id', booking.propertyId);
  console.log(property);

  const subject = 'Cancellation Requested';
  // give a cencellation house rent request message
  const message = `I hope this message finds you well. I am writing to
  inform you that I need to cancel my rental booking for the property located at
  [${property.address}]. Due to unforeseen circumstances, I am unable to proceed
  with the rental agreement. The details of the booking are as follows:
  Booking ID: [${booking.id}]
  Property Address: [${property.address}]
  Start Date:[${booking.startDate}]
  End Date: [${booking.endDate}]`;

  if (!property) return null;

  await db('inbox').insert({
    senderId: booking.tenantId,
    receiverId: property.landLordId,
    FromOrTo: 'owner',
    subject,
    message,
  });

  return [booking];
};

// Function to delete bookings marked for cancellation 7 days ago
exports.deleteOldCancellations = async () => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 4);

  await db('booking')
    .where('cancellationRequestedAt', '<=', sevenDaysAgo)
    .del();
};

// update cancellation process
exports.updateCancellationProcess = async () => {
  const today = new Date();

  const statusUpdates = [
    { days: 1, status: 'preparation' },
    { days: 2, status: 'repairs' },
    { days: 3, status: 'outDay' },
    { days: 4, status: 'postMove' },
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

// confirm booking
exports.confirmBooking = async id => {
  // first confirm the booking and set the property to unavailable, second send a message to the tenant
  const [booking] = await db('booking').where('id', id);
  if (!booking) return null;

  await db('booking')
    .update({ isConfirm: true, startDate: Date.now(), isMoveIn: true })
    .where('id', id);

  const [property] = await db('properties').where('id', booking.propertyId);
  console.log(property);

  const subject = 'Rental Application Approved';
  const message = `Congratulations, your house application located  ${property.address} has been approved. We will be in touch shortly to finalize the details.`;

  if (!property) return null;

  await db('inbox').insert({
    senderId: property.landLordId,
    receiverId: booking.tenantId,
    FromOrTo: 'owner',
    subject,
    message,
  });

  return [booking];
};

// reject booking
exports.rejectBooking = async id => {
  // first reject the booking and set the property to available, second send a message to the tenant
  const [booking] = await db('booking').where('id', id);
  if (!booking) return null;

  await db('properties')
    .update({ available: true })
    .where('id', booking.propertyId);

  await db('booking').update({ isReject: true }).where('id', id);

  const [property] = await db('properties').where('id', booking.propertyId);

  const subject = 'Rental Application Rejected';
  const message = `We regret to inform you that your application for house located in ${property.address} has been rejected. We wish you the best in your search for a new home.`;

  if (!property) return null;

  await db('inbox').insert({
    senderId: property.landLordId,
    receiverId: booking.tenantId,
    FromOrTo: 'owmer',
    subject,
    message,
  });

  return [booking];
};

// find by landlord id
exports.findBookingsByLandlordId = async id => {
  return db('booking as b')
    .join('properties as p', 'b.propertyId', 'p.id')
    .join('propertyTypes as pt', 'p.propertyTypeId', 'pt.id')
    .join('users as u', 'b.tenantId', 'u.id')
    .select(
      'b.id as id',
      'tenantId',
      'propertyId',
      'startDate',
      'endDate',
      'b.isConfirm as isConfirm',
      'b.isReject as isReject',
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
      'u.firstname as tenantFirstName',
      'u.lastname as tenantLastName',
      'u.email as tenantEmail',
      'u.phone as tenantPhone',
      'u.imageUrl as tenantImageUrl',
      'u.state as tenantState',
      'u.city as tenantCity',
      'u.address as tenantAddress',
      'pt.type as propertyType',
      'imageUrls',
    )
    .where('p.landLordId', id);
};

// exports.findBookingsByUserId = async id => {
//   let house = await db('booking as b')
//     .join('properties as p', 'b.propertyId', 'p.id')
//     .join('propertyTypes as pt', 'p.propertyTypeId', 'pt.id')
//     .join('users as u', 'p.landLordId', 'u.id')
//     .join('maintenanceRequests as m', 'b.tenantId', 'm.tenantId')
//     .select(
//       'b.id as id',
//       'b.tenantId as tenantId',
//       'b.propertyId as propertyId',
//       db.raw('group_concat(m.type)  as maintenanceTypes'),
//       'm.id as maintenanceId',
//       'm.isIssue as isIssue',
//       'startDate',
//       'endDate',
//       'securityDeposit',
//       'p.address as address',
//       'p.city as city',
//       'p.state as state',
//       'maplink',
//       'squareFootage',
//       'bedrooms',
//       'bathrooms',
//       'rentAmount',
//       'available',
//       'p.description as description',
//       'u.firstname as landLordFirstName',
//       'u.id as landLordId',
//       'u.lastname as landLordLastName',
//       'u.email as landLordEmail',
//       'u.phone as landLordPhone',
//       'u.imageUrl as landLordImageUrl',
//       'u.state as landLordState',
//       'u.city as landLordCity',
//       'u.address as landLordAddress',
//       'pt.type as propertyType',
//       'cancellationRequestedAt',
//       'cancellationStatus',
//       'u.createdAt as landLordCreatedAt',
//       'imageUrls',
//     )
//     .where('b.tenantId', id)
//     .groupBy('b.id');

//   if (house && house.length > 0) return house;

//   return db('booking as b')
//     .join('users as u', 'p.landLordId', 'u.id')
//     .join('propertyTypes as pt', 'p.propertyTypeId', 'pt.id')
//     .join('properties as p', 'b.propertyId', 'p.id')
//     .select(
//       'b.id as id',
//       'b.tenantId as tenantId',
//       'b.propertyId as propertyId',
//       'startDate',
//       'endDate',
//       'securityDeposit',
//       'p.address as address',
//       'p.city as city',
//       'p.state as state',
//       'maplink',
//       'squareFootage',
//       'bedrooms',
//       'bathrooms',
//       'rentAmount',
//       'available',
//       'p.description as description',
//       'u.firstname as landLordFirstName',
//       'u.id as landLordId',
//       'u.lastname as landLordLastName',
//       'u.email as landLordEmail',
//       'u.phone as landLordPhone',
//       'u.imageUrl as landLordImageUrl',
//       'u.state as landLordState',
//       'u.city as landLordCity',
//       'u.address as landLordAddress',
//       'pt.type as propertyType',
//       'cancellationRequestedAt',
//       'cancellationStatus',
//       'u.createdAt as landLordCreatedAt',
//       'imageUrls',
//     )
//     .where('b.tenantId', id);
// };
