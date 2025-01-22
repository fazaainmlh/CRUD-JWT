const express = require("express");
const userController = require("../Controllers/userController.js");
const jwtAuthenticate = require("../middleware/jwtMiddlewar.js");

const router = express.Router();

router.get('/users' , jwtAuthenticate, userController.getUsers);
router.get('/users/:id', userController.getUsersById);
router.post('/users', userController.createUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;