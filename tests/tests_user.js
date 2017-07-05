var client = require('../client.js'),
    assert = require('assert');

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
            var lastName = user.getLastName();

            assert.equal(lastName, 'Andrade');
        });

        it('get avatar', function()
        {
            var avatar = user.getAvatar();

            assert.equal(avatar, 'N/A');
        });

        it('get year registred', function()
        {
            var year = user.getYearRegistred();

            assert.equal(year, '2015');
        });

        xit('get last login', function()
        {
            var lastLogin = user.getLastLogin();

            assert.equal(lastLogin, '2017-06-22');
        });

        it('get state or province', function()
        {
            var state = user.getState();

            assert.equal(state, 'Distrito Federal');
        });

        it('get country', function()
        {
            var country = user.getCountry();

            assert.equal(country, 'Brazil');
        });

        it('get trade rating', function()
        {
            var rating = user.getTradeRating();

            assert.equal(rating, '0');
        });

        it('get market rating', function()
        {
            var rating = user.getMarketRating();

            assert.equal(rating, '0');
        });
        
        it('get url', function()
        {
            var url = user.getUrl();

            assert.equal(url, 'https://boardgamegeek.com/user/Jorgel');
        });

    });
});