const router = require('express').Router();
const { route } = require('../homeRoutes.js');
const tagRoutes = require('./tagRoutes.js');
const userbookRoutes = require('./userbookRoutes.js');
const userRoutes = require('./userRoutes.js');


router.use('/userbook', userbookRoutes);
router.use('/tags', tagRoutes);
router.use('/user', userRoutes);

module.exports = router;