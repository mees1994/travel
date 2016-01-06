/**
 * Created by Mees on 12/22/2015.
 */
/* global exports, require, __filename */
/*jshint strict:false */

var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

exports.create = function (req, res) {


    var doc = new Hotel(req.body);

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

    Hotel
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

    conditions = {locationId: req.params.locationId};
    fields = {};

    // left the sort out of it
    Hotel
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

exports.detail = function (req, res) {
    var conditions, fields;

    conditions = {_id: req.params._id};
    fields = {};

    Hotel
        .findOne(conditions, fields)
        .exec(function (err, doc) {

            var retObj = {
                meta: {"action": "detail", 'timestamp': new Date(), filename: __filename},
                doc: doc,
                err: err
            };

            return res.send(retObj);
        });
};

exports.updateOne = function (req, res) {

    var conditions =
        {_id: req.params._id},
        update = {
            hotelName: req.body.hotelName || '',
            picture: req.body.picture || '',
            address: req.body.address || '',
            postcode: req.body.postcode || '',
            phoneNumber: req.body.phoneNumber || '',
            locationId: req.body.locationId || ''
        },
        options = {multi: false},
        callback = function (err, doc) {
            var retObj = {
                meta: {"action": "update", 'timestamp': new Date(), filename: __filename},
                doc: doc,
                err: err
            };
            return res.send(retObj);
        };

    Hotel
        .findOneAndUpdate(conditions, update, options, callback);
};

exports.deleteOne = function (req, res) {
    var conditions, callback;

    conditions = {_id: req.params._id};
    callback = function (err, doc) {
        var retObj = {
            meta: {"action": "delete", 'timestamp': new Date(), filename: __filename},
            doc: doc,
            err: err
        };
        return res.send(retObj);
    };

    Hotel
        .remove(conditions, callback);
};