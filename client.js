var request = require('request-promise-native'),
    parseString = require('xml2js').parseString,
    Thing = require('./objects/thing.js'),
    User = require('./objects/user.js');

module.exports = {
    baseUrl: 'https://www.boardgamegeek.com/xmlapi2/',

    thing: function(id, callback) {
        let params = 'id=' + id  + '&stats=1';
        let requestUrl = this.baseUrl + 'thing?' + params;
        
        request(requestUrl)
            .then(function(body) {
                var thing = new Thing(id, body);
                callback(thing);
            })
            .catch(function(err) {
                console.log(err);
            });
    },

    user: function(name, callback) {
        let params = 'name=' + name;
        let requestUrl = this.baseUrl + 'user?' + params;
        
        request(requestUrl)
            .then(function(body) {
                var user = new User(name, body);
                callback(user);
            })
            .catch(function(err) {
                console.log(err);
            });
    }
}