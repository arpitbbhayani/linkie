const trim = require('trim');
const cheerio = require('cheerio');
const requests = require('superagent');
const utils = require('./utils');

function _getTitle(cheerioObject) {
    const title = cheerioObject('title').text();
    return title ? trim(title) : '';
}

function _getDescription(cheerioObject) {
    const description = cheerioObject('meta[name=\'description\']').attr('content');
    return description ? trim(description) : '';
}

function _getFirstParagraph(cheerioObject) {
    const minLength = 128;
    let description = '';
    const allP = cheerioObject('p');
    for (let i = 0; i < allP.length; i += 1) {
        description += cheerioObject(allP[i]).text();
        if (description.length > minLength) {
            return description;
        }
    }
    return description;
}

function _getFirstImage(cheerioObject) {
    const images = cheerioObject('img');
    if (images && images[0]) {
        const imageUrl = cheerioObject(images[0]).attr('src');
        return imageUrl ? trim(imageUrl) : '';
    }
    return '';
}

function _getKeywords(cheerioObject) {
    const keywordsContent = cheerioObject('meta[name=\'keywords\']').attr('content');
    if (keywordsContent) {
        return keywordsContent.split(',')
            .map(e => trim(e))
            .filter(e => (e !== ''));
    }
    return [];
}

function _getOgTitle(cheerioObject) {
    const title = cheerioObject('meta[property=\'og:title\']').attr('content');
    return title ? trim(title) : '';
}

function _getOgDescription(cheerioObject) {
    const description = cheerioObject('meta[property=\'og:description\']').attr('content');
    return description ? trim(description) : '';
}

function _getOgType(cheerioObject) {
    const type = cheerioObject('meta[property=\'og:type\']').attr('content');
    return type ? trim(type) : '';
}

function _getOgImage(cheerioObject) {
    const imageUrl = cheerioObject('meta[property=\'og:image\']').attr('content');
    return imageUrl ? trim(imageUrl) : '';
}

module.exports = (url, options, fn) => {
    const callback = fn || options;
    const { verifyImage } = options;

    if (!url) {
        return callback(null, {});
    }

    requests.get(url).redirects(2)
        .timeout({
            response: 3000,
            deadline: 3000,
        })
        .ok(res => res.status < 500)
        .end((err, res) => {
            if (err) {
                return callback({
                    message: `Unable to fetch meta information for ${url}`,
                    code: err.code,
                    errno: err.errno,
                    status: err.status,
                }, null);
            }
            const cheerioObject = cheerio.load(res.text);

            const metadata = {
                url,
                status: res.status,
                host: res.request.host,
                title: _getOgTitle(cheerioObject) ||
                           _getTitle(cheerioObject),
                description: _getOgDescription(cheerioObject) ||
                           _getDescription(cheerioObject) ||
                           _getFirstParagraph(cheerioObject),
                type: _getOgType(cheerioObject),
                keywords: _getKeywords(cheerioObject),
            };

            const site = utils.getSite(res.request.host);
            if (site) {
                metadata.site = site;
                metadata.extra = utils.populateSiteRelatedInfo(site, url);
            }
            const image = _getOgImage(cheerioObject) || _getFirstImage(cheerioObject);
            if (verifyImage) {
                utils.verifyImage(image, (aerr) => {
                    if (!aerr) {
                        metadata.image = image;
                    }
                    return callback(null, metadata);
                });
            } else {
                metadata.image = image;
                return callback(null, metadata);
            }
            return null;
        });
    return null;
};
