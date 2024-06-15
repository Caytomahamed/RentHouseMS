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
      'lat',
      'long',
      'u.firstname as landLordFirstName',
      'u.id as landLordId',
      'u.lastname as landLordLastName',
      'u.email as landLordEmail',
      'u.phone as landLordPhone',
      'u.imageUrl as landLordImageUrl',
      'u.state as landLordState',
      'u.city as landLordCity',
      'u.address as landLordAddress',
      'u.createdAt as landLordCreatedAt',
      // 'pt.Id as propertyTypeId',
      'pt.type as propertyType',
      'imageUrls',
    )
    .where('available', true);
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
      'lat',
      'long',
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
      'u.createdAt as landLordCreatedAt',
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
  const { location, price, type } = search;

  if (price) {
    var [minPrice, maxPrice] = price.split(' - ').map(Number);
  }

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
      'lat',
      'long',
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

  if (location) {
    query = query
      .where('p.city', 'LIKE', `%${location}%`)
      .orWhere('p.state', 'LIKE', `%${location}%`)
      .orWhere('p.address', 'LIKE', `%${location}%`);
  }

  if (price) {
    query = query.whereBetween('rentAmount', [minPrice, maxPrice]);
  }

  if (type) {
    query = query.where('pt.type', type);
  }

  return query;
};

exports.findByLandlordId = async id => {
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
    .where('landLordId', id);
};
