const bcrypt = require('bcrypt');
const crypto = require('crypto');
const db = require('../data/dbConfig');

// DASHBOARD
exports.summeryDashboard = () => db.count().from('users');

// Find all users
exports.find = async () =>
  db
    .from('users as u')
    .join('roles as r', 'u.roleId', '=', 'r.id')
    .select(
      'u.id',
      'firstname',
      'lastname',
      'email',
      'password',
      'phone',
      'imageUrl',
      'state',
      'city',
      'address',
      'name as userType',
      'isActive',
    );
// Find all users
exports.findTenants = async () =>
  db
    .from('users as u')
    .join('roles as r', 'u.roleId', '=', 'r.id')
    .select(
      'u.id',
      'firstname',
      'lastname',
      'email',
      'password',
      'phone',
      'imageUrl',
      'state',
      'city',
      'address',
      'name as userType',
      'isActive',
    )
    .where('userType', 'tenants');

// Find all users
exports.findLandLord = async () =>
  db
    .from('users as u')
    .join('roles as r', 'u.roleId', '=', 'r.id')
    .select(
      'u.id',
      'firstname',
      'lastname',
      'email',
      'password',
      'phone',
      'imageUrl',
      'state',
      'city',
      'address',
      'name as userType',
      'isActive',
    )
    .where('userType', 'landlord');

// find user by id
exports.findById = async id =>
  await db
    .from('users as u')
    .join('roles as r', 'u.roleId', '=', 'r.id')
    .select(
      'u.id',
      'firstname',
      'lastname',
      'email',
      'password',
      'phone',
      'imageUrl',
      'state',
      'city',
      'address',
      'name as userType',
      'isActive',
    )
    .where('u.id', id);

// Update user by ID and return the updated user
exports.findByIdandUpdate = async (id, changes) => {
  return db('users').update(changes).where('id', id).returning('*');
};

// Create a new student
exports.create = async studentData => {
  let userId;

  await db.transaction(async trx => {
    const [role] = await trx('roles').where('name', 'tenants');
    const roleIdToUse = role ? role.id : 3;

    const hash = await bcrypt.hashSync(studentData.password, 12);

    const [createdUserId] = await trx('users').insert({
      firstname: studentData.firstname,
      lastname: studentData.lastname,
      password: hash,
      email: studentData.email,
      phone: studentData.phone,
      imageUrl: studentData.imageUrl,
      address: studentData.address,
      city: studentData.city,
      state: studentData.state,
      birthday: studentData.birthday,
      roleId: roleIdToUse,
    });

    userId = createdUserId;
  });

  return this.findById(userId);
};

// Delete user by ID
exports.findByIdandDelete = async id => db('users').where('id', id).del();

// update me [update current user]
exports.updateMe = async (id, changes) => {
  const userChanges = {};

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
        'city',
        'state',
        'isActive',
      ].includes(key)
    ) {
      if (key === 'password') {
        userChanges[key] = bcrypt.hashSync(changes[key], 12);
      } else userChanges[key] = changes[key];
    }
  });

  const commonUpdate = {
    updatedAt: new Date(Date.now()), // update the updated at field
  };

  await db.transaction(async trx => {
    await trx('users')
      .update({ ...userChanges, ...commonUpdate })
      .where('id', id);
  });

  return this.findById(id);
};

// Find user notifications
exports.findByUserNotify = async id =>
  db.select().from('notifications').where('userId', id);

// Find a single user by filter
exports.findOne = async ({ condition, field }) => {
  return db.select().from('users as u').where(condition, field).first();
};

// Check if the provided password matches the user's hashed password
exports.correctPassword = async (password, userPassword) => {
  return await bcrypt.compare(password, userPassword);
};

// Check if the user's password was changed after a specific timestamp
exports.changePasswordAfter = (updateTime, JWTTimestamp) => {
  if (updateTime) {
    const changedTimestamp = new Date(updateTime).getTime() / 1000;
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

// Create a password reset token for the user
exports.createPasswordResetToken = async user => {
  const resetToken = crypto.randomBytes(32).toString('hex');

  const hashedToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  const changes = {
    passwordResetToken: hashedToken,
    passwordResetExpires: Date.now() + 10 * 60 * 1000, // 10 minutes
  };

  await this.findByIdandUpdate(user.id, changes);

  return resetToken;
};
