const linkie = require('../lib/linkie');

linkie.fetch('https://arpitbhayani.me/techie/rest-the-hard-way-with-netcat.html', (err, metadata) => {
    if (err) { return console.error(err) };
    console.log(metadata);
});
