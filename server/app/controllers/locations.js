/**
 * Created by Mees on 12/22/2015.
 */
/* global exports, require, __filename */

var mongoose = require('mongoose');
var Location = mongoose.model('Location');

exports.create = function (req, res) {
    "use strict";
    var doc = new Location(req.body);

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
    "use strict";
    var conditions, fields;

    conditions = {};
    fields = {};

    Location
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
    "use strict";
    var conditions, fields;

    conditions = {countryId: req.params.countryId};
    fields = {};

    // left the sort out of it
    Location
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
    "use strict";
    var conditions, fields;

    conditions = {_id: req.params._id};
    fields = {};

    Location
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
    "use strict";

    var conditions =
        {_id: req.params._id},
        update = {
            locationName: req.body.locationName || '',
            countryId: req.body.countryId || '',
            picture: req.body.picture || ''
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

    Location
        .findOneAndUpdate(conditions, update, options, callback);
};

exports.deleteOne = function (req, res) {
    "use strict";
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

    Location
        .remove(conditions, callback);
};