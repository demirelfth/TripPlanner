var express = require('express')
var cors = require('cors')
var axios = require('axios');
var bodyParser = require('body-parser');
var app = express()

var _get_locations_path = "https://v5.db.transport.rest/locations?query="
var _get_locations_search ="hamburg";
var _result_number = "&results=3";

var _get_trips_path = "https://v5.db.transport.rest/journeys?from="
var _get_from_station = "8010159";
var _get_trips_to = "&to=";
var _get_to_station = "8000142";
var _get_trips_departure = "&departure=";
var _get_trips_date = "2023-01-18";
var _get_trips_T = "T";
var _get_trips_time = "15:00";

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.post('/locations',async function(req,res){
    //console.log(req.body.search);
    _get_locations_search = req.body.search;

    let http_promise = axios({
        method: 'get',
        url: _get_locations_path + _get_locations_search + _result_number,
        responseType: 'json'
        })
        .then(function (response) {
          return response.data;
        });

    let response_body = await http_promise;

    if (!response_body)
        { console.log('error');}
    else {
        res.send(response_body);
    }

 });


 app.post('/trips',async function(req,res){
    //console.log(req.body);
    _get_from_station = req.body.from;
    _get_to_station = req.body.to;
    _get_trips_date = req.body.date;
    _get_trips_time = req.body.time;

    let http_promise = axios({
        method: 'get',
        url: _get_trips_path +
                _get_from_station +
                _get_trips_to +
                _get_to_station +
                _get_trips_departure +
                _get_trips_date +
                _get_trips_T +
                _get_trips_time,
        responseType: 'json'
        })
        .then(function (response) {
          return response.data;
        });

    let response_body = await http_promise;
    
    if (!response_body)
        { console.log('error');}
    else {
        res.send(response_body);
    }

 });



app.listen(3000, function () {
    console.log('Listening on port 3000')
})
