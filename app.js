// sqlite3 docs: https://github.com/mapbox/node-sqlite3/wiki/API
// express docs: http://expressjs.com/4x/api.html

var sqlite3 = require('sqlite3'); // add .verbose() for debugging
var db = new sqlite3.Database('db.sql', sqlite3.OPEN_READONLY, function(err) {
    if (err) {
        console.log(err);
    } else {

        var express = require('express');
        var app = express();

        app.get(/^\/(\d{7})$/, function(req, res) {
            db.get('SELECT cep, city FROM ceps WHERE cep = "' + req.params[0] + '"', function(err, row) {
                if (err) {
                    console.log(err);
                    res.send(503, 'Boom!');
                } else if (row) {

                    res.set('Cache-Control', 'max-age=300'); // cache for 5 minutes
                    res.set('Access-Control-Allow-Origin', '*'); // allow requests from any domain

                    res.send(
                        JSON.stringify(row)
                    );

                } else {
                    res.send(404, 'CEP not found');
                }
            });
        });
    }
});
