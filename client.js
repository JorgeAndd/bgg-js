var request = require('request-promise-native'),
    parseString = require('xml2js').parseString,
    Thing = require('./objects/thing.js'),
    User = require('./objects/user.js');

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
    },

    getUser: function(name, callback) {
        let params = 'name=' + name;
        let requestUrl = this.baseUrl + 'user?' + params;
        
        request(requestUrl)
            .then(function(body) {
                var user = new User(body);
                callback(user);
            })
            .catch(function(err) {
                console.log(err);
            });
    }
}