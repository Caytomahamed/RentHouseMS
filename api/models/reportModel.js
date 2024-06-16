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

    case 'MonthlyPayments':// ❌ MONTH(paidAt) as month
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
