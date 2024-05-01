const db = require('../data/dbConfig');
const bcrypt = require('bcrypt');

// Find all drivers
exports.find = async () =>
  db
    .from('users as u')
    .join('roles as r', 'u.roleId', '=', 'r.id')
    .join('drivers as d', 'u.id', '=', 'd.userId')
    .select(
      'u.id',
      'd.id as driverId',
      'firstname',
      'lastname',
      'email',
      'password',
      'phone',
      'imageUrl',
      'address',
      'driverType',
      'name as userType',
      'isActive',
    );
// find student by id
exports.findById = async id =>
  db
    .from('users as u')
    .join('roles as r', 'u.roleId', '=', 'r.id')
    .join('drivers as d', 'u.id', '=', 'd.userId')
    .select(
      'u.id',
      'firstname',
      'lastname',
      'email',
      'password',
      'phone',
      'imageUrl',
      'address',
      'name as userType',
      'isActive',
    )
    .where('u.id', id);

exports.findByIdandUpdate = async (id, changes) => {
  const userChanges = {};
  const driverChanges = {};

  const [user] = await this.findById(id);

  if (!user) return [];

  Object.keys(changes).forEach(key => {
    if (
      [
        'firstname',
        'lastname',
        'email',
        'imageUrl',
        'password',
        'address',
        'phone',
        'isActive',
      ].includes(key)
    ) {
      if (key === 'password') {
        userChanges[key] = bcrypt.hashSync(changes[key], 12);
      } else userChanges[key] = changes[key];
    } else if (['driverType'].includes(key)) {
      driverChanges[key] = changes[key];
    }
  });

  const commonUpdate = {
    updatedAt: new Date(Date.now()), // Optional: Update the 'updatedAt' timestamp
  };

  await db.transaction(async trx => {
    await trx('users')
      .update({ ...userChanges, ...commonUpdate })
      .where('id', id);
    await trx('drivers')
      .update({ ...driverChanges, ...commonUpdate })
      .where('id', id);
  });

  return this.findById(id);
};

exports.create = async driverData => {
  let userId;

  await db.transaction(async trx => {
    const [role] = await trx('roles').where('name', 'driver');
    const roleIdToUse = role ? role.id : 2; // Default to a regular user role if 'driver' role not found

    const hash = await bcrypt.hashSync(driverData.password, 12);

    const [createdUserId] = await trx('users').insert({
      firstname: driverData.firstname,
      lastname: driverData.lastname,
      password: hash,
      email: driverData.email,
      address: driverData.address,
      phone: driverData.phone,
      imageUrl: driverData.imageUrl,
      roleId: roleIdToUse,
    });

    userId = createdUserId;

    await trx('drivers').insert({
      userId,
      driverType: driverData.driverType,
    });
  });

  return this.findById(userId);
};
