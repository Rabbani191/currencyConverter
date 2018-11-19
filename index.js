const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const app = express();
const dotenv = require('dotenv');
dotenv.config();


app.use('/',express.static('web'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.disable('etag');

const baseUrl = `http://data.fixer.io/api/`;

app.get('/getCurrencyList', function (req, res, next) {
    request(`${baseUrl}latest?access_key=${process.env.KEY}`, function (error, response, body) {
        (!error) ?  res.send(body): next(err);
    });


});

app.get('/conversionResult', function (req, res) {
    request(`${baseUrl}convert?access_key=${process.env.KEY}&from=${req.query.from}&to=${req.query.to}&amount=${req.query.amount}&format=1`, function (error, response, body) {
        (!error) ?  res.send(body): next(err);
    });

});

const PORT = process.env.PORT;

app.listen(PORT,function(){
console.log("server is listening at port ", PORT );
});
