'use strict';

require('dotenv').config();

let request = require('request');
let querystring = require('querystring');

let message = {
    token: process.env.SLACK_TOKEN,
    channel: process.env.SLACK_CHANNEL,
    as_user: true,
    text: "Good morning ser"
}

let qs = querystring.stringify(message);

let path = 'http://slack.com/api/chat.postMessage?' + qs

request(path, function(error, response, body){
    if (!error && response.statusCode == 200) { 
        console.log('Success');
    } else { 
        console.log(error);
    }
});
