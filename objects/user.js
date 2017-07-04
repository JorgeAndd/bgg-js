'use strict';

var xml2js = require('xml2js').Parser({explicitArray: false}),
    helper = require('../helper/helper.js');

class User {
    constructor(xml) 
    {
        var self = this;
        this.xml = xml;

        xml2js.parseString(xml, function(err, result) {
            self.fields = result.user;
        })
    }

    getFirstName() 
    {
        return helper.getValue(this.fields, 'firstname');
    }

    getLastName()
    {
        return helper.getValue(this.fields, 'lastname');
    }

    getAvatar()
    {
        return helper.getValue(this.fields, 'avatarlink');
    }

    getYearRegistred()
    {
        return helper.getValue(this.fields, 'yearregistered');
    }

    getState()
    {
        return helper.getValue(this.fields, 'stateorprovince');
    }

    getCountry()
    {
        return helper.getValue(this.fields, 'country');
    }

    getTradeRating()
    {
        return helper.getValue(this.fields, 'traderating');
    }

    getMarketRating()
    {
        return helper.getValue(this.fields, 'marketrating');
    }


}

module.exports = User;