'use strict';

var xml2js = require('xml2js').Parser({explicitArray: false}),
    helper = require('../helper/helper.js');

class Thing {
    constructor(id, xml) 
    {
        var self = this;
        this.xml = xml;
        this.id = id;

        xml2js.parseString(xml, function(err, result) {
            self.fields = result.items.item;
        })
    }

    // Returns raw xml data from thing
    getXml()
    {
        return xml;
    }

    get url()
    {
        return 'https://boardgamegeek.com/boardgame/' + this.id;
    }

    get name()
    {
        var names = [];

        this.fields.name.forEach(function(obj) {
            var attributes = obj['$'];
            if (attributes.type === 'primary') {
                names.push(attributes.value);
            }
        });

        return (names.length > 1) ? names : names[0];
    }

    get alternateName()
    {
        var names = [];

        this.fields.name.forEach(function(obj) {
            var attributes = obj['$'];
            if (attributes.type === 'alternate') {
                names.push(attributes.value);
            }
        });

        return (names.length > 1) ? names : names[0];
    }

    get image()
    {
        return this.fields.image;
    }

    get thumbnail()
    {
        return this.fields.thumbnail;
    }

    get description()
    {
        return this.fields.description;
    }

    get year()
    {
        return this.fields.yearpublished['$'].value;
    }

    get minPlayers()
    {
        return this.players.min;
    }

    get maxPlayers()
    {
        return this.players.max;
    }

    /**
     *  Returns an object with the format {min: min, max: max}
     */
    get players()
    {
        var min = Number(this.fields.minplayers['$'].value);
        var max = Number(this.fields.maxplayers['$'].value);

        return {min: min, max: max};
    }

    /**
     *  Returns an object with the format {min: min, max: max}
     */
    get playingTime()
    {
        var min = Number(this.fields.minplaytime['$'].value);
        var max = Number(this.fields.minplaytime['$'].value);

        return {min: min, max: max};
    }

    get minAge()
    {
        return this.fields.minage['$'].value;
    }

    get categories()
    {
        return this.getLinkValues('boardgamecategory');
    }

    get mechanics()
    {
        return this.getLinkValues('boardgamemechanic');
    }

    get expansions()
    {
        return this.getLinkValues('boardgameexpansion');
    }

    get designers()
    {
        return this.getLinkValues('boardgamedesigner');
    }

    get artists()
    {
        return this.getLinkValues('boardgameartist');
    }

    get publishers()
    {
        return this.getLinkValues('boardgamepublisher');
    }

    // Get value of a link field of a given type
    // Return a list of the corresponding values
    getLinkValues(type)
    {
        var values = [];

        this.fields.link.forEach(function(obj) 
        {
            var attributes = obj['$'];
            if (attributes.type === type) {
                values.push(attributes.value);
            }
        });

        return values;
    }

    get suggestedPlayers()
    {   
        return this.getPollData('suggested_numplayers', this.compositeResultParser);
    }

    get suggestedAge()
    {
        return this.getPollData('suggested_playerage', this.simpleResultParser);
    }

    get languageDependency()
    {
        return this.getPollData('language_dependence', this.simpleResultParser);
    }

    get ranks()
    {
        var ranks = this.fields.statistics.ratings.ranks;

        ranks.rank.forEach(function(rank) {
            rank['$'].id = Number(rank['$'].id);
            rank['$'].value = Number(rank['$'].value);
            rank['$'].bayesaverage = Number(rank['$'].bayesaverage);
            
            ranks.push(rank['$']);
        });

        return ranks;
    }

    getPollData(type, resultParser)
    {
        var pollData = {};

        this.fields.poll.some(function(poll)
        {
            var description = poll['$'];

            if(description.name === type)
            {
                pollData.totalVotes = Number(description.totalvotes);
                pollData.results = {};

                var results = poll['results'];
                pollData.results = resultParser(results);

                return true;
            }

        });

        return pollData;
    }

    simpleResultParser(results) 
    {
        var resultsData = {}

        results.result.forEach(function(result)
        {
            result = result['$'];

            resultsData[result.value] = Number(result.numvotes);
        });

        return resultsData;
    }

    compositeResultParser(results)
    {
        var resultData = {};

        results.forEach(function(result)
        {
            var numberOfPlayers = result['$'].numplayers;
            var votes = {};

            result['result'].forEach(function(voting)
            {
                voting = voting['$'];
                votes[voting.value] = voting.numvotes;
            });

            resultData[numberOfPlayers] = votes;
        });    

        return resultData;
    }  

    

}

module.exports = Thing;