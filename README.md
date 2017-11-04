linkie
---

Extract meta information about a link

```bash
npm install linkie
```

```js
const linkie = require('linkie');

linkie.fetch('http://arpitbhayani.me/techie/rest-the-hard-way-with-netcat.html', (err, metadata) => {
    if (err) { return console.error(err) };
    console.log(metadata);
});
```

Output

```js
{
    url: 'http://arpitbhayani.me/techie/rest-the-hard-way-with-netcat.html',
    status: 200,
    host: 'arpitbhayani.me',
    title: 'HTTP Requests - The Hard Way with Netcat',
    description: 'All our lives we have been hitting REST APIs with libraries and utilities like curl and postman. Its time we do it the hard way with netcat, just for fun!',
    type: 'article',
    keywords: [
        'http-requests',
        'netcat',
        'calling rest api with netcat',
        'calling rest api from microcontroller',
        'http request messages'
    ],
    image: 'http://arpitbhayani.me/static/images/http-requests/http-request-hard-way-with-netcat.jpg' }
```

## Development

```bash
npm install
npm run dev
```
