/**
 * Created by Mees on 12/31/2015.
 */
/*jsLint node: true, devel:true */
/*jshint strict:false */
/*global require, module */

var express = require('express');
var router = express.Router();

var controller = require('../app/controllers/bookings.js');

// CREATE
router
    .post('/bookings', controller.create);

// RETRIEVE
router
    .get('/bookings', controller.list)
    .get('/bookings/:hotelId', controller.specList);

module.exports = router;