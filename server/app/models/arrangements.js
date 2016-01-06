/**
 * Created by Mees on 12/26/2015.
 */
/* global require */

(function () {
    "use strict";

    var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        schemaName,
        modelname;

    schemaName = new Schema({
        arrangementName: {type: String, required: true},
        pricePPPN: {type: Number, required: true},
        hotelId: {type: String, required: true}
        },
        {collection: 'arrangements'});

    modelname = "Arrangement";
    mongoose.model(modelname, schemaName);

}());