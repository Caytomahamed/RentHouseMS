const db = require('../data/dbConfig');

// find
exports.find = async () => db('routes');
exports.findById = async id => await db('routes').where('id', id);

exports.create = async route => {
  const [id] = await db('routes').insert(route);
  return this.findById(id);
};

exports.findByIdandUpdate = async (id, changes) =>
  db('routes').where('id', id).update(changes).returning('*');

exports.findByIdandDelete = async id => db('routes').where('id', id).del();
