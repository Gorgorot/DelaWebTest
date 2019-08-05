const express = require("express");
var app = express();
const pg = require("pg");
const jwt = require("jwt-simple");
const cookieParser = require('cookie-parser')

const SECRET = "Key";

//строка для подключения к базе данных
const conString = "postgres://postgres:AiaGrt6308@localhost:5432/Test";
var Client = new pg.Client(conString);
Client.connect();

const PORT = 3000;

const jsonParser = express.json();

app.use(express.static('public'));
app.use(cookieParser());

app.use(function(req, res, next) {
    console.log(req);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/", (request, response)=>{
    response.sendFile(`${__dirname}/public/static/index.html`);
})

app.post("/api/auth", jsonParser, (request, response)=>{
    var password = request.body.password,
        email = request.body.email;
    Client.query(`SELECT * FROM Users WHERE Email = '${email}'`)
        .then(db_response=>{
            if(db_response.rows.length > 0 && db_response.rows[0].pass == password){
                response.cookie("token", jwt.encode({
                    id: db_response.rows[0].id,
                    email: db_response.rows[0].email
                }, SECRET, "HS512"), { httpOnly: true });
                response.send({ status: true, id: db_response.rows[0].id, email: db_response.rows[0].email});
            }
            else {
                response.send({ status: false });
            }
        })
        .catch(err=>{
            throw err;
        })
});

app.post("/api/profile/edit", jsonParser, (request, response)=>{
    var UserData = jwt.decode(request.cookies.token, SECRET, "HS512"),
        NewData = request.body;
    Client.query(`UPDATE public."Profile" SET "About"='${NewData.about}', "City"='${NewData.city}', "Country"='${NewData.country}', "Birthday"='${NewData.birthday}' WHERE "UserId"=${UserData.id}`)
        .then(db_response=>{
            response.send({status: true});
        })
        .catch(err=>{
            throw err;
        })
})

app.post("/api/profile/get", (request, response)=>{
    var UserData = jwt.decode(request.cookies.token, SECRET, "HS512");
    Client.query(`SELECT * FROM public."Profile" WHERE "UserId"=${UserData.id}`)
        .then(db_response=>{
            if(db_response.rowCount > 0){
                response.send({
                    status: true,
                    city: db_response.rows[0].City,
                    country: db_response.rows[0].Country,
                    birthday: db_response.rows[0].Birthday,
                    about: db_response.rows[0].About
                })
            }
            else {
                response.send({
                    status: false
                })
            }
        })
        .catch(err=>{
            throw err;
        })
})

app.listen(PORT, ()=>{
    console.info(`Server started at http://localhost:${PORT}`);
})
