const {Router} = require('express');
const { greeting, register } = require('../controllers/demo.controllers');

const router = Router();

router.get('/greeting',greeting);
router.post('/register',register);


module.exports = router;