const db = require('../data/dbConfig');

// Find all schedules with user details
exports.find = async () => {
  return db('properties as p')
    .join('users as u', 'p.landLordId', 'u.id')
    .join('propertyTypes as pt', 'p.propertyTypeId', 'pt.id')
    .select(
      'p.id as id',
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
      'pt.Id as propertyTypeId',
      'imageUrls',
    );
};

// find by Id
exports.findById = async id => {
  return db('properties as p')
    .join('users as u', 'p.landLordId', 'u.id')
    .join('propertyTypes as pt', 'p.propertyTypeId', 'pt.id')
    .select(
      'p.id as id',
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
    .where('p.id', id);
};

exports.create = async properties => {
  const [id] = await db('properties').insert(properties);
  return this.findById(id);
};

// update schedule
exports.findByIdandUpdate = async (id, changes) => {
  await db('properties').update(changes).where('id', id);
  return this.findById(id);
};

// delete schedule
exports.findByIdandDelete = async id => db('properties').where('id', id).del();

//searching
exports.searching = async search => {
  const { city, state } = search;
  let query = db('properties as p')
    .join('users as u', 'p.landLordId', 'u.id')
    .join('propertyTypes as pt', 'p.propertyTypeId', 'pt.id')
    .select(
      'p.id as id',
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
    .where('available', true);

  query = query
    .where('propertyCity', 'LIKE', `%${city}%`)
    .orWhere('propertyState', 'LIKE', `%${state}%`);

  return query;
};

exports.findByUserAddress = async address => {
  let query = db('schedules as s')
    .select(
      's.id as scheduleId',
      's.driverId',
      'r.price',
      'r.start',
      'r.finish',
      'r.description',
      'address as driverAddress',
      'bookedSeats',
      'seatsLeft',
      'capacity',
      'carType',
      'model',
      'year',
      'carImg',
      'bookedSeats',
      'u.firstname as driverFirstName',
      'u.lastname as driverLastName',
      'u.email as driverEmail',
      'u.phone as driverPhone',
      's.createdAt as scheduleCreatedAt',
      's.updatedAt as scheduleUpdatedAt',
    )
    .join('drivers as d', 's.driverId', 'd.id')
    .join('cars as c', 'd.id', 'c.driverId')
    // .join('status as st', 'd.statusId', 'st.id')
    .join('routes as r', 's.routeId', 'r.id')
    .join('users as u', 'd.userId', 'u.id');

  query = query
    .where('start', 'LIKE', `%${address}%`)
    .orWhere('description', 'LIKE', `%${address}%`)
    // .andWhereNot('st.statusName', '=', 'Recovery')
    .orderBy(db.raw('bookedSeats / capacity'), 'asc')
    .limit(4);

  let orderByAverage = await query;
  orderByAverage = orderByAverage.map(schedule => {
    const { bookedSeats, capacity } = schedule;
    const av = bookedSeats / capacity;
    schedule['average'] = av;
    return schedule;
  });
  orderByAverage.sort((a, b) => a.average - b.average);

  return orderByAverage;
};

exports.findRecovery = async () => {
  return await db('schedules as s')
    .select(
      's.id as scheduleId',
      's.driverId',
      'state',
      'r.price',
      'r.start',
      'r.finish',
      'r.description',
      'address as driverAddress',
      'statusName as status',
      'bookedSeats',
      'seatsLeft',
      'capacity',
      'carType',
      'model',
      'year',
      'carImg',
      'bookedSeats',
      'u.firstname as driverFirstName',
      'u.lastname as driverLastName',
      'u.email as driverEmail',
      'u.phone as driverPhone',
      's.createdAt as scheduleCreatedAt',
      's.updatedAt as scheduleUpdatedAt',
    )
    .join('drivers as d', 's.driverId', 'd.id')
    .join('cars as c', 'd.id', 'c.driverId')
    .join('status as st', 'd.statusId', 'st.id')
    .join('routes as r', 's.routeId', 'r.id')
    .join('users as u', 'd.userId', 'u.id')
    .where('state', '=', 'recovery')
    .where('st.statusName', '=', 'null');
};
