// Filename: app.js

var BLUEMIX_USERNAME = '';
var BLUEMIX_PASSWORD = '';
var PORT = 8080;

var express = require('express');
var watson = require('watson-developer-cloud');
var url = require('url');

var app = express();

app.get('/api/speak', function(req, res) {
  var query = url.parse(req.url, true).query;

  var text_to_speech = watson.text_to_speech({
    username: BLUEMIX_USERNAME,
    password: BLUEMIX_PASSWORD,
    version: 'v1',
    url: 'https://stream.watsonplatform.net/text-to-speech/api'
  });

  var params = {
    text: query.text,
    voice: 'en-US_AllisonVoice', // Optional voice
    accept: 'audio/wav'
  };

  text_to_speech.synthesize(params).pipe(res);  
});

app.use(express.static(__dirname + '/public'));
app.listen(PORT);

console.log('Application listening on port '+PORT);