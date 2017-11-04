const hostSiteMap = {
    'www.youtube.com': 'youtube',
    'github.com': 'github',
};

const hostSiteMapKeys = Object.keys(hostSiteMap);

module.exports = {
    getSite(host) {
        for (let i = 0; i < hostSiteMapKeys.length; i += 1) {
            const key = hostSiteMapKeys[i];
            const value = hostSiteMapKeys[key];
            if (host.indexOf(key) !== -1) {
                return value;
            }
        }
        return null;
    },
};
