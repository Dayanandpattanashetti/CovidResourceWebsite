const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.view);
router.post('/', userController.find);
router.get('/addhospital', userController.form);
router.post('/addhospital', userController.create);
router.get('/update/:id', userController.update);
router.post('/update/:id', userController.update2);
router.get('../../views/layouts/main.css', function(req, res){ res.send('../../views/layouts/main.css'); res.end(); });


module.exports = router;