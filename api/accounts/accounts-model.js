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

const create = account => {
  // DO YOUR MAGIC
}

const updateById = (id, account) => {
  // DO YOUR MAGIC
}

const deleteById = id => {
  // DO YOUR MAGIC
}

module.exports = {
  getAll,
  getById,
  getByName,
  create,
  updateById,
  deleteById,
}
