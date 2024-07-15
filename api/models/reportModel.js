const db = require('../data/dbConfig');

// {
//   start:"calamada",
//   totalCars:30,
//   noha:15,
//   vitz:10,
//   probox:5,
//   totalSchedule:30,
//   percentageSchedule:10
// }

exports.find = async () => {
  const schedules = await db('schedules as s')
    .select(
      'r.start',
      db.raw('COUNT(*) as totalCars'),
      db.raw('SUM(CASE WHEN c.carType = "noha" THEN 1 ELSE 0 END) as noha'),
      db.raw('SUM(CASE WHEN c.carType = "vitz" THEN 1 ELSE 0 END) as vitz'),
      db.raw('SUM(CASE WHEN c.carType = "probox" THEN 1 ELSE 0 END) as probox'),
      db.raw('COUNT(DISTINCT s.id) as totalSchedule'),
    )
    .join('routes as r', 's.routeId', 'r.id')
    .join('drivers as d', 's.driverId', 'd.id')
    .join('cars as c', 'd.id', 'c.driverId')
    .groupBy('r.start');

  const totalSchedules = schedules.reduce(
    (total, schedule) => total + schedule.totalSchedule,
    0,
  );
  const percentageSchedule = (totalSchedules / schedules.length) * 100;

  const summaryReports = schedules.map(schedule => ({
    start: schedule.start,
    totalCars: schedule.totalCars,
    noha: schedule.noha,
    vitz: schedule.vitz,
    probox: schedule.probox,
    totalSchedule: schedule.totalSchedule,
    percentageSchedule: (schedule.totalSchedule / totalSchedules) * 100,
  }));

  return { summaryReports, totalSchedules };
};

exports.findReports = async reportType => {
  switch (reportType) {
    case 'UserDemographics':
      return await db('users')
        .join('roles', 'users.roleId', 'roles.id')
        .select(
          'users.firstname',
          'users.lastname',
          'users.city',
          'users.state',
          'roles.name as role',
        );

    case 'ActiveUsers':
      return await db('users')
        .where('isActive', true)
        .select('firstname', 'lastname', 'email', 'city', 'state');

    case 'InactiveUsers':
      return await db('users')
        .where('isActive', false)
        .select('firstname', 'lastname', 'email', 'city', 'state');

    case 'PropertyAvailability':
      return await db('properties')
        .where('available', true)
        .select(
          'address',
          'city',
          'state',
          'rentAmount',
          'bedrooms',
          'bathrooms',
        );

    case 'PropertyOccupancy':
      return await db('properties')
        .join('booking', 'properties.id', 'booking.propertyId')
        .select(
          'properties.address',
          'booking.tenantId',
          'booking.startDate',
          'booking.endDate',
        );

    case 'PropertyTypeDistribution':
      return await db('properties')
        .join('propertyTypes', 'properties.propertyTypeId', 'propertyTypes.id')
        .select('propertyTypes.type')
        .count('properties.id as count')
        .groupBy('propertyTypes.type');

    case 'CurrentBookings': // ❌
      const today = new Date();
      return await db('booking')
        .where('startDate', '<=', today)
        .andWhere('endDate', '>=', today)
        .join('properties', 'booking.propertyId', 'properties.id')
        .join('users', 'booking.tenantId', 'users.id')
        .select(
          'properties.address',
          'users.firstname',
          'users.lastname',
          'booking.startDate',
          'booking.endDate',
        );

    case 'BookingHistory':
      return await db('booking')
        .join('properties', 'booking.propertyId', 'properties.id')
        .join('users', 'booking.tenantId', 'users.id')
        .select(
          'properties.address',
          'users.firstname',
          'users.lastname',
          'booking.startDate',
          'booking.endDate',
        );

    case 'CancelledBookings':
      return await db('booking')
        .whereNotNull('cancellationRequestedAt')
        .join('properties', 'booking.propertyId', 'properties.id')
        .join('users', 'booking.tenantId', 'users.id')
        .select(
          'properties.address',
          'users.firstname',
          'users.lastname',
          'booking.cancellationRequestedAt',
        );

    case 'PaymentStatus':
      return await db('payments').select(
        'bookingId',
        'amount',
        'status',
        'paymentMethod',
        'transactionId',
        'paidAt',
      );

    case 'MonthlyPayments': // ❌ MONTH(paidAt) as month
      return await db('payments')
        .select(
          db.raw('MONTH(paidAt) as month'),
          db.raw('SUM(amount) as total'),
        )
        .whereNotNull('paidAt')
        .groupBy(db.raw('MONTH(paidAt)'));

    case 'OutstandingPayments':
      return await db('payments')
        .where('status', 'pending')
        .join('booking', 'payments.bookingId', 'booking.id')
        .select('booking.propertyId', 'payments.amount', 'payments.status');

    case 'OpenMaintenanceRequests':
      return await db('maintenanceRequests')
        .where('status', 'Open')
        .select('bookingId', 'tenantId', 'type', 'description');

    case 'ClosedMaintenanceRequests':
      return await db('maintenanceRequests')
        .where('status', 'Closed')
        .select(
          'bookingId',
          'tenantId',
          'type',
          'description',
          'updated_at as resolutionDate',
        );

    case 'MaintenanceRequestsByType':
      return await db('maintenanceRequests')
        .select('type')
        .count('id as count')
        .groupBy('type');

    case 'PropertyReviews':
      return await db('reviews')
        .join('properties', 'reviews.propertyId', 'properties.id')
        .join('users', 'reviews.tenantId', 'users.id')
        .select(
          'properties.address',
          'users.firstname',
          'users.lastname',
          'reviews.rating',
          'reviews.comment',
        );

    case 'AveragePropertyRatings':
      return await db('reviews')
        .join('properties', 'reviews.propertyId', 'properties.id')
        .select('properties.address')
        .avg('reviews.rating as averageRating')
        .groupBy('properties.address');

    case 'NegativeReviews':
      return await db('reviews')
        .where('rating', '<', 3)
        .join('properties', 'reviews.propertyId', 'properties.id')
        .join('users', 'reviews.tenantId', 'users.id')
        .select(
          'properties.address',
          'users.firstname',
          'users.lastname',
          'reviews.rating',
          'reviews.comment',
        );

    case 'UnreadMessages':
      return await db('inbox')
        .where('is_read', false)
        .select('senderId', 'receiverId', 'subject', 'message', 'created_at');

    case 'MessagesByUser':
      return await db('inbox')
        .select('senderId', 'receiverId')
        .count('id as count')
        .groupBy('senderId', 'receiverId');

    case 'MessageSubjects':
      return await db('inbox')
        .select('subject')
        .count('id as count')
        .groupBy('subject');

    default:
      return null;
    // throw new Error('Invalid report type');
  }
};

/// get by report in landlord id
exports.findReportsByLandlord = async landlordId => {
  const { totalProperties } = await db('properties')
    .count('* AS totalProperties')
    .where('landLordId', landlordId)
    .first();

  const { totalBookings } = await db('booking')
    .count('* AS totalBookings')
    .join('properties', 'booking.propertyId', 'properties.id')
    .where('properties.landLordId', landlordId)
    .first();

  const { totalIncome } = await db('payments')
    .sum('amount AS totalIncome')
    .join('booking', 'payments.bookingId', 'booking.id')
    .join('properties', 'booking.propertyId', 'properties.id')
    .where('properties.landLordId', landlordId)
    .first();

  const { totalMaintenanceRequests } = await db('maintenanceRequests')
    .count('* AS totalMaintenanceRequests')
    .join('booking', 'maintenanceRequests.bookingId', 'booking.id')
    .join('properties', 'booking.propertyId', 'properties.id')
    .where('properties.landLordId', landlordId)
    .first();

  const currentDate = new Date();

  const paid = db('booking')
    .where('endDate', '<', currentDate)
    .count('* As paid');

  const unPaid = db('booking')
    .where('endDate', '>=', currentDate)
    .count('* As UnPaid');

  const { bookingsLast30Days } = await db('booking')
    .count('* AS bookingsLast30Days')
    .join('properties', 'booking.propertyId', 'properties.id')
    .where('properties.landLordId', landlordId)
    .andWhere('booking.created_at', '>=', db.raw("DATE('now', '-30 days')"))
    .first();

  const { paymentsLast30Days } = await db('payments')
    .count('* AS paymentsLast30Days')
    .join('booking', 'payments.bookingId', 'booking.id')
    .join('properties', 'booking.propertyId', 'properties.id')
    .where('properties.landLordId', landlordId)
    .andWhere('payments.created_at', '>=', db.raw("DATE('now', '-30 days')"))
    .first();

  const { maintenanceRequestsLast30Days } = await db('maintenanceRequests')
    .count('* AS maintenanceRequestsLast30Days')
    .join('booking', 'maintenanceRequests.bookingId', 'booking.id')
    .join('properties', 'booking.propertyId', 'properties.id')
    .where('properties.landLordId', landlordId)
    .andWhere(
      'maintenanceRequests.created_at',
      '>=',
      db.raw("DATE('now', '-30 days')"),
    )
    .first();

  // const propertiesLast30Days = await db('properties')
  //   .count('* AS propertiesLast30Days')
  //   .where('landLordId', landlordId)
  //   .andWhere('created_at', '>=', db.raw("DATE('now', '-30 days')"))
  //   .first();

  const propertyStatus = await db('properties')
    .select(
      db.raw(`
      SUM(CASE WHEN available = true THEN 1 ELSE 0 END) AS availableProperties,
      SUM(CASE WHEN available = false THEN 1 ELSE 0 END) AS rentedProperties
    `),
    )
    .where('landLordId', landlordId)
    .first();

  const detailedBookings = await db('booking')
    .select(
      db.raw('strftime("%Y-%m", created_at) AS month'),
      db.raw('COUNT(*) AS count'),
    )
    .join('properties', 'booking.propertyId', 'properties.id')
    .where('properties.landLordId', landlordId)
    .groupBy(db.raw('strftime("%Y-%m", created_at)'))
    .orderBy('month', 'asc');

  const properties = await db('properties as p')
    .join('users as u', 'p.landLordId', 'u.id')
    .join('propertyTypes as pt', 'p.propertyTypeId', 'pt.id')
    .select(
      'p.id as id',
      'p.address as address',
      'p.city as city',
      'p.state as state',
      'squareFootage',
      'bedrooms',
      'bathrooms',
      'lat',
      'long',
      'rentAmount',
      'available',
      'description',
      'u.id as landLordId',
      'u.firstname as landLordFirstName',
      'u.lastname as landLordLastName',
      'u.email as landLordEmail',
      'u.phone as landLordPhone',
      'u.imageUrl as landLordImageUrl',
      'u.state as landLordState',
      'u.city as landLordCity',
      'u.address as landLordAddress',
      'pt.type as propertyType',
      'pt.Id as propertyTypeId',
      'imageUrls',
    )
    .where('landLordId', landlordId);

  const bookings = await db('booking')
    .join('properties', 'booking.propertyId', 'properties.id')
    .where('properties.landLordId', landlordId)
    .orderBy('booking.created_at', 'DESC')
    .select('booking.*');

  const detailedPayments = await db('payments')
    .select(
      'payments.*',
      'properties.address',
      'properties.city',
      'properties.state',
    )
    .join('booking', 'payments.bookingId', 'booking.id')
    .join('properties', 'booking.propertyId', 'properties.id')
    .where('properties.landLordId', landlordId)
    .orderBy('payments.created_at', 'DESC');

  const detailedMaintenanceRequests = await db('maintenanceRequests')
    .select(
      'maintenanceRequests.*',
      'properties.address',
      'properties.city',
      'properties.state',
    )
    .join('booking', 'maintenanceRequests.bookingId', 'booking.id')
    .join('properties', 'booking.propertyId', 'properties.id')
    .where('properties.landLordId', landlordId)
    .orderBy('maintenanceRequests.created_at', 'DESC');

  return [
    {
      totalProperties,
      totalBookings,
      totalIncome,
      totalMaintenanceRequests,
    },
    {
      bookingsLast30Days,
      paymentsLast30Days,
      maintenanceRequestsLast30Days,
      // propertiesLast30Days,
    },
    propertyStatus,
    bookings,
    detailedBookings,
    detailedPayments,
    detailedMaintenanceRequests,
    properties,
  ];
};

// website
exports.findReportsByAdmin = async landlordId => {
  const { totalProperties } = await db('properties')
    .count('* AS totalProperties')
    .first();

  const { totalBookings } = await db('booking')
    .count('* AS totalBookings')
    .join('properties', 'booking.propertyId', 'properties.id')
    .first();

  const { totalIncome } = await db('payments')
    .sum('amount AS totalIncome')
    .join('booking', 'payments.bookingId', 'booking.id')
    .join('properties', 'booking.propertyId', 'properties.id')
    .first();

  const { totalMaintenanceRequests } = await db('maintenanceRequests')
    .count('* AS totalMaintenanceRequests')
    .join('booking', 'maintenanceRequests.bookingId', 'booking.id')
    .join('properties', 'booking.propertyId', 'properties.id')
    .first();

  const { bookingsLast30Days } = await db('booking')
    .count('* AS bookingsLast30Days')
    .join('properties', 'booking.propertyId', 'properties.id')
    .andWhere('booking.created_at', '>=', db.raw("DATE('now', '-30 days')"))
    .first();

  const { paymentsLast30Days } = await db('payments')
    .count('* AS paymentsLast30Days')
    .join('booking', 'payments.bookingId', 'booking.id')
    .join('properties', 'booking.propertyId', 'properties.id')
    .andWhere('payments.created_at', '>=', db.raw("DATE('now', '-30 days')"))
    .first();

  const { maintenanceRequestsLast30Days } = await db('maintenanceRequests')
    .count('* AS maintenanceRequestsLast30Days')
    .join('booking', 'maintenanceRequests.bookingId', 'booking.id')
    .join('properties', 'booking.propertyId', 'properties.id')
    .andWhere(
      'maintenanceRequests.created_at',
      '>=',
      db.raw("DATE('now', '-30 days')"),
    )
    .first();

  // const propertiesLast30Days = await db('properties')
  //   .count('* AS propertiesLast30Days')
  //   .where('landLordId', landlordId)
  //   .andWhere('created_at', '>=', db.raw("DATE('now', '-30 days')"))
  //   .first();

  const propertyStatus = await db('properties')
    .select(
      db.raw(`
      SUM(CASE WHEN available = true THEN 1 ELSE 0 END) AS availableProperties,
      SUM(CASE WHEN available = false THEN 1 ELSE 0 END) AS rentedProperties
    `),
    )
    .first();

  const detailedBookings = await db('booking')
    .select(
      db.raw('strftime("%Y-%m", created_at) AS month'),
      db.raw('COUNT(*) AS count'),
    )
    .join('properties', 'booking.propertyId', 'properties.id')
    .groupBy(db.raw('strftime("%Y-%m", created_at)'))
    .orderBy('month', 'asc');

  const bookings = await db('booking')
    .join('properties', 'booking.propertyId', 'properties.id')
    .orderBy('booking.created_at', 'DESC')
    .select('booking.*');

  const detailedPayments = await db('payments')
    .select(
      'payments.*',
      'properties.address',
      'properties.city',
      'properties.state',
    )
    .join('booking', 'payments.bookingId', 'booking.id')
    .join('properties', 'booking.propertyId', 'properties.id')
    .orderBy('payments.created_at', 'DESC');

  const detailedMaintenanceRequests = await db('maintenanceRequests')
    .select(
      'maintenanceRequests.*',
      'properties.address',
      'properties.city',
      'properties.state',
    )
    .join('booking', 'maintenanceRequests.bookingId', 'booking.id')
    .join('properties', 'booking.propertyId', 'properties.id')
    .orderBy('maintenanceRequests.created_at', 'DESC');

  const properties = await db('properties as p')
    .join('users as u', 'p.landLordId', 'u.id')
    .join('propertyTypes as pt', 'p.propertyTypeId', 'pt.id')
    .select(
      'p.id as id',
      'p.address as address',
      'p.city as city',
      'p.state as state',
      'squareFootage',
      'bedrooms',
      'bathrooms',
      'lat',
      'long',
      'rentAmount',
      'available',
      'description',
      'u.id as landLordId',
      'u.firstname as landLordFirstName',
      'u.lastname as landLordLastName',
      'u.email as landLordEmail',
      'u.phone as landLordPhone',
      'u.imageUrl as landLordImageUrl',
      'u.state as landLordState',
      'u.city as landLordCity',
      'u.address as landLordAddress',
      'pt.type as propertyType',
      'pt.Id as propertyTypeId',
      'imageUrls',
    );

  return [
    {
      totalProperties,
      totalBookings,
      totalIncome,
      totalMaintenanceRequests,
    },
    {
      bookingsLast30Days,
      paymentsLast30Days,
      maintenanceRequestsLast30Days,
      // propertiesLast30Days,
    },
    propertyStatus,
    bookings,
    detailedBookings,
    detailedPayments,
    detailedMaintenanceRequests,
    properties,
  ];
};
