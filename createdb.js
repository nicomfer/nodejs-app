var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db.sql');

db.serialize(function() {

    db.run("CREATE TABLE ceps (cep INTEGER UNSIGNED PRIMARY KEY, city TEXT)");

    var stmt = db.prepare("INSERT INTO ceps VALUES (?, ?)");
    var data = [
        {"cep": 2387462, "city": "Sao Paulo"},
        {"cep": 2304200, "city": "Rio de Janeiro"}
    ];
    for (var i = 0; i < data.length; i++) {
        stmt.run(data[i].cep, data[i].city);
    }
    stmt.finalize();

    db.each("SELECT cep, city FROM ceps ORDER BY cep", function(err, row) {
        console.log(row.cep + ": " + row.city);
    });

});

db.close();
