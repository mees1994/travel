/**
 * Created by Mees on 12/22/2015.
 */
/* global require */

(function () {
    "use strict";

    var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        schemaName,
        modelname;

    schemaName = new Schema({
        hotelName: {type: String, required: true},
        picture: {type: String, required: false},
        address: {type: String, required: true},
        postcode: {type: String, required: true},
        phoneNumber: {type: Number, required: false},
        locationId: {type: String, required: true}
        },
        {collection: 'hotels'});

    modelname = "Hotel";
    mongoose.model(modelname, schemaName);

}());