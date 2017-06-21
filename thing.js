'use strict';

var xml2js = require('xml2js').Parser({explicitArray: false});

class Thing {
    constructor(xml) 
    {
        var self = this;

        xml2js.parseString(xml, function(err, result) {
            self.fields = result.items.item;
        })
    }

    getName(type = 'primary') 
    {
        var names = [];

        this.fields.name.map(function(obj) {
            var attributes = obj['$'];
            if (attributes.type === type) {
                names.push(attributes.value);
            }
        });

        return (names.length > 1) ? names : names[0];
    }

    getImage(type)
    {
        if(type === 'thumbnail')
            var url = this.fields.thumbnail;
        else
            var url = this.fields.image;

        return url;
    }
}

module.exports = Thing;