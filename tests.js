var client = require('./client.js');

client.getThing(39856, function(thing) {
    console.log(thing.getName());
});

