/**
 * Created by Mees on 12/14/2015.
 */
/*jsLint node: true, devel:true */
/*jshint strict:false */
/*global require, module */


/** @module Routes for books */
/** @class */
var express = require('express');
var router = express.Router();

/**  book routes
 ---------------
 We create a variable "user" that holds the controller object.
 We map the URL to a method in the created variable "controller".
 In this example is a mapping for every CRUD action.
 */
var controller = require('../app/controllers/locations.js');

// CREATE
/** CREATE route for books */
router
    .post('/locations', controller.create);

// RETRIEVE
router
    .get('/locations', controller.list)
    .get('/locations/:_id', controller.detail)
    .get('/location/:countryId', controller.specList);

// UPDATE
router
    .put('/locations/:_id', controller.updateOne);

// DELETE
router
    .delete('/locations/:_id', controller.deleteOne);


module.exports = router;
