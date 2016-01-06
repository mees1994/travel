/**
 * Created by Mees on 12/26/2015.
 */
/* global exports, require, __filename */
/*jshint strict:false */

var mongoose = require('mongoose');
var Arrangement = mongoose.model('Arrangement');

exports.create = function (req, res) {

    var doc = new Arrangement(req.body);

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

    conditions = {hotelId: req.params.hotelId};
    fields = {};

    // left the sort out of it
    Arrangement
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

    Arrangement
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
            arrangementName: req.body.arrangementName || '',
            pricePPPN: req.body.pricePPPN || '',
            hotelId: req.body.hotelId || ''
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

    Arrangement
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

    Arrangement
        .remove(conditions, callback);
};