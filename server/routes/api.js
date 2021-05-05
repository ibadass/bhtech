const express = require('express');
// const mongoose = require('mongoose');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

let controllers = require('../controllers/controllers');

router.get('/fakeprobe', controllers.index);
router.get('/filtering/:value', controllers.filter);
router.post('/user', controllers.newuser);
router.patch('/user/:id', controllers.edituser);

module.exports = router;
