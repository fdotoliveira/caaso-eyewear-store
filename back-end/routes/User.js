const express = require('express');
const router = express.Router();
const UserController = require('../controllers/User')

router.get('/user', UserController.findAll);
router.get('/isAdmin/:token', UserController.isAdmin);
router.get('/getUserByToken/:token', UserController.getUserByToken);

router.post('/user/login', UserController.authUser);
router.post('/user', UserController.create);
router.post('/useradmin', UserController.createAdm);

router.put('/user/:id', UserController.update);
router.put('/userEnd', UserController.updateEnd);
router.put('/userPers', UserController.updatePers);
router.put('/userImage', UserController.updateImage);
router.put('/userPassword', UserController.updatePassword);

router.delete('/user/:id', UserController.remove);
router.delete('/deleteAllUsers', UserController.clearUsers);

module.exports = router;