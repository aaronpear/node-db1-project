const Account = require('./accounts-model.js');
const { getByName } = require('./accounts-model.js');

exports.checkAccountPayload = (req, res, next) => {
  const { name, budget } = req.body;

  if (name === undefined || budget === undefined) {
    next({ status: 400, message: 'name and budget are required' });
  } else if (name.trim().length < 3 || name.trim().length > 100) {
    next({ status: 400, message: 'name of account must be between 3 and 100' });
  } else if (typeof budget !== 'number' || isNaN(budget)) {
    next({ status: 400, message: 'budget of account must be a number' });
  } else if (Math.sign(budget) === -1 || budget > 1000000) {
    next({ status: 400, message: 'budget of account is too large or too small' });
  } else {
    next();
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  try {
    const existingAccount = await Account.getByName(req.body.name);
    console.log(existingAccount);

    if (existingAccount) {
      next({ status: 400, message: 'that name is taken' });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}

exports.checkAccountId = async (req, res, next) => {
  try {
    const account = await Account.getById(req.params.id);
    if (!account) {
      next({ status: 404, message: 'Account not found' })
    } else {
      req.account = account;
      next();
    }
  } catch (err) {
    next(err);
  }
}
