/**
 * Created by Mees on 12/22/2015.
 */
/*jsLint node: true, devel:true */
/*jshint strict:false */
/*global require, module */

var express = require('express');
var router = express.Router();

var controller = require('../app/controllers/hotels.js');

// CREATE
router
    .post('/hotels', controller.create);

// RETRIEVE
router
    .get('/hotels', controller.list)
    .get('/hotels/:_id', controller.detail)
    .get('/hotels-from-location/:locationId', controller.specList);

// UPDATE
router
    .put('/hotels/:_id', controller.updateOne);

// DELETE
router
    .delete('/hotels/:_id', controller.deleteOne);


module.exports = router;
