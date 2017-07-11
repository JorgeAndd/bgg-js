'use strict';

var xml2js = require('xml2js').Parser({explicitArray: false}),
    helper = require('../helper/helper.js');

class User {
    constructor(name, xml) 
    {
        var self = this;
        this.xml = xml;
        this.name = name;

        xml2js.parseString(xml, function(err, result) {
            self.fields = result.user;
        })
    }

    get firstName() 
    {
        return helper.getValue(this.fields, 'firstname');
    }

    get lastName()
    {
        return helper.getValue(this.fields, 'lastname');
    }

    get avatar()
    {
        return helper.getValue(this.fields, 'avatarlink');
    }

    get yearRegistred()
    {
        return helper.getValue(this.fields, 'yearregistered');
    }

    get state()
    {
        return helper.getValue(this.fields, 'stateorprovince');
    }

    get country()
    {
        return helper.getValue(this.fields, 'country');
    }

    get tradeRating()
    {
        return helper.getValue(this.fields, 'traderating');
    }

    get marketRating()
    {
        return helper.getValue(this.fields, 'marketrating');
    }

    get url()
    {
        return 'https://boardgamegeek.com/user/' + this.name;
    }
}

module.exports = User;