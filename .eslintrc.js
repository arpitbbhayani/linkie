module.exports = {
    "extends": "airbnb-base",
    "rules": {
        "semi": ["error", "always"],
        "quotes": ["error", "single"],
        "linebreak-style": "off",
        "indent": ["error", 4],
        "no-underscore-dangle": "off",
        "no-console": "off",
        "no-unused-vars": ["error", {"argsIgnorePattern": "next"}]
    },
    "env": {
        "node": true,
        "es6": true,
    },
    "parser": "babel-eslint",
};
