const URL = require('url');
const querystring = require('querystring');
const requests = require('superagent');

const hostSiteMap = {
    'www.youtube.com': 'youtube',
    'github.com': 'github',
};

const hostSiteMapKeys = Object.keys(hostSiteMap);

module.exports = {
    populateSiteRelatedInfo(site, siteUrl) {
        const extra = {};
        if (site === 'youtube') {
            const vid = querystring.parse(URL.parse(siteUrl).query).v;
            if (vid) {
                extra.vid = vid;
            }
        }
        return extra;
    },

    getSite(host) {
        for (let i = 0; i < hostSiteMapKeys.length; i += 1) {
            const key = hostSiteMapKeys[i];
            const value = hostSiteMap[key];
            if (host === key) {
                return value;
            }
        }
        return null;
    },

    verifyImage(url, callback) {
        if (!url) {
            return callback(null);
        }
        requests.get(url).redirects(2)
            .timeout({
                response: 3000,
                deadline: 3000,
            })
            .ok(res => res.status === 200)
            .end((err) => {
                if (err) {
                    return callback(err);
                }
                return callback(null);
            });
        return null;
    },
};
