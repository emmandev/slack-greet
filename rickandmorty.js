'use strict';

let request = require('request');
let censor = require('profanity-censor');

let quotes = class RickAndMortyQuotes {

    getQuotePromise(){
        let quote = new Promise((resolve, reject) => this.getQuoteFromApi(resolve, reject));

        return quote;
    }

    getQuoteFromApi(resolve, reject){
        let apiUrl = 'http://loremricksum.com/api/?paragraphs=1&quotes=1';
        
        request(apiUrl, function(error, response, body){
            let quote = `Didn't get a quote, something's wrong, probably a Jerry.`;

            if (!error && response.statusCode == 200) { 
                quote = '> ' + JSON.parse(body).data[0];
                quote += `
                \`App requested by J-Dog\`
                `;
            }

            quote = censor.filter(quote);

            resolve(quote);
        });
    }

    slackOptions(){
        return {
            as_user: false,
            username: 'Rick and Morty Quotes',
            icon_url: 'https://i.imgur.com/Qa0dVgk.png'
        };
    }

};

module.exports = quotes;