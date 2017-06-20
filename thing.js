'use strict';

var xml2js = require('xml2js').Parser();

class Thing {
    constructor(xml) {
        var self = this;

        xml2js.parseString(xml, function(err, result) {
            self.fields = result.items.item[0];
        })
    }

    getName(type = 'primary') {
        var names = [];

        this.fields.name.map(function(obj) {
            var attributes = obj['$'];
            if (attributes.type === type) {
                names.push(attributes.value);
            }
        });

        return (names.length > 1) ? names : names[0];
    }
}

module.exports = Thing;