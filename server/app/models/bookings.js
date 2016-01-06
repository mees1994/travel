/**
 * Created by Mees on 12/31/2015.
 */
/* global require */

(function () {
    "use strict";

    var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        schemaName,
        modelname;

    schemaName = new Schema({
        nPersons: {type: Number, required: true},
        nDays: {type: Number, required: true},
        startDate: {type: Date, required: true},
        totalPrice: {type: Number, required: true},
        hotelId: {type: String, required: true},
        arrangementName: {type: String, required: true},
        personName: {type: String, required: true}
        },
        {collection: 'bookings'});

    modelname = "Booking";
    mongoose.model(modelname, schemaName);

}());