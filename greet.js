'use strict';

let request = require('request');
let querystring = require('querystring');

let slack = class Slack{

    constructor(options){
        this.options = options;
    }

    setText(text){
        this.options.text = text;
    }

    postMessage(){
        let qs = querystring.stringify(this.options);

        let apiUrl = 'http://slack.com/api/chat.postMessage?' + qs;

        request(apiUrl, function(error, response, body){
            if (!error && response.statusCode == 200) { 
                console.log('Success');
            } else { 
                console.log(error);
            }
        });
    }
    
}

module.exports = slack;