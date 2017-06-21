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

    getDescription()
    {
        return this.fields.description;
    }

    getYear()
    {
        return this.fields.yearpublished['$'].value;
    }

    /**
     *  Returns an object with the format {min: min, max: max}
     */
    getPlayers()
    {
        var min = Number(this.fields.minplayers['$'].value);
        var max = Number(this.fields.maxplayers['$'].value);

        return {min: min, max: max};
    }

    /**
     *  Returns an object with the format {min: min, max: max}
     */
    getPlayTime()
    {
        var min = Number(this.fields.minplaytime['$'].value);
        var max = Number(this.fields.minplaytime['$'].value);

        return {min: min, max: max};
    }

    getMinAge()
    {
        return this.fields.minage['$'].value;
    }

    getCategories()
    {
        return this.getLinkValues('boardgamecategory');
    }

    getMechanics()
    {
        return this.getLinkValues('boardgamemechanic');
    }

    getExpansions()
    {
        return this.getLinkValues('boardgameexpansion');
    }

    getDesigners()
    {
        return this.getLinkValues('boardgamedesigner');
    }

    getArtists()
    {
        return this.getLinkValues('boardgameartist');
    }

    getPublishers()
    {
        return this.getLinkValues('boardgamepublisher');
    }

    // Get value of a link field of a given type
    // Return a list of the corresponding values
    getLinkValues(type)
    {
        var values = [];

        this.fields.link.map(function(obj) {
            var attributes = obj['$'];
            if (attributes.type === type) {
                values.push(attributes.value);
            }
        });

        return values;
    }

}

module.exports = Thing;