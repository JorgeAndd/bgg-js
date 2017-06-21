var client = require('./client.js'),
    assert = require('assert');

describe('Items', function() 
{
    describe('Dixit', function() 
    {
        var thing;

        before(function(done) 
        {
            client.getThing(39856, function(result) 
            {
               thing = result; 
               done();
            });
        });

        it('get name', function()
        {
            var name = thing.getName();
            assert.equal(name, 'Dixit');
        })

        it('get images', function() 
        {
            var image = thing.getImage();
            assert.equal(image, 'https://cf.geekdo-images.com/images/pic3483909.jpg');
            
            var thumbnail = thing.getImage('thumbnail');
            assert.equal(thumbnail, 'https://cf.geekdo-images.com/images/pic3483909_t.jpg');
        });

        it('get description', function()
        {
            var description = thing.getDescription();
            var expectedDescription = '2010 Spiel des Jahres Winner&#10;&#10;One player is the storyteller' +
                                      'for the turn and looks at the images on the 6 cards in her hand. ' +
                                      'From one of these, she makes up a sentence and says it out loud ' + 
                                      '(without showing the card to the other players).&#10;&#10;Each other' +
                                      ' player selects the card in their hands which best matches the sentence ' + 
                                      'and gives the selected card to the storyteller, without showing it to the' +
                                      ' others.&#10;&#10;The storyteller shuffles her card with all the received' +
                                      ' cards. All pictures are shown face up and every player has to bet upon which' +
                                      ' picture was the storyteller\'s.&#10;&#10;If nobody or everybody finds the '+
                                      'correct card, the storyteller scores 0, and each of the other players scores 2.' +
                                      ' Otherwise the storyteller and whoever found the correct answer score 3. Players' +
                                      ' score 1 point for every vote for their own card.&#10;&#10;The game ends when the' +
                                      ' deck is empty or if a player scores 30 points. In either case, the player with' +
                                      ' the most points wins the game.&#10;&#10;The base game and all expansions have ' + 
                                      '84 cards each.&#10;&#10;';
            
            assert.equal(description, expectedDescription);
        });

        it('get year published', function()
        {
            var year = thing.getYear();
            assert.equal(year, 2008);
        });

        it('get players', function()
        {
            var players = thing.getPlayers();
            assert.equals(players, [3, 6], 'min and max number of players');

            var min = thing.getMinPlayers()
            assert.equals(min, 3, 'minimum of players');

            var max = thing.getMaxPlayers()
            assert.equals(max, 6, 'maximum of players');
        });

        it('get play time', function()
        {
            var playTime = thing.getPlayTime();
            assert.equals(playTime, 30, 'play time');

            playtime = thing.getMinPlayTime();
            assert.equals(playTime, 30, 'minimum play time');

            playtime = thing.getMaxPlayTime();
            assert.equals(playTime, 30, 'maximum play time');
        });

        


    })
});

