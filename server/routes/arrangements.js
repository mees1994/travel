/**
 * Created by Mees on 12/26/2015.
 */
/*jsLint node: true, devel:true */
/*jshint strict:false */
/*global require, module */

var express = require('express');
var router = express.Router();

var controller = require('../app/controllers/arrangements.js');

// CREATE
router
    .post('/arrangements', controller.create);

// RETRIEVE
router
    .get('/arrangements/:hotelId', controller.list)
    .get('/arrangement/:_id', controller.detail);

// UPDATE
router
    .put('/arrangements/:_id', controller.updateOne);

// DELETE
router
    .delete('/arrangements/:_id', controller.deleteOne);


module.exports = router;