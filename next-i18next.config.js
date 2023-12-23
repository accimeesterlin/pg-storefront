const path = require("path");

module.exports = {
    i18n: {
        defaultLocale: "en",
        locales: ["en", "ht", "es", "fr"],
        localePath: path.resolve("./public/locales"),
    },
};
