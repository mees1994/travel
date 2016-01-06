/**
 * Created by Mees on 12/14/2015.
 */
/* global require */

(function () {
    "use strict";

    var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        schemaName,
        modelname;

    schemaName = new Schema({
            locationName: {type: String, required: true},
            countryId: {type: String, required: true},
            picture: {type: String, required: true}
        },
        {collection: 'locations'});

    modelname = "Location";
    mongoose.model(modelname, schemaName);

}());