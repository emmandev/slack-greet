'use strict';

require('dotenv').config();

let argv = require('minimist');
let slack = require('./greet.js');
let ram = require('./rickandmorty');

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

let message = {
    token: process.env.SLACK_TOKEN,
    channel: args.channel,
    as_user: args['as-user']
}
let s = new slack(message);

switch(args.cmd){
    case 'greet':
        s.setOptions({text: args.text});
        s.postMessage();
    break;

    case 'ram':
        let r = new ram();
        r.getQuotePromise().then(quote => {
            let options = r.slackOptions();
            options.text = quote;
            s.setOptions(options);
            s.postMessage();
        });
    break;
}
