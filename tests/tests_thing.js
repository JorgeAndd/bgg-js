var client = require('../client.js'),
    assert = require('assert');

// TODO: switch to chai for assertion

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
            var expectedExpansions = ['Dixit 2: "Gift" promo card', 'Dixit 2: "The American" promo card', 
                                      'Dixit 3: Journey', 'Dixit Odyssey (expansion)',
                                      'Dixit Odyssey: "Bunny" promo card', 
                                      'Dixit Origins: "La Machine à rêves" Promotional card', 'Dixit Quest',
                                      'Dixit: "Magic bunny" promo card', 
                                      'Dixit: "Pumpkinhead" and "Santa" promo cards', 
                                      'Dixit: "The Dragon" promo card',
                                      'Dixit: "The Inheritors" promo cards', 
                                      'Dixit: "The Werewolves of Miller\'s Hollow: The Pact" Promo Cards',
                                      'Dixit: "Werewolves" promo cards', 
                                      'Dixit: 2012 Asmodee Special Cards', 
                                      'Dixit: Anniversary Pack',
                                      'Dixit: Daydreams', 'Dixit: Memories', 'Dixit: Origins', 
                                      'Dixit: Revelations', 'Dixit: Spielbox 03/15 Promo Card',
                                      'Dixit: Tabletop Day 2015 Promo Pack' ];
            
            assert.deepEqual(expansions, expectedExpansions);
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
            var expectedPublishers = ['ADC Blackfire Entertainment', 'Asmodee', 'Asterion Press', 'Galápagos Jogos',
                                      'Gém Klub Kft.', 'hobbity.eu', 'Hobby Japan', 'KADABRA', 'Kaissa Chess & Games',
                                      'Korea Boardgames co., Ltd.', 'Lautapelit.fi', 'Libellud', 'Morapiaf', 'REBEL.pl',
                                      'Swan Panasia Co., Ltd.'];

            assert.deepEqual(publishers, expectedPublishers);
        });

        it('get suggested number of players', function()
        {
            var numberOfPlayers = thing.suggestedPlayers;

            var expectedNumberOfPlayers = {
                totalVotes: 410,
                results: {
                    '1': { 'Best': 0, 'Recommended': 0, 'Not Recommended': 266},
                    '2': { 'Best': 1, 'Recommended': 4, 'Not Recommended': 274},
                    '3': { 'Best': 2, 'Recommended': 78, 'Not Recommended': 240},
                    '4': { 'Best': 58, 'Recommended': 271, 'Not Recommended': 32},
                    '5': { 'Best': 256, 'Recommended': 123, 'Not Recommended': 0},
                    '6': { 'Best': 307, 'Recommended': 69, 'Not Recommended': 2},
                    '6+': { 'Best': 42, 'Recommended': 82, 'Not Recommended': 90}
                }
            }

            assert.deepEqual(numberOfPlayers, expectedNumberOfPlayers);
        });

        it('get suggested player age', function()
        {
            var playerAge = thing.suggestedAge;

            var expectedPlayerAge = {
                totalVotes: 137,
                results: {
                    '2': 0,
                    '3': 1,
                    '4': 3, 
                    '5': 9,
                    '6': 39,
                    '8': 58,
                    '10': 16,
                    '12': 7,
                    '14': 2,
                    '16': 2,
                    '18': 0,
                    '21 and up': 0
                }
            }

            assert.deepEqual(playerAge, expectedPlayerAge);

        });

        it('get language dependency', function()
        {
            var languageDependency = thing.languageDependency;

            var expectedLanguageDependency = {
                totalVotes: 157,
                results: {
                    'No necessary in-game text': 155,
                    'Some necessary text - easily memorized or small crib sheet': 0,
                    'Moderate in-game text - needs crib sheet or paste ups': 0,
                    'Extensive use of text - massive conversion needed to be playable': 0,
                    'Unplayable in another language': 2
                }
            }

            assert.deepEqual(languageDependency, expectedLanguageDependency);
        });

        it('get url', function()
        {
            var url = thing.url;

            assert.equal(url, 'https://boardgamegeek.com/boardgame/39856');
        });

    })
});

