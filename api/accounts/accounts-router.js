const router = require('express').Router()
const Account = require('./accounts-model.js');

const { checkAccountPayload, 
        checkAccountNameUnique, 
        checkAccountId 
      } = require('./accounts-middleware.js');

router.get('/', async (req, res, next) => {
  try { 
    const accounts = await Account.getAll();
    res.json(accounts);
  } catch (err) {
    next(err);
  }
})

router.get('/:id', checkAccountId, async (req, res) => {
  res.json(req.account);
})

router.post('/', checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  try { 
    const account = await Account.create(req.body);
    res.status(201).json(account);
  } catch (err) {
    next(err);
  }
})

router.put('/:id', checkAccountPayload, checkAccountId, async (req, res, next) => {
  try { 
    await Account.updateById(req.params.id);
    const updatedAccount = Account.getById(req.params.id);
    res.json(updatedAccount);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
  try { 
    await Account.deleteById(req.params.id);
    res.json(req.account);
  } catch (err) {
    next(err);
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({ message: err.message });
})

module.exports = router;
