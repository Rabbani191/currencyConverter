var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var dotenv = require('dotenv');
dotenv.config();


app.use('/',express.static('web'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const PORT = process.env.PORT;

app.listen(PORT,function(){
console.log("server is listening at port ", PORT );
});
