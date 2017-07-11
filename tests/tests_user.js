var client = require('../client.js'),
    assert = require('chai').assert;

// TODO: switch to chai for assertion

describe('Items', function() 
{
    describe('Jorgel', function()
    {
        var user;

        before(function(done)
        {
            client.user('Jorgel', function(result) 
            {
                user = result; 
                done();
            });
        });

        it('get first name', function()
        {
            var name = user.firstName;

            assert.equal(name, 'Jorge');
        });

        it('get last name', function()
        {
            var lastName = user.lastName;

            assert.equal(lastName, 'Andrade');
        });

        it('get avatar', function()
        {
            var avatar = user.avatar;

            assert.equal(avatar, 'N/A');
        });

        it('get year registred', function()
        {
            var year = user.yearRegistred;

            assert.equal(year, '2015');
        });

        it('get last login', function()
        {
            var lastLogin = user.lastLogin;

            // TODO: test if lastLogin is a valid date
            // TODO: test if lastLogin is same or before as today
        });

        it('get state or province', function()
        {
            var state = user.state;

            assert.equal(state, 'Distrito Federal');
        });

        it('get country', function()
        {
            var country = user.country;

            assert.equal(country, 'Brazil');
        });

        it('get trade rating', function()
        {
            var rating = user.tradeRating;

            assert.equal(rating, '0');
        });

        it('get market rating', function()
        {
            var rating = user.marketRating;

            assert.equal(rating, '0');
        });
        
        it('get url', function()
        {
            var url = user.url;

            assert.equal(url, 'https://boardgamegeek.com/user/Jorgel');
        });

    });
});