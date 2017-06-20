var request = require('request-promise-native'),
    parseString = require('xml2js').parseString;
    Thing = require('./thing.js');

module.exports = {
    baseUrl: 'https://www.boardgamegeek.com/xmlapi2/',

    getThing: function(id, callback) {
        let params = 'id=' + id;
        let requestUrl = this.baseUrl + 'thing?' + params;
        
        request(requestUrl)
            .then(function(body) {
                var thing = new Thing(body);
                callback(thing);
            })
            .catch(function(err) {
                console.log(err);
            });
    }
}