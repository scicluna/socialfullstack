const router = require('express').Router();
const thoughtRoutes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes');

//import api routes here
router.use('/users', userRoutes)
router.use('/thoughts', thoughtRoutes)

module.exports = router;
