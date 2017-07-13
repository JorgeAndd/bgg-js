var client = require('../client.js'),
    assert = require('chai').assert;

describe('Items', function() 
{
    describe('Dixit', function() 
    {
        var thing;

        before(function(done) 
        {
            client.thing(39856, function(result) 
            {
               thing = result; 
               done();
            });
        });

        it('get name', function()
        {
            var name = thing.name;
            assert.equal(name, 'Dixit');
        })

        it('get images', function() 
        {
            var image = thing.image;
            assert.equal(image, 'https://cf.geekdo-images.com/images/pic3483909.jpg');
            
            var thumbnail = thing.thumbnail;
            assert.equal(thumbnail, 'https://cf.geekdo-images.com/images/pic3483909_t.jpg');
        });

        it('get description', function()
        {
            var description = thing.description;
            var expectedDescription = '2010 Spiel des Jahres Winner&#10;&#10;One player is the storyteller' +
                                      ' for the turn and looks at the images on the 6 cards in her hand. ' +
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
            var year = thing.year;
            assert.equal(year, 2008);
        });

        it('get players', function()
        {
            var players = thing.players;
            assert.deepEqual(players, {min: 3, max: 6});

            var min = thing.minPlayers;
            assert.equal(min, 3, 'minimum players');

            var max = thing.maxPlayers;
            assert.equal(max, 6, 'maximum players');
        });

        it('get play time', function()
        {
            var playTime = thing.playingTime;
            assert.deepEqual(playTime, {min: 30, max: 30});
        });
        
        it('get min age', function()
        {
            var age = thing.minAge;
            assert.equal(age, 6);
        });

        it('get cathegories', function()
        {
            var categories = thing.categories;
            var expectedCategories = ['Card Game', 'Humor', 'Party Game'];

            assert.deepEqual(categories, expectedCategories);
        });

        it('get mechanics', function()
        {
            var mechanics = thing.mechanics;
            var expectedMechanics = ['Simultaneous Action Selection', 'Storytelling', 'Voting'];

            assert.deepEqual(mechanics, expectedMechanics);
        });

        it('get expansions', function() 
        {
            var expansions = thing.expansions;
            
            // Tests if some expansions
            assert.include(expansions, 'Dixit Odyssey (expansion)', 'doesnt have Odyssey');
            assert.include(expansions, 'Dixit Quest', 'doesnt have Quest');
            assert.include(expansions, 'Dixit: Anniversary Pack', 'doesnt have Anniversary');
        });

        it('get designers', function()
        {
            var designers = thing.designers;
            var expectedDesigners = ['Jean-Louis Roubira'];

            assert.deepEqual(designers, expectedDesigners);
        });

        it('get artists', function()
        {
            var artists = thing.artists;
            var expectedArtists = ['Marie Cardouat'];

            assert.deepEqual(artists, expectedArtists);
        });

        it('get publishers', function()
        {
            var publishers = thing.publishers;

            // Tests if some publishers
            assert.include(publishers, 'Asmodee', 'doesnt have asmodee');
            assert.include(publishers, 'Galápagos Jogos', 'doesnt galapagos');
        });

        it('get suggested number of players', function()
        {
            var numberOfPlayers = thing.suggestedPlayers;

            // Tests format of number of players
            assert.hasAllKeys(numberOfPlayers, ['totalVotes', 'results'], 'doesnt have required properties');
            assert.hasAllKeys(numberOfPlayers.results, ['1', '2', '3', '4', '5', '6', '6+'], 'doesnt have required number of players entries');

            // Tests a valid value for number of players
            Object.keys(numberOfPlayers.results).forEach(function(key) {
                assert.isAtLeast(Number(numberOfPlayers.results[key]['Best']), 0, 'invalid poll result');
                assert.isAtLeast(Number(numberOfPlayers.results[key]['Recommended']), 0, 'invalid poll result');
                assert.isAtLeast(Number(numberOfPlayers.results[key]['Not Recommended']), 0, 'invalid poll result');
            })
        });

        it('get suggested player age', function()
        {
            var playerAge = thing.suggestedAge;

            // Tests format of player age
            assert.hasAllKeys(playerAge, ['totalVotes', 'results'], 'doesnt have required properties')

            // Tests a valid value for player age
            Object.keys(playerAge.results).forEach(function(key) {
                assert.isAtLeast(Number(playerAge.results[key]), 0, 'invalid poll result');
            });


        });

        it('get language dependency', function()
        {
            var languageDependency = thing.languageDependency;

            // Tests format of language dependency
            assert.hasAllKeys(languageDependency, ['totalVotes', 'results'], 'doesnt have required properties');

            // Tests a valid value for player age
            Object.keys(languageDependency.results).forEach(function(key) {
                assert.isAtLeast(Number(languageDependency.results[key]), 0, 'invalid poll result');
            });
        });

        it('get url', function()
        {
            var url = thing.url;

            assert.equal(url, 'https://boardgamegeek.com/boardgame/39856');
        });

        it('get rank', function()
        {
            var rankings = thing.ranks();

            var expectedRank = [
                {
                    id: 1,
                    type: 'subtype',
                    name: 'boardgame',
                    friendlyname: 'Board Game Rank',
                    value: 163,
                    bayesaverage: 7.25966
                },

                {
                    id: 5498,
                    type: 'family',
                    name: 'partygames',
                    friendlyname: 'Party Game Rank',
                    value: 14,
                    bayesaverage: 7.23544
                }
            ]

            rankings.forEach(function(rank) {
                assert.hasAllKeys(rank, ['id', 'type', 'name', 'friendlyname', 'value', 'bayesaverage'], 
                                    'rank does not have all required keys');

                assert.isAtLeast(rank.id, 0, 'invalid rank id');
                assert.isAtLeast(rank.value, 0, 'invalid rank value');
                assert.isAtLeast(rank.bayesaverage, 0, 'invalid rank bayes average');
                assert.isAtMost(rank.bayesaverage, 10, 'invalid rank bayes average');
            });
        })
    })
});

