const linkie = require('../lib/linkie');

linkie.fetch('https://www.github.com/arpitbbhayani', (err, metadata) => {
    if (err) { return console.error(err) };
    console.log(metadata);
});
