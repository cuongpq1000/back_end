var express = require('express');
var router = express.Router();
const userController = require('../controllers/user.controller');
const Role = require('../helpers/role');
const authorize = require('../helpers/authorize');


router.post('/authenticate', userController.authenticate);
router.post('/register', userController.register);
router.get('/allusers', authorize(Role.admin), userController.getAllUsers);


module.exports = router;