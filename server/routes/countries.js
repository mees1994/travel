/*jsLint node: true, devel:true */
/*global require, module */
/*jshint strict:false */

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
var controller = require('../app/controllers/countries.js');

// CREATE
/** CREATE route for books */
router
    .post('/countries', controller.create);

// RETRIEVE
router
    .get('/countries', controller.list)
    .get('/countries/:_id', controller.detail);

// UPDATE
router
    .put('/countries/:_id', controller.updateOne);

// DELETE
router
    .delete('/countries/:_id', controller.deleteOne);


module.exports = router;
