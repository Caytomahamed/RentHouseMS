const db = require('../data/dbConfig');

// find all maintance
exports.find = async () => await db('maintenanceRequests as m').select('*');

// find maintance by id
exports.findById = async id =>
  await db('maintenanceRequests as m').where('m.id', id).select('*');

// add maintance
exports.create = async maintance => {
  const [id] = await db('maintenanceRequests').insert(maintance);
  console.log('id', id);
  return this.findById(id);
};

// update maintance
exports.findByIdandUpdate = async (id, changes) => {
  await db('maintenanceRequests').where('id', id).update(changes);
  return this.findById(id);
};

// delete maintance
exports.findByIdandDelete = async id => {
  await db('maintenanceRequests').where('id', id).del();
  return this.findById(id);
};
