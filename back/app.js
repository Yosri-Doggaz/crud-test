const exp = require("express");
const admin = require("firebase-admin");
const cert = require('./clients.json');
const bodyParser = require('body-parser');


admin.initializeApp({
    credential: admin.credential.cert(cert),
    databaseURL: "https://clientsdb-ffc9e-default-rtdb.firebaseio.com"
});

const db = admin.database();

const apis = exp();
apis.use(bodyParser.urlencoded({ extended: false }));
apis.use(bodyParser.json());
apis.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

apis.post('/add', (req, res) => {
    var ref = db.ref('/Clients');
    ref.child(req.body.cin).set({
        "name": req.body.name,
        "email": req.body.email,
        "phone": req.body.phone
    }).then(()=>res.send("true"));
});

apis.get('/readData', (req, res) => {
    var ref = db.ref('/Clients');
    ref.once("value", snap => {
        var data = [];
        snap.forEach(el => {
            var x = {
                "cin": el.key,
                ...el.val()
            };
            data.push(x);
        });
        res.json(data);
    });
});

apis.post('/delClient', (req, res) => {
    db.ref('/Clients/' + req.body.cin).remove().then(() => res.send("done"));
});

apis.post('/update', (req, res) => {
    var ref = db.ref('/Clients/' + req.body.cin);
    ref.update({
        "name": req.body.name,
        "email": req.body.email,
        "phone": req.body.phone
    }).then(() => res.send("done"));
});

apis.listen(5001, () => console.log("Listening on port 5001"));