var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var app = express();
app.use(express.static(__dirname + '/public')); //Serves resources from public folder
// app.get('/', function (req, res) {
//     res.send('<html><body><h1>Hello World</h1></body></html>');
// });
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/myForm', function (req, res) {
    res.sendFile(__dirname+'/index.html');
})
app.get('/', function (req, res) {
    res.send(
        `
            <!DOCTYPE html>

            <html xmlns="http://www.w3.org/1999/xhtml">
            <head>
                <meta charset="utf-8" />
                <title></title>
            </head>
            <body>
                <form action="/submit-student-data" method="post">
                    First Name: <input name="firstName" type="text" /> <br />
                    Last Name: <input name="lastName" type="text" /> <br />
                    <input type="submit" />
                </form>
            </body>
            </html>
        `
    );
});

app.post('/submit-student-data', function (req, res) {
    var name = req.body.firstName + ' ' + req.body.lastName;
    
    res.send(name + ' Submitted Successfully!');
});

// app.post('/submit-data', function (req, res) {
//     res.send('POST Request');
// });

app.put('/update-data', function (req, res) {
    res.send('PUT Request');
});

app.delete('/delete-data', function (req, res) {
    res.send('DELETE Request');
});
//
// Connect to the db
MongoClient.connect("mongodb://localhost:27017/MyDB", function (err, db) {
    
    db.collection('Persons', function (err, collection) {
        
        collection.insert({ id: 1, firstName: 'Steve', lastName: 'Jobs' });
        collection.insert({ id: 2, firstName: 'Bill', lastName: 'Gates' });
        collection.insert({ id: 3, firstName: 'James', lastName: 'Bond' });
        
        

        db.collection('Persons').count(function (err, count) {
            if (err) throw err;
            
            console.log('Total Rows: ' + count);
        });
    });
});











var server = app.listen(5000, function () {
    console.log('Node server is running..');
});