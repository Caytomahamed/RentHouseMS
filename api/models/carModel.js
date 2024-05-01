const db = require('../data/dbConfig');

// find
exports.find = async () =>
  await db('cars as c')
    .select(
      'LicenseNumber',
      'bookedSeats',
      'capacity',
      'carImg',
      'carPlateNumber',
      'carType',
      'color',
      'driverId',
      'c.id as id ',
      'make',
      'model',
      'seatsLeft',
      'year',
      'firstname',
      'lastname',
    )
    .join('drivers as d ', 'd.id', '=', 'c.driverId')
    .join('users as u ', 'u.id', '=', 'd.userId');

exports.findById = async id => await db('cars').where('id', id);
exports.findByDriverId = async id => await db('cars').where('driverId', id);
exports.create = async car => {
  const newCar = { ...car };
  newCar['seatsLeft'] = newCar.capacity;
  const [id] = await db('cars').insert(newCar);
  return this.findById(id);
};

exports.findByIdandUpdate = async (id, changes) =>
  db('cars').where('id', id).update(changes).returning('*');

exports.findByIdandDelete = async id => db('cars').where('id', id).del();
