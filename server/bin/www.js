/*jsLint node: true, devel:true */
/* global console, require */

var app = require('../server.js');

var server = app.listen(app.get('port'), function () {
    "use strict";
    console.log('Express server listening on port' + server.address().port);
});