'use strict';

let request = require('request');

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
                quote = JSON.parse(body).data[0];
            }

            resolve(quote);
        });
    }

};

module.exports = quotes;