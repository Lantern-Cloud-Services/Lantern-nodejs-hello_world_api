var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
//var TYPES = require('tedious').TYPES;

// Derived from connections string in azure
connStr = process.env.SQLCONNSTR_icecreamdbconnstr;

propsMap = new Map();
connStrArr = connStr.split(";")

for (prop in connStrArr)
{
    propsStrArr = connStrArr[prop].split("=");
    propsMap[propsStrArr[0]] = propsStrArr[1];
}

var config = {
    server: (propsMap['Server'].split(",")[0]).split(':')[1],
    authentication: {
        type: 'default',
        options: {
            userName: propsMap['User ID'],
            password: propsMap['Password']
        }
    },
    options: {
        // If you are on Microsoft Azure, you need encryption:
        encrypt: true,
        database: propsMap['Initial Catalog']
    }
};

var connection = new Connection(config);
connection.on('connect', function(err) {
    // If no error, then good to proceed.
    console.log("Connected");
    //console.log(config)
});

module.exports = {
    executeStatement: function ()
    {
        request = new Request("select * from UserFavorites", function (err) {
            if (err) {
                console.log(err);
            }
        });
        resMap = new Map();
        let returnstr = "val:"
        request.on('row', function (columns, returnstr) {
            //returnstr += " "
            var username;
            var favorite;
            columns.forEach(function (column) {
                if (column.metadata.colName === 'UserName')
                {
                    username = column.value;
                }
                if (column.metadata.colName === 'Favorite')
                {
                    favorite = column.value;
                }
            });

            returnstr = username + ":" + favorite;
            resMap[username] = favorite;

            console.log(returnstr);
        });


        /*
        request.on('requestCompleted', function() {
            //console.log(returnstr);
        });
        */

        connection.execSql(request);

        console.log("res: " + resMap);
        return resMap;
    }
}

