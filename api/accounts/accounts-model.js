const db = require('../../data/db-config.js');

const getAll = () => {
  return db('accounts');
}

const getById = id => {
  return db('accounts').where('id', id).first();
}

const getByName = name => {
  return db('accounts').where('name', name.trim()).first();
}

const create = async account => {
  const [id] = await db('accounts').insert(account);
  return getById(id);
}

const updateById = async (id, account) => {
  return db('accounts').where('id', id).update(account);
}

const deleteById = async id => {
  return db('accounts').where('id', id).delete();
}

module.exports = {
  getAll,
  getById,
  getByName,
  create,
  updateById,
  deleteById,
}
