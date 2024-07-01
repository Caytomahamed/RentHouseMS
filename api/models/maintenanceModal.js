const db = require('../data/dbConfig');

// find all maintance
exports.find = async () => await db('maintenanceRequests as m').select('*');

// find maintance by id
exports.findById = async id =>
  await db('maintenanceRequests as m').where('m.id', id).select('*');

// update maintance
exports.findByIdandUpdate = async (id, changes) => {
  const updated_at = new Date().toISOString();
  changes = { ...changes, updated_at };
  await db('maintenanceRequests').where('id', id).update(changes);
  return this.findById(id);
};

// add maintance
exports.create = async maintance => {
  const [id] = await db('maintenanceRequests').insert(maintance);

  await db('maintenanceRequests').where('id', id).update({ isIssue: true });
  return this.findById(id);
};

// delete maintance
exports.findByIdandDelete = async id => {
  await db('maintenanceRequests').where('id', id).del();
  return this.findById(id);
};

// find by landlord id
exports.findByLandlordId = async landlordId =>
  await db('maintenanceRequests as m')
    .join('booking as b', 'm.bookingId', 'b.id')
    .join('properties as p', 'b.propertyId', 'p.id')
    .select(
      'm.id as id ',
      'b.id as bookingId',
      'p.landLordId as landLordId',
      'm.tenantId as tenantId',
      'p.id as propertyId',
      'm.description as description',
      'm.type as type',
      'm.status',
      'm.created_at',
    )
    .where('p.landlordId', landlordId);

// mark as completed
exports.markAsCompleted = async id => {
  const date = new Date().toISOString();

  await db('maintenanceRequests')
    .where('id', id)
    .update({ status: 'completed', updated_at: date });
  return this.findById(id);
};

// delete automatically after 1 days of completion
exports.deleteAfterOneDay = async () => {
  const date = new Date().toISOString();

  return await db('maintenanceRequests')
    .where('status', 'completed')
    .where('updated_at', '<', date)
    .del();
};
