'use strict';

require('dotenv').config();

let argv = require('minimist');
let request = require('request');
let querystring = require('querystring');

let args = argv(
    process.argv.slice(2), 
    {
        // argument names to always treat as strings
        string: ['cmd', 'channel', 'text'],

        // will treat all double hyphenated arguments without equal signs as boolean 
        boolean: true,

        // argument names to default values
        default: {
            'cmd': 'greet',
            'channel': process.env.SLACK_CHANNEL,
            'text': '',
            'as-user': true
        }
    }
);

if(args.cmd === 'greet'){

    let message = {
        token: process.env.SLACK_TOKEN,
        channel: args.channel,
        as_user: args['as-user'],
        text: args.text
    }
    
    let qs = querystring.stringify(message);
    
    let path = 'http://slack.com/api/chat.postMessage?' + qs;
    
    request(path, function(error, response, body){
        if (!error && response.statusCode == 200) { 
            console.log('Success');
        } else { 
            console.log(error);
        }
    });

}