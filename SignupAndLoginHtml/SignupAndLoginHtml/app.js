const sql = require('mysql');
const express = require('express');

var con = sql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'registrationdb',
    }
)

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(__dirname + '/html'));

app.get('/', (req, res) => res.sendfile(__dirname + '/html/index.html'));

let connectionOn = false;

//To login the page
function login(email, password,req) {
    if (!connectionOn)
        return;
    var query = "select * from signup";

    con.query(query, (err, result) => {
        if (err) {
            throw err;
        }
        else {
            console.log(result);
            if (result.length > 0) {
                let id = '';
                let pass=''
                for (var i = 0; i < result.length; i++) {
                    id = result[i]['email'];
                    pass = result[i]['password'];
                    if (email == id && pass == password) {
                        req.sendFile(__dirname + '/html/GymCollegeWeb.html');
                        console.log(req.headers);
                      /*  req.redirect('GymCollegeWeb.html');*/
                    }
                }

            }
        }
    });
}
app.post('/', (req, res) => {
    let body = req.body;
    register(body['name'], body['emailField'], body['passwordField']);
    console.log('headers', req.headers);
})

app.post('/login.html', (req, res) => {
    let body = req.body;
    login(body['emailField'], body['passwordField'],res);
})
app.listen('8080', () => console.log('connected'));



//To register the page
con.connect(function (err) {
    if (err) throw err;
    else {
        connectionOn = true;
    }
});
function register(name, email, password) {
    if (!connectionOn)
        return;

    var query = "Insert into signup (name, email,password) VALUES ?";
    var values = [[`${name}`, `${email}`, `${password}`]];
    con.query(query, [values], (err, result) => {
        if (err) {
            throw err;
        }
        else {
            console.log('record inserted');
        }
    });
}