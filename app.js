
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors')
var axios = require('axios')


var app = express();

app.locals.pretty = true;
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/app/server/views');
app.set('view engine', 'pug');
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('stylus').middleware({ src: __dirname + '/app/public' }));
app.use(express.static(__dirname + '/app/public'));

app.get('*', function(req, res) { res.render('home'); });

app.post('/tokenize', function (req, res) {
	axios.post("http://34.76.106.188:8000/yap/heb/joint", req.body.body)
	.then(function (response) {
		res.send(response.data)
	})
	.catch(function (error) {
		res.send(error)
	});
});

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});

