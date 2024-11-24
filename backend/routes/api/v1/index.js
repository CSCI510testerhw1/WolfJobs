const express = require('express');

const router = express.Router();

router.use('/users',require('./users'));
router.use('/profile',require('./profiles'));

module.exports = router;