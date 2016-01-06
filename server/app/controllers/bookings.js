/**
 * Created by Mees on 12/31/2015.
 */
/* global exports, require, __filename */
/*jshint strict:false */

var mongoose = require('mongoose');
var Booking = mongoose.model('Booking');

exports.create = function (req, res) {

    var doc = new Booking(req.body);

    doc.save(function(err) {

        var retObj = {
            meta: {"action": "create", 'timestamp': new Date(), filename: __filename},
            doc: doc,
            err: err
        };

        return res.send(retObj);
    });
};

exports.list = function (req, res) {
    var conditions, fields;

    conditions = {};
    fields = {};

    // left the sort out of it
    Booking
        .find(conditions, fields)
        .exec(function (err, doc) {

            var retObj = {
                meta: {"action": "list", 'timestamp': new Date(), filename: __filename},
                doc: doc,
                err: err
            };

            return res.send(retObj);
        });
};

exports.specList = function (req, res) {
    var conditions, fields;

    conditions = {hotelId: req.params.hotelId};
    fields = {};

    // left the sort out of it
    Booking
        .find(conditions, fields)
        .exec(function (err, doc) {

            var retObj = {
                meta: {"action": "list", 'timestamp': new Date(), filename: __filename},
                doc: doc,
                err: err
            };

            return res.send(retObj);
        });
};
