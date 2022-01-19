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

router.post('/', checkAccountPayload, (req, res, next) => {
  // DO YOUR MAGIC
  try { 
    res.json('post account')
  } catch (err) {
    next(err);
  }
})

router.put('/:id', (req, res, next) => {
  // DO YOUR MAGIC
  try { 
    res.json('put account by ID')
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', (req, res, next) => {
  // DO YOUR MAGIC
  try { 
    res.json('delete account by ID')
  } catch (err) {
    next(err);
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  res.status(err.status || 500).json({ message: err.message });
})

module.exports = router;
